import { prisma } from '@/lib/prisma';
import CashChart, { type CashPoint } from '@/components/CashChart';

type T = { date: Date; amount: number; type: 'IN' | 'OUT' };

function monthsBetween(tx: T[]) {
  if (tx.length === 0) return 1;
  const min = tx.reduce((a, b) => (a < b.date ? a : b.date), tx[0].date);
  const max = tx.reduce((a, b) => (a > b.date ? a : b.date), tx[0].date);
  const months = (max.getTime() - min.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return Math.max(1, months);
}

function computeKpis(tx: T[]) {
  const totalIn = tx.filter(t => t.type === 'IN').reduce((a, b) => a + b.amount, 0);
  const totalOut = tx.filter(t => t.type === 'OUT').reduce((a, b) => a + Math.abs(b.amount), 0);
  const cash = totalIn - totalOut;
  const burnMonthly = Math.max(0, totalOut - totalIn) / monthsBetween(tx);
  const runwayDays = burnMonthly > 0 ? Math.floor((cash / burnMonthly) * 30) : 365;
  return { cash, burnMonthly, runwayDays };
}

export default async function DashboardPage() {
  const companyId = 'demo';

  const tx = await prisma.transaction.findMany({
    where: { companyId },
    orderBy: { date: 'asc' },
    select: { date: true, amount: true, type: true },
  });

  const txMapped: T[] = tx.map(t => ({
    date: t.date,
    amount: Number(t.amount),
    type: t.type as 'IN' | 'OUT',
  }));

  const k = computeKpis(txMapped);

  // Série pour le graphe (solde cumulé)
  let balance = 0;
  const series: CashPoint[] = txMapped.map(t => {
    balance += t.amount;
    return { date: t.date.toISOString().slice(0, 10), balance };
  });

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Trésorerie</div>
          <div className="text-2xl font-bold">€ {k.cash.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Burn rate (mensuel)</div>
          <div className="text-2xl font-bold">€ {k.burnMonthly.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Runway</div>
          <div className="text-2xl font-bold">{k.runwayDays} jours</div>
        </div>
      </div>

      <CashChart data={series} />
    </main>
  );
}
