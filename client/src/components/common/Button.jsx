import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-navy text-white hover:bg-navy-light shadow-[0_2px_8px_rgba(27,42,74,0.2)] hover:shadow-[0_4px_12px_rgba(27,42,74,0.3)]',
  secondary:
    'bg-white text-navy border border-border hover:border-navy/20 hover:bg-surface shadow-[var(--shadow-card)]',
  gold:
    'bg-gold text-navy hover:bg-gold-light shadow-[0_2px_8px_rgba(184,148,62,0.3)]',
  ghost:
    'text-navy hover:bg-surface',
  outline:
    'border-2 border-navy text-navy hover:bg-navy hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  ...props
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold rounded-lg
    transition-all duration-200 active:scale-[0.98] cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
