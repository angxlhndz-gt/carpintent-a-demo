import type { Metadata } from 'next';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { SectionCta } from '@/components/section-cta';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Cocinas, comedores, closets, tocadores, pérgolas, cabañas y mobiliario especial a medida.',
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="page-transition">
      <PageIntro eyebrow="Servicios a medida" title="Madera pensada para tu espacio.">
        <p>Conoce las líneas de trabajo de Carpintería Pro GT. Cada proyecto comienza con tu idea y se conversa según el espacio, las medidas y los acabados que quieras compartir.</p>
      </PageIntro>
      <section className="section page-section services-page-section">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div><p className="eyebrow"><MapPin size={14} /> San Raymundo y zonas cercanas</p><h2>¿Qué tienes en mente?</h2></div>
            <Link className="button button-secondary" href="/contacto#cotizacion">Cuéntanos tu idea <ArrowRight size={16} /></Link>
          </div>
          <div className="service-grid services-page-grid">
            {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
          </div>
        </div>
      </section>
      <SectionCta />
    </main>
  );
}
