export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Trésorerie</div>
          <div className="text-2xl font-bold">€ 0</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Burn rate</div>
          <div className="text-2xl font-bold">€ 0 / mois</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-neutral-500">Runway</div>
          <div className="text-2xl font-bold">∞ jours</div>
        </div>
      </div>
    </main>
  );
}
