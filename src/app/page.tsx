import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">CRM Pro</p>
        <h1 className="text-4xl font-semibold">Centralize seus clientes e oportunidades</h1>
        <p className="text-lg text-slate-600">
          Um CRM completo com foco em performance, segurança e produtividade da equipe.
        </p>
      </header>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/login"
          className="rounded-xl bg-brand-600 px-6 py-3 text-white shadow-lg shadow-brand-600/20"
        >
          Acessar CRM
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700"
        >
          Ver painel
        </Link>
      </div>
    </main>
  );
}
