import { act } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import App from '../App';

it('shows booking content before JavaScript and hydrates into a working accordion', async () => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App />);
  document.body.append(container);
  const recoverableError = vi.fn();
  let root: Root | undefined;
  try {
    expect(within(container).getByRole('link', { name: 'Agendar pelo WhatsApp' })).toHaveAttribute('href', expect.stringContaining('wa.me/5521989358048'));
    await act(async () => { root = hydrateRoot(container, <App />, { onRecoverableError: recoverableError }); });
    await userEvent.setup().click(within(container).getByRole('button', { name: /Alongamentos/ }));
    expect(within(container).getByRole('link', { name: 'Acrigel' })).toBeVisible();
    expect(recoverableError).not.toHaveBeenCalled();
  } finally {
    await act(async () => root?.unmount());
    container.remove();
  }
});
