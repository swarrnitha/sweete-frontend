interface SweeteLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'white';
}

export const SweeteLogo = ({ className = '', variant = 'full' }: SweeteLogoProps) => {
  if (variant === 'icon') {
    return (
      <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lollipop stick */}
        <rect x="27" y="22" width="6" height="32" rx="2" fill="currentColor" />
        {/* Lollipop swirl head */}
        <circle cx="30" cy="16" r="12" stroke="currentColor" strokeWidth="5" fill="none" />
        <path d="M30 16 C30 12, 34 10, 36 13 C38 16, 34 18, 30 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M30 16 C30 20, 26 22, 24 19 C22 16, 26 14, 30 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* S */}
      <path d="M12 20 C12 12, 18 6, 28 6 C38 6, 44 10, 44 16 C44 22, 38 24, 28 26 C18 28, 12 30, 12 38 C12 46, 18 52, 28 52 C38 52, 44 48, 44 42"
        stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* W */}
      <path d="M52 12 L64 48 L76 28 L88 48 L100 12"
        stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* First E */}
      <path d="M130 6 L112 6 L112 52 L132 52 M112 28 L128 28"
        stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Second E */}
      <path d="M170 6 L152 6 L152 52 L172 52 M152 28 L168 28"
        stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* T vertical stem */}
      <line x1="202" y1="6" x2="202" y2="52" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />

      {/* Lollipop stick (below the swirl, above the stem base) */}
      <rect x="197" y="22" width="10" height="30" rx="3" fill="currentColor" />

      {/* Lollipop swirl circle */}
      <circle cx="202" cy="14" r="11" stroke="currentColor" strokeWidth="4.5" fill="none" />

      {/* Inner swirl */}
      <path d="M202 14 C202 10, 207 8, 209 11 C211 14, 207 16, 202 14"
        stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M202 14 C202 18, 197 20, 195 17 C193 14, 197 12, 202 14"
        stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="202" cy="14" r="3" fill="currentColor" />

      {/* E */}
      <path d="M250 6 L232 6 L232 52 L252 52 M232 28 L248 28"
        stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};
