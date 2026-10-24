import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { services } from '../data/services';
import { prices } from '../data/prices';
import { formatWhatsAppLink } from '../config/links';

function categoryButton(label: string) {
  return screen.getByRole('button', { name: new RegExp(label) });
}

describe('página de agendamento', () => {
  it('apresenta exatamente três categorias fechadas e o CTA geral funcional', () => {
    render(<App />);
    expect(screen.getAllByRole('button').filter((button) => button.hasAttribute('aria-expanded'))).toHaveLength(3);
    for (const category of services) {
      const button = categoryButton(category.label);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls');
      expect(button).not.toHaveTextContent('R$');
      expect(screen.getByText(category.description)).toBeVisible();
      for (const service of category.items) {
        expect(screen.queryByRole('link', { name: service.label })).not.toBeInTheDocument();
      }
    }
    const cta = screen.getByRole('link', { name: /Agendar pelo WhatsApp/i });
    expect(cta).toHaveAttribute('href', formatWhatsAppLink());
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });

  it('abre os serviços no painel correspondente e mantém apenas uma categoria aberta', async () => {
    const user = userEvent.setup();
    render(<App />);
    for (const category of services) {
      const button = categoryButton(category.label);
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const panelId = button.getAttribute('aria-controls');
      const panel = document.getElementById(panelId!);
      expect(panel).toBeInTheDocument();
      for (const service of category.items) {
        const link = within(panel!).getByRole('link', { name: service.label });
        expect(link).toHaveAttribute('href', formatWhatsAppLink(service.label));
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
        expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
        expect(link.querySelector('img')).toBeNull();
      }
      for (const other of services.filter(({ id }) => id !== category.id)) {
        expect(categoryButton(other.label)).toHaveAttribute('aria-expanded', 'false');
        for (const service of other.items) {
          expect(screen.queryByRole('link', { name: service.label })).not.toBeInTheDocument();
        }
      }
    }
    const lastButton = categoryButton(services.at(-1)!.label);
    await user.click(lastButton);
    expect(lastButton).toHaveAttribute('aria-expanded', 'false');
    for (const service of services.flatMap(({ items }) => items)) {
      expect(screen.queryByRole('link', { name: service.label })).not.toBeInTheDocument();
    }
  });

  it('permite abrir e fechar a sanfona com teclado', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = categoryButton('Alongamentos');
    button.focus();
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard(' ');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('não apresenta Instagram ou mapa sem configuração real', () => {
    render(<App />);
    expect(screen.queryByRole('link', { name: /Instagram/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Localização|Rio das Pedras/i })).not.toBeInTheDocument();
    expect(screen.getAllByText(/Rio das Pedras/).length).toBeGreaterThan(0);
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toMatch(/instagram\.com|maps\.google|maps\.app|goo\.gl/);
    }
  });

  it('preserva a identidade quando o retrato ou a marca falham', () => {
    render(<App />);
    const avatar = screen.getByRole('img', { name: 'Taty Soares, nail designer' });
    fireEvent.error(avatar);
    expect(avatar).not.toBeInTheDocument();
    expect(screen.getByLabelText('Taty Soares')).toHaveTextContent('TS');

    fireEvent.error(screen.getByRole('img', { name: 'Taty Soares Nail Designer' }));
    expect(screen.getByText('Taty Soares', { exact: true })).toBeVisible();
    expect(screen.getByText('NAIL DESIGNER', { exact: true })).toBeVisible();

  });
});

describe('tabela de valores acessível', () => {
  it('abre preços em texto, fecha pelo botão e devolve foco ao acionador', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', { name: /Tabela de valores/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: /Tabela de valores/i });
    expect(dialog).toBeVisible();
    expect(within(dialog).getByRole('button', { name: /Fechar/i })).toHaveFocus();
    for (const price of prices) {
      const label = within(dialog).getByText(price.label, { exact: true });
      expect(label).toBeVisible();
      const row = label.closest('tr');
      expect(row).not.toBeNull();
      expect(row!.textContent).toMatch(new RegExp(`R\\$\\s*${price.brl}(?:[,.]00)?`));
      if (price.unit) expect(within(row!).getByText(price.unit)).toBeVisible();
    }
    expect(within(dialog).getByText(/Valores sujeitos a confirmação no atendimento/)).toBeVisible();
    expect(dialog.textContent).not.toMatch(/R\$\s*99(?:[,.]00)?/);
    await user.click(within(dialog).getByRole('button', { name: /Fechar/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('trata cancelamento nativo do Escape e restaura foco', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', { name: /Tabela de valores/i });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: /Tabela de valores/i });
    // A native modal dispatches cancel when Escape is pressed; jsdom has no browser default action.
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('fecha ao clicar no backdrop e restaura o scroll anterior', async () => {
    const user = userEvent.setup();
    render(<App />);
    document.body.style.overflow = 'auto';
    const trigger = screen.getByRole('button', { name: /Tabela de valores/i });
    await user.click(trigger);
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByRole('dialog', { name: /Tabela de valores/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
    expect(trigger).toHaveFocus();
    document.body.style.overflow = '';
  });
});
