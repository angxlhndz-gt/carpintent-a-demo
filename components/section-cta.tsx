import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { company } from '@/lib/site-data';

export function SectionCta() {
  return (
    <section className="section-cta">
      <div className="section-cta-inner container">
        <div>
          <p className="eyebrow"><MapPin size={14} /> {company.coverage}</p>
          <h2>¿Tienes una idea en mente?</h2>
          <p>Conversemos sobre tu espacio y los detalles de tu proyecto.</p>
        </div>
        <Link className="button button-light" href="/contacto#cotizacion">Solicitar cotización <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
