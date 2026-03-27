import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@carerail/auth';
import crypto from 'crypto';

/**
 * Process payment with Interswitch WebPay (Nigerian market)
 * Uses Merchant Code, Pay Item ID, and MAC Key for HMAC-SHA512 signing
 * Supports Collections (Donor funding wallets)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, description, email, reference } = await request.json();

    if (!amount || !description || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Interswitch WebPay credentials for Nigerian market
    const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
    const payItemId = process.env.INTERSWITCH_PAY_ITEM_ID;
    const macKey = process.env.INTERSWITCH_MAC_KEY;
    const interswitchBaseUrl = process.env.INTERSWITCH_API_BASE || 'https://webpay.interswitchng.com';

    if (!merchantCode || !payItemId || !macKey) {
      return NextResponse.json(
        { error: 'Payment gateway not configured. Missing INTERSWITCH_MERCHANT_CODE, INTERSWITCH_PAY_ITEM_ID, or INTERSWITCH_MAC_KEY' },
        { status: 500 }
      );
    }

    // Generate unique transaction reference
    const txnRef = reference || `CRV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Interswitch WebPay requires amount in kobo (multiply by 100)
    const amountInKobo = Math.round(amount * 100);

    // Create hash for Interswitch WebPay
    // Format: txn_ref + merchant_code + pay_item_id + amount + redirect_url
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/payment/callback`;
    const hashString = `${txnRef}${merchantCode}${payItemId}${amountInKobo}${redirectUrl}`;

    // Generate HMAC-SHA512 hash using MAC key
    const hash = crypto.createHmac('sha512', macKey).update(hashString).digest('hex');

    // Interswitch WebPay payment URL
    const paymentUrl = `${interswitchBaseUrl}/pay?merchant_code=${merchantCode}&pay_item_id=${payItemId}&txn_ref=${txnRef}&amount=${amountInKobo}&currency=566&site_redirect_url=${encodeURIComponent(redirectUrl)}&hash=${hash}&customer_email=${encodeURIComponent(email)}&customer_name=${encodeURIComponent(session.name || 'Customer')}&desc=${encodeURIComponent(description)}`;

    return NextResponse.json({
      success: true,
      message: 'Payment initiated successfully',
      reference: txnRef,
      paymentUrl,
      amount: amountInKobo,
      currency: 'NGN'
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
        paymentUrl,
        amount,
        statusCode: '00',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
