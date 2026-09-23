import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProcessTimeline } from '@/components/process-timeline';
import { SectionCta } from '@/components/section-cta';

export const metadata: Metadata = {
  title: 'Proceso',
  description: 'Conoce las etapas para llevar una idea de carpintería a un proyecto personalizado.',
};

export default function ProcessPage() {
  return (
    <main id="main-content" className="page-transition">
      <PageIntro eyebrow="Cómo trabajamos" title="Un paso a la vez, desde tu idea.">
        <p>La conversación empieza con lo que necesitas. Estas etapas ayudan a ordenar los detalles de tu proyecto desde el primer contacto.</p>
      </PageIntro>
      <section className="section page-section process-page-section">
        <div className="container">
          <div className="process-intro-card"><span>Del primer mensaje a la instalación</span><p>Diseño, medidas y materiales se revisan para cada solicitud. El alcance se conversa antes de continuar.</p></div>
          <ProcessTimeline />
        </div>
      </section>
      <SectionCta />
    </main>
  );
}
