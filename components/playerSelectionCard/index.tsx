'use client'

import Image from 'next/image'

interface PlayerProps {
  name: string
  age: number
  club: string
  image: string
  type: 'titular' | 'reserva'
}

export function PlayerSelectionCard({
  name,
  age,
  club,
  image,
  type,
}: PlayerProps) {
  const isTitular = type === 'titular'

  return (
    <div className='glass-card p-4 relative group border border-white/10 hover:border-neon/40 transition-all'>
      {/* Botão de Remover (SVG Puro) */}
      <button
        type='button'
        className='absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all'
        aria-label='Remover jogador'
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='18' y1='6' x2='6' y2='18'></line>
          <line x1='6' y1='6' x2='18' y2='18'></line>
        </svg>
      </button>

      <div className='flex items-center gap-4 mb-5'>
        {/* Avatar do Jogador */}
        <div className='relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5'>
          <Image src={image} alt={name} fill className='object-cover' />
        </div>

        {/* Info */}
        <div className='flex flex-col'>
          <h3 className='text-base font-bold text-white tracking-tight'>
            {name}
          </h3>
          <span className='text-[10px] text-gray-500 uppercase font-medium tracking-widest'>
            {age} anos • {club}
          </span>
        </div>
      </div>

      {/* Botão de Ação com Gradiente da Imagem */}
      <button
        type='button'
        className={`w-full py-3 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all active:scale-95
          ${
            isTitular
              ? 'bg-gradient-to-r from-[#00ff88] to-[#ccff00] text-black shadow-[0_4px_15px_rgba(0,255,136,0.2)] hover:shadow-[0_4px_25px_rgba(0,255,136,0.4)]'
              : 'bg-gradient-to-r from-[#00ddeb] to-[#00ff88] text-black shadow-[0_4px_15px_rgba(0,221,235,0.2)] hover:shadow-[0_4px_25px_rgba(0,221,235,0.4)]'
          }
        `}
      >
        Escolher para {isTitular ? 'Titular' : 'Reserva'}
      </button>
    </div>
  )
}
