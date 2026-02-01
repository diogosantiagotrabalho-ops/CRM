import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM Pro',
  description: 'CRM para pequenas e médias empresas'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
