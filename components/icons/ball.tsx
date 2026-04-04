import { mergeCn } from '@/utils/cn'

export function BallIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      role='img'
      aria-label='Bola'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={mergeCn('h-6 w-6', className)}
    >
      <circle cx='12' cy='12' r='10' />
      <path d='m16 12-4 3-4-3 1-5h6l1 5Z' />
      <path d='M12 15v5' />
      <path d='M16 12 20.5 9' />
      <path d='M17.5 5 15 7' />
      <path d='M9 7 6.5 5' />
      <path d='M8 12 3.5 9' />
    </svg>
  )
}
