import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "menu-book"
  | "cloche"
  | "repeat"
  | "study-book"
  | "collection"
  | "sprout"
  | "wine-glass"
  | "cutlery"
  | "dish"
  | "bottle-glass"
  | "pairing"
  | "italy-map"
  | "map-pin"
  | "check-seal"
  | "laurel"
  | "arrow-right";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

const icons: Record<IconName, ReactNode> = {
  "menu-book": (
    <>
      <path d="M3.5 5.2c2.9-.8 5.7-.2 8.5 1.7v12c-2.8-1.9-5.6-2.5-8.5-1.7z" />
      <path d="M20.5 5.2c-2.9-.8-5.7-.2-8.5 1.7v12c2.8-1.9 5.6-2.5 8.5-1.7z" />
      <path d="M6.5 9.2c1-.1 1.9.1 2.8.5M14.8 9.7c.9-.4 1.8-.6 2.8-.5" />
    </>
  ),
  cloche: (
    <>
      <path d="M4 16.5h16M2.8 19h18.4" />
      <path d="M5.2 16.5a6.8 6.8 0 0 1 13.6 0" />
      <path d="M10.3 8.7a1.7 1.7 0 0 1 3.4 0" />
    </>
  ),
  repeat: (
    <>
      <path d="M20 7.2A8 8 0 0 0 6.1 5.4L4 7.5" />
      <path d="M4 3.8v3.7h3.7M4 16.8a8 8 0 0 0 13.9 1.8l2.1-2.1" />
      <path d="M20 20.2v-3.7h-3.7" />
    </>
  ),
  "study-book": (
    <>
      <path d="M3.5 5.5c2.8-.7 5.6 0 8.5 2v11c-2.9-2-5.7-2.7-8.5-2zM12 7.5c2.9-2 5.7-2.7 8.5-2v11c-2.8-.7-5.6 0-8.5 2z" />
      <path d="M17.3 3.3c.1 1.5-.5 2.6-1.8 3.2-.2-1.5.4-2.6 1.8-3.2Z" />
    </>
  ),
  collection: (
    <>
      <rect x="5.5" y="3.5" width="12" height="15" rx="2" />
      <path d="m8.7 13.2 2-2 1.8 1.5 2.8-3M8.5 7.2h5" />
      <path d="M8.5 21h9a3 3 0 0 0 3-3V7" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 12C7.9 12 5.5 10 5.5 6.5 9.6 6.5 12 8.5 12 12ZM12 15c4.1 0 6.5-2 6.5-5.5-4.1 0-6.5 2-6.5 5.5Z" />
    </>
  ),
  "wine-glass": (
    <>
      <path d="M7.3 3.5h9.4l-.7 7a4 4 0 0 1-8 0zM8.1 8h7.8M12 14.5v6M8.7 20.5h6.6" />
    </>
  ),
  cutlery: (
    <>
      <path d="M7 3.5v6M4.5 3.5v4.8A2.5 2.5 0 0 0 7 10.8a2.5 2.5 0 0 0 2.5-2.5V3.5M7 10.8v9.7" />
      <path d="M15.5 20.5V4.8c0-.8.7-1.4 1.5-1.1 1.5.6 2.5 2.6 2.5 5.1v3.4h-4" />
    </>
  ),
  dish: (
    <>
      <path d="M4 15.5h16M2.8 18.5h18.4M6 15.5a6 6 0 0 1 12 0M12 7.5V5M8.5 8.7 7 6.8M15.5 8.7 17 6.8" />
    </>
  ),
  "bottle-glass": (
    <>
      <path d="M5.5 4h4M6.3 4v4l-1.5 2.3V20h5.9v-9.7L9.2 8V4" />
      <path d="M14 8h6l-.5 5.2a2.5 2.5 0 0 1-5 0zM17 15.7V20M14.8 20h4.4" />
    </>
  ),
  pairing: (
    <>
      <circle cx="8.2" cy="13.5" r="5.2" />
      <circle cx="8.2" cy="13.5" r="2.4" />
      <path d="M15 4h5l-.4 4.5a2.1 2.1 0 0 1-4.2 0zM17.5 11v5.7M15.7 16.7h3.6" />
    </>
  ),
  "italy-map": (
    <path d="M9.4 2.8c1.6-.2 3.2.4 4 1.6.8 1 1 2.3 2 3.2.8.8 2.3 1.1 2.4 2.3.1 1-1 1.6-1.3 2.5-.5 1.5.7 2.7 1.4 4 .5 1 .5 2.5-.5 2.8-1.5.4-2.6-2.2-4.1-1.9-.9.2-1.3 1.4-2.2 1.7-1 .3-2.2-.4-2.4-1.4-.2-1.2.9-2.1.8-3.3-.1-1.4-1.8-2.1-2.8-3.1-1.1-1.1-1.6-2.9-.8-4.2.6-.9 1.8-1.2 2.5-2 .5-.6.6-1.5 1-2.2Z" />
  ),
  "map-pin": (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  "check-seal": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.2 12.1 2.5 2.5 5.2-5.4" />
      <path d="m5.2 5.2-1.3-1.3M18.8 5.2l1.3-1.3M5.2 18.8l-1.3 1.3M18.8 18.8l1.3 1.3" />
    </>
  ),
  laurel: (
    <>
      <path d="M8.5 20C4.7 17.5 3 14 3.5 9.8M15.5 20c3.8-2.5 5.5-6 5-10.2" />
      <path d="M4 13.5c2-.2 3.1.6 3.5 2.3-1.9.2-3.1-.6-3.5-2.3ZM4 9.2c1.8.2 2.7 1.1 2.7 2.7-1.7-.1-2.6-1-2.7-2.7ZM5.8 5.6c1.6.7 2.2 1.8 1.7 3.3-1.5-.6-2.1-1.7-1.7-3.3ZM20 13.5c-2-.2-3.1.6-3.5 2.3 1.9.2 3.1-.6 3.5-2.3ZM20 9.2c-1.8.2-2.7 1.1-2.7 2.7 1.7-.1 2.6-1 2.7-2.7ZM18.2 5.6c-1.6.7-2.2 1.8-1.7 3.3 1.5-.6 2.1-1.7 1.7-3.3Z" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h15M14 7l5 5-5 5" />
    </>
  ),
};
