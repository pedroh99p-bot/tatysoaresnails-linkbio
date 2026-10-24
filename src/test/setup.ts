import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom does not implement the browser's modal-dialog lifecycle.
Object.defineProperties(HTMLDialogElement.prototype, {
  showModal: {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.setAttribute('open', '');
      this.querySelector<HTMLElement>('[autofocus], button')?.focus();
    },
  },
  close: {
    configurable: true,
    value(this: HTMLDialogElement) {
      if (!this.open) return;
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    },
  },
});

afterEach(cleanup);
