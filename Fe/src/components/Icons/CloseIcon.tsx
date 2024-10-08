import { Icon } from '../../types/Icon';

export function CloseIcon({ className }: Icon) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L12 12M12 12L16 16M12 12L8 8M12 12L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
