import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/site-data';

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;

  return (
    <article className={`service-card service-card-${index + 1}`}>
      <Link href="/contacto#cotizacion" className="service-card-image" aria-label={`Consultar por ${service.title}`}>
        <Image src={service.image} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 25vw" alt={service.imageAlt} />
        <span className="image-demo-tag">Imagen de demostración</span>
      </Link>
      <div className="service-card-body">
        <span className="service-icon"><Icon size={21} strokeWidth={1.7} /></span>
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <p className="service-categories">{service.categories.join(' · ')}</p>
        <Link className="text-link" href="/contacto#cotizacion">Consultar servicio <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
