import type { Team } from '@/types'
import Image from 'next/image'

interface GroupCardsProps {
  groupName: string
  teams: Team[]
}

export function GroupCards({ groupName, teams }: GroupCardsProps) {
  return (
    <div className='glass-card p-6 w-72'>
      <p className='mb-4 font-bold tracking-tight'> {groupName}</p>
      {teams.map(team => (
        <div key={team.id} className='flex items-center gap-2 m-2'>
          {team.flag && (
            <Image src={team.flag} alt={team.name} width={20} height={20} />
          )}
          <p className={team.flag ? '' : 'italic'}>{team.name}</p>
        </div>
      ))}
    </div>
  )
}
