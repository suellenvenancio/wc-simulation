import { Stadium, Team } from "@/types"
import { formatDateTime } from "@/utils/date"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../button"
import { CalendaryIcon } from "../icons/calendary"
import { PinIcon } from "../icons/pin"

interface MatchCardProps {
  homeTeam: Team
  awayTeam: Team
  matchDate: Date
  matchId: number
  stadium?: Stadium
}

export function MatchCard({
  homeTeam,
  awayTeam,
  matchDate,
  stadium,
  matchId,
}: MatchCardProps) {
  const router = useRouter()

  return (
    <div className="glass-card p-6 w-90 flex flex-col gap-2">
      <p className="text-sm flex items-center justify-center">
        <CalendaryIcon className="mr-2" /> {formatDateTime(matchDate)}
      </p>
      {stadium && (
        <p className="text-sm flex items-center justify-center">
          <PinIcon className="mr-2" />
          {stadium.name} -{" "}
          {stadium.city.slice(stadium.city.lastIndexOf(",") + 1).trim()}
        </p>
      )}
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <Image
            src={homeTeam?.flag}
            alt={homeTeam?.name}
            width={20}
            height={20}
          />
          <p>{homeTeam?.name}</p>
        </div>
        <p>x</p>
        <div className="flex items-center gap-2">
          <p>{awayTeam?.name}</p>
          <Image
            src={awayTeam?.flag}
            alt={awayTeam?.name}
            width={20}
            height={20}
          />
        </div>
      </div>
      <Button
        name="simular jogo"
        className="w-full mt-4"
        onClick={() =>
          router.push(
            `/simulate/homeTeam/${homeTeam.id}/awayTeam/${awayTeam.id}/match/${matchId}`,
          )
        }
      />
    </div>
  )
}
