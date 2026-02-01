'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    await signIn('credentials', {
      ...data,
      callbackUrl: '/dashboard'
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold">Entrar no CRM</h1>
        <p className="mt-2 text-sm text-slate-500">Use seu email corporativo.</p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              type="email"
              {...register('email')}
            />
            {errors.email && <span className="text-xs text-red-500">Email inválido.</span>}
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Senha
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-xs text-red-500">Senha mínima de 8 caracteres.</span>
            )}
          </label>
          <button
            className="rounded-lg bg-brand-600 px-4 py-2 text-white disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
