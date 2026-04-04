import { mergeCn } from "@/utils/cn"

export function CalendaryIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Calendário"
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
        <path d="M15 25 H85 V85 H15 V25 Z" />

        <path d="M30 15 V30" />
        <path d="M70 15 V30" />

        <path d="M25 45 H75" />
        <path d="M25 60 H75" />
        <path d="M25 75 H75" />

        <path d="M40 40 V80" />
        <path d="M60 40 V80" />
      </g>
    </svg>
  )
}
