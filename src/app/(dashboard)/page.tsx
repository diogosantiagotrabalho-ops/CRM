export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500">Visão geral do seu pipeline.</p>
        </div>
        <button className="rounded-xl bg-brand-600 px-4 py-2 text-white">Nova oportunidade</button>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Leads', 'Oportunidades abertas', 'Won mês', 'Forecast'].map(label => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">--</p>
          </div>
        ))}
      </section>
    </main>
  );
}
