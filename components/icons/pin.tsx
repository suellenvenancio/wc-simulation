import { mergeCn } from "@/utils/cn"

export function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Pin"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={mergeCn("h-6 w-6", className)}
    >
      <g
        stroke="#0DF5A4"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 95 C 15 55, 15 15, 50 15 C 85 15, 85 55, 50 95 Z" />

        <circle cx="50" cy="45" r="10" />
      </g>
    </svg>
  )
}
