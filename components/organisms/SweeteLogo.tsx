interface SweeteLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'white';
}

export const SweeteLogo = ({ className = '', variant = 'full' }: SweeteLogoProps) => {
  if (variant === 'icon') {
    return (
      <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 44C24 44 6 32 6 18C6 10 12 4 20 4C23 4 24 6 24 6C24 6 25 4 28 4C36 4 42 10 42 18C42 32 24 44 24 44Z" fill="currentColor"/>
        <path d="M24 38C24 38 12 29 12 19C12 14 16 10 21 10C23 10 24 11 24 11C24 11 25 10 27 10C32 10 36 14 36 19C36 29 24 38 24 38Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M24 34C24 34 16 27 16 21C16 17.5 19 15 22 15C23.5 15 24 16 24 16C24 16 24.5 15 26 15C29 15 32 17.5 32 21C32 27 24 34 24 34Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M24 30C24 30 19 26 19 22.5C19 20 21 18.5 23 18.5C23.8 18.5 24 19 24 19C24 19 24.2 18.5 25 18.5C27 18.5 29 20 29 22.5C29 26 24 30 24 30Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="22" r="2" fill="currentColor"/>
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-0 ${className}`}>
      <svg className="h-full w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Heart swirl icon above the T */}
        <g transform="translate(138, -8)">
          <path d="M22 36C22 36 8 26 8 15C8 9 12 4 17 4C19.5 4 21 6 22 7C23 6 24.5 4 27 4C32 4 36 9 36 15C36 26 22 36 22 36Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 32C22 32 12 24 12 16C12 12 15 9 18.5 9C20.5 9 21.5 10.5 22 11C22.5 10.5 23.5 9 25.5 9C29 9 32 12 32 16C32 24 22 32 22 32Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M22 28C22 28 15 22 15 17C15 14 17.5 12 20 12C21 12 21.5 12.8 22 13C22.5 12.8 23 12 24 12C26.5 12 29 14 29 17C29 22 22 28 22 28Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="22" cy="16" r="2.5" fill="currentColor"/>
        </g>
        {/* SWEETE text - thick blocky */}
        <text x="4" y="48" fontFamily="var(--font-logo), sans-serif" fontSize="44" fontWeight="400" fill="currentColor" letterSpacing="2">SWEETE</text>
      </svg>
    </div>
  );
};
