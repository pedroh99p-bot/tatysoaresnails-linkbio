import { ArrowUpRight, Instagram, MapPin, NotebookText } from 'lucide-react';
import { config } from '../config/links';

export function FooterActions({ onOpenPrices }: { onOpenPrices: () => void }) {
  return (
    <footer className="footer entrance">
      <div className="footer-actions">
        <button className="footer-action" type="button" onClick={onOpenPrices} aria-haspopup="dialog">
          <NotebookText size={21} strokeWidth={1.3} aria-hidden="true" />
          <span>Tabela de valores</span><ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" />
        </button>
        {config.instagramUrl && <a className="footer-action" href={config.instagramUrl} target="_blank" rel="noopener noreferrer">
          <Instagram size={21} strokeWidth={1.3} aria-hidden="true" /><span>Instagram</span>
          <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" />
        </a>}
      </div>
      {config.locationUrl ? <a className="location" href={config.locationUrl} target="_blank" rel="noopener noreferrer">
        <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />{config.locationLabel}
      </a> : <p className="location"><MapPin size={15} strokeWidth={1.5} aria-hidden="true" />{config.locationLabel}</p>}
    </footer>
  );
}
