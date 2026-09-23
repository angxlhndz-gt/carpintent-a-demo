import { ArrowRight, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { company, navigation } from '@/lib/site-data';
import { FacebookIcon, WhatsAppIcon } from './brand-icons';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">CP</span>
            <span className="brand-copy"><strong>Carpintería <b>Pro GT</b></strong><small>Trabajamos al gusto del cliente</small></span>
          </Link>
          <p>Carpintería y muebles personalizados para espacios hechos a tu medida.</p>
          <span className="footer-location"><MapPin size={16} /> {company.coverage}</span>
        </div>

        <div className="footer-column">
          <h2>Explora</h2>
          <nav aria-label="Navegación del pie de página" className="footer-links">
            {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="footer-column footer-contact">
          <h2>Hablemos de tu proyecto</h2>
          <a href={`https://wa.me/${company.phoneDigits}`} target="_blank" rel="noreferrer" className="footer-contact-link"><WhatsAppIcon /><span><small>WhatsApp</small>{company.phone}</span><ArrowRight size={15} /></a>
          <a href={`tel:+${company.phoneDigits}`} className="footer-contact-link"><Phone size={19} /><span><small>Teléfono</small>{company.phone}</span><ArrowRight size={15} /></a>
          <div className="social-pending" aria-label="Facebook, enlace pendiente de validar"><FacebookIcon /><span>Facebook <small>Enlace pendiente de confirmar</small></span></div>
        </div>
      </div>

      <div className="footer-bottom container">
        <Link className="footer-wordmark" href="/" aria-label="Carpintería Pro GT, inicio">CP <span>Carpintería Pro GT</span></Link>
        <p>Imágenes y nombres de proyectos provisionales de demostración. Fotografías autorizadas y enlace de Facebook pendientes de validar.</p>
        <span>© {new Date().getFullYear()} Carpintería Pro GT</span>
      </div>
    </footer>
  );
}
