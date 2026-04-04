import { mergeCn } from '@/utils/cn'

export function Button({
  name,
  className,
  onClick,
  disabled,
}: {
  name: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      className={mergeCn('bg-neon text-white px-4 py-2 rounded-2xl', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <p className='font-semibold'>{name}</p>
    </button>
  )
}
