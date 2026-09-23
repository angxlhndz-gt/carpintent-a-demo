import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsAppFab } from '@/components/whatsapp-fab';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Carpintería Pro GT | Hecho a tu medida',
    template: '%s | Carpintería Pro GT',
  },
  description: 'Carpintería a medida en San Raymundo y zonas cercanas. Conoce servicios, proyectos de demostración y solicita información por WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
