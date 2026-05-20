import React from 'react';
import './BrandLogo.css';

const MARK_SRC = '/images/brand/logo-mark.png';
const WORDMARK_SRC = '/images/brand/logo-wordmark.png';

function BrandLogo({ variant = 'lockup', className = '', decorative = true }) {
  const classes = ['brand-logo-unit', `brand-logo-unit--${variant}`, className]
    .filter(Boolean)
    .join(' ');
  const alt = decorative ? '' : 'Lingo Booth';

  if (variant === 'mark') {
    return (
      <span className={classes}>
        <img className="brand-logo-unit__mark" src={MARK_SRC} alt={alt} />
      </span>
    );
  }

  if (variant === 'wordmark') {
    return (
      <span className={classes}>
        <img className="brand-logo-unit__wordmark" src={WORDMARK_SRC} alt={alt} />
      </span>
    );
  }

  return (
    <span className={classes}>
      <img className="brand-logo-unit__mark" src={MARK_SRC} alt="" aria-hidden="true" />
      <img className="brand-logo-unit__wordmark" src={WORDMARK_SRC} alt={alt} />
    </span>
  );
}

export default BrandLogo;
