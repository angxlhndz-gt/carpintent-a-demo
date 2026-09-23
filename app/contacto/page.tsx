import type { Metadata } from 'next';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/brand-icons';
import { PageIntro } from '@/components/page-intro';
import { QuoteForm } from '@/components/quote-form';
import { company } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Contacto y cotización',
  description: 'Comparte tu proyecto con Carpintería Pro GT y prepara una solicitud por WhatsApp.',
};

export default function ContactPage() {
  return (
    <main id="main-content" className="page-transition">
      <PageIntro eyebrow="Contacto" title="Hablemos de lo que quieres crear.">
        <p>Comparte algunos detalles de tu proyecto. Puedes iniciar la conversación por WhatsApp desde el formulario.</p>
      </PageIntro>

      <section className="section page-section contact-page-section" id="cotizacion">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <div className="contact-aside-heading"><p className="eyebrow">Información directa</p><h2>Estamos para conversar.</h2><p>Escríbenos con tu idea, el espacio y cualquier referencia que tengas.</p></div>
            <div className="contact-detail-list">
              <a className="contact-detail-card contact-whatsapp" href={`https://wa.me/${company.phoneDigits}`} target="_blank" rel="noreferrer">
                <span className="contact-detail-icon"><WhatsAppIcon size={22} /></span><span><small>WhatsApp</small><strong>{company.phone}</strong></span>
              </a>
              <a className="contact-detail-card" href={`tel:+${company.phoneDigits}`}>
                <span className="contact-detail-icon"><Phone size={21} /></span><span><small>Teléfono</small><strong>{company.phone}</strong></span>
              </a>
              <div className="contact-detail-card">
                <span className="contact-detail-icon"><MapPin size={21} /></span><span><small>Cobertura</small><strong>{company.coverage}</strong></span>
              </div>
            </div>
            <p className="contact-aside-note">La dirección exacta, las fotografías autorizadas y el enlace oficial de Facebook están pendientes de confirmar.</p>
            <Link href="/proceso" className="text-link">Conoce el proceso <span aria-hidden="true">→</span></Link>
          </aside>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
