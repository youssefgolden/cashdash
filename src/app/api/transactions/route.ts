import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const companyId = 'demo'; // TODO: dynamique avec auth
  const tx = await prisma.transaction.findMany({
    where: { companyId },
    orderBy: { date: 'desc' },
    take: 100, // pagination simple
  });
  return NextResponse.json({ transactions: tx });
}
