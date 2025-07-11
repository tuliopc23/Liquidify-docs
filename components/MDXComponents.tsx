'use client';

import { withSSRSafety } from '@/lib/react-compat';
import { ComponentType, ReactNode, Suspense } from 'react';

// Proper type for HTML props
interface HTMLProps {
  [key: string]: unknown;
}

// Safe component wrapper for Liquidify components
const SafeLiquidifyComponent = ({
  component,
  ...props
}: {
  component: ComponentType<HTMLProps>;
} & HTMLProps) => {
  const Component = withSSRSafety(component);

  return (
    <Suspense
      fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
    >
      <Component {...props} />
    </Suspense>
  );
};

// Custom MDX components that handle React 19 compatibility
export const MDXComponents = {
  // Wrapper for any component that might have React 19 issues
  SafeComponent: SafeLiquidifyComponent,

  // Custom pre and code handling
  pre: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <pre
        className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto'
        {...props}
      >
        {children}
      </pre>
    )
  ),

  code: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <code
        className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm'
        {...props}
      >
        {children}
      </code>
    )
  ),

  // Custom heading components
  h1: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <h1
        className='text-4xl font-bold mb-6 text-gray-900 dark:text-white'
        {...props}
      >
        {children}
      </h1>
    )
  ),

  h2: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <h2
        className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'
        {...props}
      >
        {children}
      </h2>
    )
  ),

  h3: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <h3
        className='text-2xl font-bold mb-3 text-gray-900 dark:text-white'
        {...props}
      >
        {children}
      </h3>
    )
  ),

  // Custom paragraph
  p: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <p
        className='mb-4 text-gray-700 dark:text-gray-300 leading-relaxed'
        {...props}
      >
        {children}
      </p>
    )
  ),

  // Custom list components
  ul: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <ul
        className='list-disc list-inside mb-4 text-gray-700 dark:text-gray-300'
        {...props}
      >
        {children}
      </ul>
    )
  ),

  ol: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <ol
        className='list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300'
        {...props}
      >
        {children}
      </ol>
    )
  ),

  li: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <li className='mb-2' {...props}>
        {children}
      </li>
    )
  ),

  // Custom table components
  table: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <div className='overflow-x-auto mb-4'>
        <table
          className='min-w-full border-collapse border border-gray-300 dark:border-gray-600'
          {...props}
        >
          {children}
        </table>
      </div>
    )
  ),

  th: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <th
        className='border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold text-left'
        {...props}
      >
        {children}
      </th>
    )
  ),

  td: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <td
        className='border border-gray-300 dark:border-gray-600 px-4 py-2'
        {...props}
      >
        {children}
      </td>
    )
  ),

  // Custom blockquote
  blockquote: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <blockquote
        className='border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4'
        {...props}
      >
        {children}
      </blockquote>
    )
  ),

  // Custom link
  a: withSSRSafety(
    ({ children, ...props }: { children?: ReactNode } & HTMLProps) => (
      <a
        className='text-blue-600 dark:text-blue-400 hover:underline'
        {...props}
      >
        {children}
      </a>
    )
  ),
};

export default MDXComponents;
