import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

async function main() {
  // Crée ou récupère une company "demo"
  const company = await prisma.company.upsert({
    where: { id: 'demo' },
    update: {},
    create: { id: 'demo', name: 'Demo Retail' },
  });

  const today = new Date();
  const days = 60;
  const txs: any[] = [];

  for (let i = 0; i < 500; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - Math.floor(Math.random() * days));

    const isIn = Math.random() > 0.45; // ~55% entrées
    const amountAbs = Math.round(rand(20, 400) * 100) / 100;
    const amount = isIn ? amountAbs : -amountAbs;

    txs.push({
      companyId: company.id,
      date: d,
      amount,
      type: isIn ? 'IN' : 'OUT',
      category: isIn ? 'Sales' : ['Suppliers', 'Payroll', 'Logistics'][Math.floor(Math.random() * 3)],
    });
  }

  await prisma.transaction.createMany({ data: txs });

  await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: { email: 'admin@demo.local', role: 'admin', companyId: company.id },
  });

  console.log(`Seed ok: ${txs.length} transactions`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
