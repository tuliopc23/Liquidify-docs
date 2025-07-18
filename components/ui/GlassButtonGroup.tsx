'use client';

import React from 'react';
import { GlassCard, cn } from 'liquidify';

export interface GlassButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  attached?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const GlassButtonGroup: React.FC<GlassButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  size = 'md',
  variant = 'primary',
  attached = true,
  spacing = 'none',
  disabled = false,
  className,
  ...props
}) => {
  const orientationStyles = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const spacingStyles = {
    none: 'gap-0',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variantStyles = {
    primary: 'bg-white/20 text-white',
    secondary: 'bg-white/10 text-white/90',
    outline: 'bg-transparent border border-white/30 text-white',
    ghost: 'bg-transparent text-white',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'relative overflow-hidden',
    orientationStyles[orientation],
    attached ? spacingStyles.none : spacingStyles[spacing],
    sizeStyles[size],
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  // Process children to add group-specific styling
  const processedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      const childClasses = cn(
        (child.props as { className?: string }).className,
        attached &&
          orientation === 'horizontal' && {
            'rounded-l-none': !isFirst,
            'rounded-r-none': !isLast,
            'border-l-0': !isFirst && variant === 'outline',
          },
        attached &&
          orientation === 'vertical' && {
            'rounded-t-none': !isFirst,
            'rounded-b-none': !isLast,
            'border-t-0': !isFirst && variant === 'outline',
          },
        disabled && 'pointer-events-none'
      );

      return React.cloneElement(child, {
        ...(child.props as Record<string, unknown>),
        ...(childClasses && { className: childClasses }),
        disabled: disabled || (child.props as { disabled?: boolean }).disabled,
        size: (child.props as { size?: string }).size || size,
        variant: (child.props as { variant?: string }).variant || variant,
      } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <GlassCard
      className={baseClasses}
      role='group'
      aria-disabled={disabled}
      {...props}
    >
      {processedChildren}
    </GlassCard>
  );
};

export default GlassButtonGroup;
