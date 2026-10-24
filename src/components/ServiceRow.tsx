import { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Service } from '../data/services';
import { assetUrl } from '../config/assets';
import { formatWhatsAppLink } from '../config/links';

export function ServiceRow({ service, active }: { service: Service; active: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a className="service-row" href={formatWhatsAppLink(service.label)} target="_blank" rel="noopener noreferrer"
      tabIndex={active ? 0 : -1}>
      {service.image && !imageFailed ? <img className="service-thumbnail" src={assetUrl(service.image)} width="45" height="45"
        alt="" loading="lazy" onError={() => setImageFailed(true)} /> :
        <span className="service-symbol"><Sparkles size={17} strokeWidth={1.3} aria-hidden="true" /></span>}
      <span>{service.label}</span>
      <ArrowUpRight size={17} strokeWidth={1.4} aria-hidden="true" />
    </a>
  );
}
