import { company } from '@/lib/site-data';
import { WhatsAppIcon } from './brand-icons';

export function WhatsAppFab() {
  return (
    <a className="whatsapp-fab" href={`https://wa.me/${company.phoneDigits}`} target="_blank" rel="noreferrer" aria-label={`Escríbenos por WhatsApp al ${company.phone}`}>
      <WhatsAppIcon size={24} />
      <span>Escríbenos</span>
    </a>
  );
}
