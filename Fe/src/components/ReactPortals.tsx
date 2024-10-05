import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ReactProtalsProps = {
  containerId?: string;
  children: ReactNode;
};

export function ReactPortals({ containerId = 'portal-root', children }: ReactProtalsProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}
