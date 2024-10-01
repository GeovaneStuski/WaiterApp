import { Icon } from '../../types/Icon';

export function SideBarLogo({ className }: Icon) {
  return (
    <svg
      className={className}
      width="42"
      height="29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m15.212 24-2.808-10.728L9.596 24H5.012L.644 6.768h4.44L7.412 17.04l2.736-10.272h4.584l2.64 10.32 2.352-10.32h4.44L19.772 24h-4.56Zm13.085-6.12h8.543l.36.984h-9.528l.625-.984ZM38.663 24 32.45 7.992 26.209 24h-1.152l6.792-17.232h1.271L39.865 24h-1.2Z"
        fill="#666"
      />
    </svg>
  );
}
