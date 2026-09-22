import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carpintería Pro GT | Cotizaciones a medida',
  description: 'Demo independiente para conocer servicios, proyectos de demostración y solicitar una cotización por WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
