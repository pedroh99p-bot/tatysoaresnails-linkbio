import { ArrowUpRight } from 'lucide-react';
import { formatWhatsAppLink } from '../config/links';

export function WhatsAppCTA() {
  return (
    <a className="whatsapp-cta entrance" href={formatWhatsAppLink()} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20.7 11.7a8.7 8.7 0 0 1-12.9 7.6L3 20.6l1.3-4.7A8.7 8.7 0 1 1 20.7 11.7Z" />
        <path d="M8.3 7.3c.3-.1.7.1.8.5l.6 1.4c.2.3 0 .6-.5 1.1.6 1.3 1.7 2.4 3.1 3.1.5-.5.8-1 1.2-.8l1.8.8c.4.2.4.5.3 1-.2.9-1.1 1.5-2 1.4-3.1-.4-6.8-3.8-7-6.6 0-.9.8-1.9 1.7-1.9Z" fill="currentColor" stroke="none" />
      </svg>
      <span>Agendar pelo WhatsApp</span>
      <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
