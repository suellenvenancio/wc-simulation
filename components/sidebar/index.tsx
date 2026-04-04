"use client"
import { mergeCn } from "@/utils/cn"
import { usePathname, useRouter } from "next/navigation"
import { BallIcon } from "../icons/ball"
import { GroupsIcon } from "../icons/groups"

export default function Sidebar() {
  return (
    <aside className="w-18 h-40 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl m-6 p-2 flex flex-col gap-2 mt-42">
      <NavItem icon={<GroupsIcon />} path="/" />
      <NavItem icon={<BallIcon />} path="/matches" />
    </aside>
  )
}

function NavItem({ icon, path }: { icon: React.ReactNode; path: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const active = pathname === path

  return (
    <button
      type="button"
      onClick={() => router.push(path)}
      className={mergeCn(
        "p-4",
        active
          ? "text-[#00ff88] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          : "text-gray-400",
      )}
      aria-label={`Ir para ${path}`}
    >
      {icon}
    </button>
  )
}
