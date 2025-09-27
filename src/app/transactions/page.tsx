'use client';

import { useEffect, useState } from 'react';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'IN' | 'OUT';
  category: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'IN' | 'OUT'>('ALL');

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions));
  }, []);

  const filtered = filter === 'ALL'
    ? transactions
    : transactions.filter((t) => t.type === filter);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1 rounded ${filter==='ALL'?'bg-neutral-800 text-white':'border'}`}
        >
          Tout
        </button>
        <button
          onClick={() => setFilter('IN')}
          className={`px-3 py-1 rounded ${filter==='IN'?'bg-green-700 text-white':'border'}`}
        >
          Entrées
        </button>
        <button
          onClick={() => setFilter('OUT')}
          className={`px-3 py-1 rounded ${filter==='OUT'?'bg-red-700 text-white':'border'}`}
        >
          Sorties
        </button>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-neutral-900 text-neutral-200">
          <tr>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-right">Montant</th>
            <th className="p-2">Type</th>
            <th className="p-2">Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td className={`p-2 text-right ${t.type==='IN'?'text-green-600':'text-red-600'}`}>
                {t.type==='IN' ? '+' : '-'}€{Math.abs(t.amount).toFixed(2)}
              </td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/dashboard" className="underline">← Retour Dashboard</a>
    </main>
  );
}
