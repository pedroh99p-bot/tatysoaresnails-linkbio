import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { prices } from '../data/prices';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0, minimumFractionDigits: 0 });

export function PriceSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <dialog className="price-sheet" ref={dialogRef} aria-labelledby="price-title" aria-describedby="price-note"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="sheet-content">
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-heading"><div><p className="section-kicker">TATY SOARES</p><h2 id="price-title">Tabela de valores</h2></div>
          <button className="close-sheet" type="button" onClick={onClose} aria-label="Fechar tabela de valores" autoFocus>
            <X size={21} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <table className="price-table">
          <caption className="sr-only">Serviços de unhas e seus valores em reais</caption>
          <thead><tr><th scope="col">Serviço</th><th scope="col">Valor</th></tr></thead>
          <tbody>{prices.map((price) => <tr key={price.label}><th scope="row">{price.label}</th>
            <td>{currency.format(price.brl)}{price.unit && <small>{price.unit}</small>}</td></tr>)}</tbody>
        </table>
        <p id="price-note" className="price-note">Valores sujeitos a confirmação no atendimento.</p>
      </div>
    </dialog>
  );
}
