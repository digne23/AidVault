import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  linkTo?: string;
  className?: string;
}

const sizeConfig = {
  sm: { icon: 'w-8 h-8', text: 'text-lg', iconInner: 'w-4 h-4' },
  md: { icon: 'w-10 h-10', text: 'text-xl', iconInner: 'w-5 h-5' },
  lg: { icon: 'w-12 h-12', text: 'text-2xl', iconInner: 'w-6 h-6' },
  xl: { icon: 'w-16 h-16', text: 'text-3xl', iconInner: 'w-8 h-8' },
};

export function Logo({ size = 'md', showText = true, linkTo, className = '' }: LogoProps) {
  const config = sizeConfig[size];

  const LogoIcon = () => (
    <div className={`${config.icon} relative flex items-center justify-center`}>
      {/* Main logo SVG - Vault with heart/helping hand concept */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Vault body - rounded rectangle */}
        <rect
          x="6"
          y="12"
          width="36"
          height="30"
          rx="4"
          fill="url(#logoGradient)"
        />

        {/* Vault top/handle */}
        <path
          d="M16 12V10C16 6.68629 18.6863 4 22 4H26C29.3137 4 32 6.68629 32 10V12"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Vault door circle */}
        <circle
          cx="24"
          cy="27"
          r="10"
          fill="url(#logoGradientDark)"
        />

        {/* Inner circle accent */}
        <circle
          cx="24"
          cy="27"
          r="7"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />

        {/* Heart in center - representing aid/giving */}
        <path
          d="M24 32.5C24 32.5 18 28.5 18 25C18 22.5 20 21 22 21C23.2 21 24 21.8 24 21.8C24 21.8 24.8 21 26 21C28 21 30 22.5 30 25C30 28.5 24 32.5 24 32.5Z"
          fill="#ffffff"
        />

        {/* Vault handle/dial dots */}
        <circle cx="17" cy="27" r="1.5" fill="#ffffff" opacity="0.6" />
        <circle cx="31" cy="27" r="1.5" fill="#ffffff" opacity="0.6" />
        <circle cx="24" cy="20" r="1.5" fill="#ffffff" opacity="0.6" />
        <circle cx="24" cy="34" r="1.5" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );

  const LogoContent = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      {showText && (
        <span className={`${config.text} font-heading font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent`}>
          AidVault
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

export default Logo;
