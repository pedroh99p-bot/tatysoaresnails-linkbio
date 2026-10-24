import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { assets, assetUrl } from './config/assets';
import { services } from './data/services';
import { HeaderProfile } from './components/HeaderProfile';
import { WhatsAppCTA } from './components/WhatsAppCTA';
import { CategoryAccordion } from './components/CategoryAccordion';
import { FooterActions } from './components/FooterActions';
import { PriceSheet } from './components/PriceSheet';
import './styles.css';

export default function App() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [pricesOpen, setPricesOpen] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const site = siteRef.current;
    if (!site || !window.matchMedia) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = reducedMotion.matches ? 0 : Math.min(Math.max(window.scrollY, 0) * 0.12, 32);
      site.style.setProperty('--parallax-offset', `${offset}px`);
    };
    const onScroll = () => {
      if (!reducedMotion.matches && !frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    reducedMotion.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      reducedMotion.removeEventListener?.('change', update);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={siteRef} className="site" style={{ '--floral-background': `url("${assetUrl(assets.backgrounds.main)}")` } as CSSProperties}>
      <a className="skip-link" href="#servicos">Ir para os serviços</a>
      <main className="linkbio">
        <HeaderProfile />
        <div className="booking-intro entrance" aria-hidden="true"><span /><i>✦</i><span /></div>
        <WhatsAppCTA />
        <section id="servicos" className="services entrance" aria-label="Serviços">
          <p className="section-kicker">UM CUIDADO SÓ SEU</p>
          {services.map((category, index) => (
            <CategoryAccordion key={category.id} category={category} index={index}
              expanded={openCategory === category.id}
              onToggle={() => setOpenCategory((current) => current === category.id ? null : category.id)} />
          ))}
          <p className="services-hint">Toque em uma categoria e escolha seu cuidado.</p>
        </section>
        <FooterActions onOpenPrices={() => setPricesOpen(true)} />
        <p className="signature">Feito para realçar a sua beleza <span aria-hidden="true">✦</span></p>
      </main>
      <PriceSheet open={pricesOpen} onClose={() => setPricesOpen(false)} />
    </div>
  );
}
