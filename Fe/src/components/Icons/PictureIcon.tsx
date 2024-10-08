import { Icon } from '../../types/Icon';

export function PictureIcon({ className }: Icon) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17.486L7.612 12.874C8.003 12.483 8.636 12.483 9.026 12.874L10.432 14.28L15.009 9.70402C15.4 9.31302 16.033 9.31302 16.423 9.70402L21 14.281" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.51517 7.40683C8.66161 7.55328 8.66161 7.79072 8.51517 7.93716C8.36872 8.08361 8.13128 8.08361 7.98483 7.93716C7.83839 7.79072 7.83839 7.55328 7.98483 7.40683C8.13128 7.26039 8.36872 7.26039 8.51517 7.40683" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
