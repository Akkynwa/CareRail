import { PrismaClient } from '../src';
import { hashPassword } from '@carerail/auth';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const foodCategory = await prisma.merchantCategory.upsert({
    where: { name: 'Food & Beverage' },
    update: {},
    create: { name: 'Food & Beverage' },
  });

  const medicalCategory = await prisma.merchantCategory.upsert({
    where: { name: 'Medical' },
    update: {},
    create: { name: 'Medical' },
  });

  // Create vendors
  const vendor1 = await prisma.vendor.upsert({
    where: { merchantCode: 'VEND001' },
    update: {},
    create: {
      businessName: 'Quick Bites Restaurant',
      merchantCode: 'VEND001',
      categoryId: foodCategory.id,
      contactPerson: 'John Vendor',
      phone: '+1234567890',
      password: await hashPassword('vendor123'),
    },
  });

  // Create beneficiaries
  const beneficiary1 = await prisma.beneficiary.upsert({
    where: { phone: '+1234567891' },
    update: {},
    create: {
      fullName: 'John Doe',
      phone: '+1234567891',
      bvn: '12345678901',
      password: await hashPassword('beneficiary123'),
    },
  });

  // Create wallet for beneficiary
  await prisma.wallet.upsert({
    where: { beneficiaryId: beneficiary1.id },
    update: {},
    create: {
      beneficiaryId: beneficiary1.id,
      balance: 15000, // ₦150.00
    },
  });

  // Create donors
  const donor1 = await prisma.donor.upsert({
    where: { email: 'donor@example.com' },
    update: {},
    create: {
      email: 'donor@example.com',
      name: 'Jane Donor',
      password: await hashPassword('donor123'),
    },
  });

  // Create donation
  await prisma.donation.upsert({
    where: { id: 'donation-1' },
    update: {},
    create: {
      donorId: donor1.id,
      amount: 50000,
      purpose: 'General Support',
    },
  });

  // Create voucher
  const wallet = await prisma.wallet.findUnique({ where: { beneficiaryId: beneficiary1.id } });
  if (wallet) {
    await prisma.voucher.upsert({
      where: { qrCodeValue: 'CRVCHR-123456' },
      update: {},
      create: {
        walletId: wallet.id,
        beneficiaryId: beneficiary1.id,
        amount: 5000,
        purpose: 'Food Assistance',
        qrCodeValue: 'CRVCHR-123456',
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      },
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });