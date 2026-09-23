import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, MoveRight, Sparkles } from 'lucide-react';
import { ProcessTimeline } from '@/components/process-timeline';
import { SectionCta } from '@/components/section-cta';
import { ServiceCard } from '@/components/service-card';
import { projects, services } from '@/lib/site-data';

export default function HomePage() {
  return (
    <main id="main-content" className="page-transition">
      <section className="home-hero">
        <div className="home-hero-inner container">
          <div className="home-hero-copy">
            <p className="eyebrow"><MapPin size={14} /> San Raymundo y zonas cercanas</p>
            <p className="hero-brand-name">Carpintería Pro GT</p>
            <h1>Carpintería a medida para espacios que se sienten tuyos.</h1>
            <p className="hero-description">Diseñamos y trabajamos proyectos personalizados de madera según tu idea, tu espacio y las medidas que compartas.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contacto#cotizacion">Solicitar cotización <ArrowRight size={17} /></Link>
              <Link className="button button-glass" href="/proyectos">Ver proyectos <MoveRight size={17} /></Link>
            </div>
            <p className="hero-note"><Sparkles size={15} /> Trabajamos al gusto del cliente.</p>
          </div>
          <div className="home-hero-visual">
            <Image src="/images/cocina-demo.webp" fill priority sizes="(max-width: 850px) 100vw, 54vw" alt="Cocina de madera de demostración" />
            <span className="hero-image-index">01 <i /> Madera hecha a tu medida</span>
            <span className="image-demo-tag">Imagen de demostración</span>
          </div>
        </div>
      </section>

      <section className="section home-services">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div><p className="eyebrow">Servicios</p><h2>Ideas que toman forma en madera.</h2></div>
            <Link className="text-link" href="/servicios">Ver todos los servicios <ArrowRight size={16} /></Link>
          </div>
          <div className="service-grid service-grid-home">
            {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div><p className="eyebrow">Proyectos</p><h2>Una muestra para imaginar posibilidades.</h2></div>
            <Link className="text-link" href="/proyectos">Explorar galería <ArrowRight size={16} /></Link>
          </div>
          <div className="project-preview-grid">
            {projects.slice(0, 3).map((project) => (
              <Link className="project-preview-card" href="/proyectos" key={project.category}>
                <span className="project-preview-image"><Image src={project.image} fill sizes="(max-width: 620px) 100vw, 33vw" alt={project.alt} /><span className="image-demo-tag">Proyecto de demostración</span></span>
                <span className="project-preview-caption"><small>{project.category}</small><strong>{project.title}</strong><ArrowRight size={17} /></span>
              </Link>
            ))}
          </div>
          <p className="demo-disclaimer">Los nombres y las fotografías de esta galería son provisionales y se reemplazan con el portafolio autorizado de Carpintería Pro GT.</p>
        </div>
      </section>

      <section className="section home-process">
        <div className="container">
          <div className="section-heading section-heading-center">
            <p className="eyebrow">Proceso</p><h2>De la primera idea al espacio terminado.</h2>
            <p>Un recorrido claro para conversar sobre lo que necesitas.</p>
          </div>
          <ProcessTimeline compact />
        </div>
      </section>

      <SectionCta />
    </main>
  );
}
