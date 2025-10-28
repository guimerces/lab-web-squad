import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UFBank - Observabilidade e Chaos Engineering',
  description: 'Demonstração prática de SRE, Observabilidade e Chaos Engineering',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

