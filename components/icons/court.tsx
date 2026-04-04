import { mergeCn } from "@/utils/cn"

export function CourtIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Quadra"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      role="img"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeCn("h-6 w-6", className)}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <circle cx="12" cy="12" r="3" />
      <path d="M2 9h3v6H2" />
      <path d="M22 9h-3v6h2" />
    </svg>
  )
}
