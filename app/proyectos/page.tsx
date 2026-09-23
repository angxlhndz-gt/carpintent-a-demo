import type { Metadata } from 'next';
import { Images } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { ProjectGallery } from '@/components/project-gallery';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Galería de inspiración y proyectos provisionales de demostración de Carpintería Pro GT.',
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page-transition">
      <PageIntro eyebrow="Galería de inspiración" title="Detalles para imaginar tu próximo espacio." aside={<span className="gallery-count"><Images size={18} /> 7 categorías</span>}>
        <p>Explora referencias por tipo de trabajo. Las fotografías y los nombres son provisionales; el portafolio real se incorporará cuando Carpintería Pro GT autorice las imágenes.</p>
      </PageIntro>
      <section className="section page-section projects-page-section">
        <div className="container">
          <ProjectGallery />
          <p className="demo-disclaimer">Cada imagen se identifica como proyecto de demostración. Estas referencias no representan trabajos confirmados del negocio.</p>
        </div>
      </section>
    </main>
  );
}
