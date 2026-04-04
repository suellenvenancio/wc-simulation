'use client'

import { Position } from '@/types'

const positions = Object.values(Position)

export function SquadFilter({
  selectedPosition,
  setSelectedPosition,
}: {
  selectedPosition?: Position
  setSelectedPosition: (position: Position) => void
}) {
  const activeFilter = selectedPosition || Position.All

  return (
    <div className='flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/5'>
      {positions.map(pos => (
        <button
          key={pos}
          onClick={() => setSelectedPosition(pos)}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeFilter === pos
              ? 'bg-white/10 text-neon shadow-[0_0_10px_rgba(0,255,136,0.2)]'
              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          {pos}
        </button>
      ))}
    </div>
  )
}
