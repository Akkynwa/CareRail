import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@carerail/db';
import crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Handle Interswitch WebPay webhook callbacks
 * Verifies payment using HMAC-SHA512 and MAC Key
 * Funds beneficiary wallet on successful payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      txn_ref,
      merchant_code,
      pay_item_id,
      amount,
      currency,
      response_code,
      response_description,
      transaction_date,
      customer_email
    } = body;

    console.log('Interswitch webhook received:', { txn_ref, response_code, amount });

    // Verify Interswitch credentials
    const expectedMerchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
    const expectedPayItemId = process.env.INTERSWITCH_PAY_ITEM_ID;
    const macKey = process.env.INTERSWITCH_MAC_KEY;

    if (!expectedMerchantCode || !expectedPayItemId || !macKey) {
      console.error('Interswitch credentials not configured');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    // Verify merchant code and pay item ID
    if (merchant_code !== expectedMerchantCode || pay_item_id !== expectedPayItemId) {
      console.error('Invalid merchant code or pay item ID');
      return NextResponse.json({ error: 'Invalid merchant credentials' }, { status: 400 });
    }

    // Verify HMAC-SHA512 signature if provided
    const receivedHash = request.headers.get('x-interswitch-hash');
    if (receivedHash) {
      const hashString = `${txn_ref}${merchant_code}${pay_item_id}${amount}${currency}${response_code}`;
      const expectedHash = crypto.createHmac('sha512', macKey).update(hashString).digest('hex');

      if (receivedHash !== expectedHash) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    // Check if payment was successful
    const isSuccessful = response_code === '00' || response_code === '0' || response_description?.toLowerCase().includes('success');

    if (isSuccessful) {
      // Extract beneficiary ID from transaction reference (format: CRV-timestamp-beneficiaryId)
      const refParts = txn_ref.split('-');
      const beneficiaryId = refParts.length >= 3 ? refParts[2] : null;

      if (!beneficiaryId) {
        console.error('Could not extract beneficiary ID from reference:', txn_ref);
        return NextResponse.json({ error: 'Invalid transaction reference' }, { status: 400 });
      }

      // Convert amount from kobo to naira
      const amountInNaira = Math.round(amount / 100);

      // Find beneficiary and their wallet
      const beneficiary = await prisma.beneficiary.findUnique({
        where: { id: beneficiaryId },
        include: { wallet: true }
      });

      if (!beneficiary) {
        console.error('Beneficiary not found:', beneficiaryId);
        return NextResponse.json({ error: 'Beneficiary not found' }, { status: 404 });
      }

      // Update wallet balance
      const currentBalance = beneficiary.wallet?.balance || 0;
      const newBalance = currentBalance + amountInNaira;

      await prisma.wallet.upsert({
        where: { beneficiaryId },
        update: { balance: newBalance },
        create: {
          beneficiaryId,
          balance: amountInNaira
        }
      });

      // Record transaction
      await prisma.transaction.create({
        data: {
          beneficiaryId,
          amount: amountInNaira,
          type: 'WALLET_FUNDED',
          description: `Wallet funded via Interswitch - ${txn_ref}`,
          reference: txn_ref
        }
      });

      console.log(`Wallet funded: ${beneficiaryId} +₦${amountInNaira} = ₦${newBalance}`);

      return NextResponse.json({
        message: 'Payment processed successfully',
        reference: txn_ref,
        amount: amountInNaira,
        beneficiaryId,
        newBalance
      });

    } else {
      console.log('Payment failed:', { txn_ref, response_code, response_description });

      // Optionally record failed transaction
      await prisma.transaction.create({
        data: {
          beneficiaryId: null, // We don't know the beneficiary for failed payments
          amount: Math.round(amount / 100),
          type: 'PAYMENT_FAILED',
          description: `Failed payment - ${response_description}`,
          reference: txn_ref
        }
      });

      return NextResponse.json({
        message: 'Payment failed',
        reference: txn_ref,
        response_code,
        response_description
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
