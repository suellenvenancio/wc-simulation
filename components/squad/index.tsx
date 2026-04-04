import { Player, Position, Team } from "@/types"
import { mergeCn } from "@/utils/cn"
import { SquadFilter } from "../squadFilter"

interface SquadProps {
  team?: Team
  selectedPosition: Position
  setSelectedPosition: (position: Position) => void
  selectedPlayer: Player | null
  players: Player[]
  handleSelectPlayer: (player: Player) => void
  className?: string
}

const filteredPlayers = (players: Player[], selectedPosition: Position) =>
  players.filter((player) => {
    switch (selectedPosition) {
      case Position.GOL:
        return player.position === "GOL"
      case Position.DEF:
        return player.position === "DEF"
      case Position.MEI:
        return player.position === "MEI"
      case Position.ATA:
        return player.position === "ATA"
      default:
        return true
    }
  }) || []

export function SquadComponent({
  team,
  selectedPlayer,
  selectedPosition,
  setSelectedPosition,
  handleSelectPlayer,
  className,
}: SquadProps) {
  return (
    <div
      className={mergeCn(
        "glass-card p-6 w-75 font-bold overflow-y-auto space-y-1 max-h-125 custom-scrollbar-hide h-200",
        className,
      )}
    >
      <h1 className="mb-4">Elenco disponível</h1>
      <SquadFilter
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
      />
      {team ? (
        filteredPlayers(team.players, selectedPosition).map((player) => (
          <SquadPlayerItem
            key={player.id}
            player={player}
            onSelectPlayer={() => handleSelectPlayer(player)}
            isPlayerSelected={selectedPlayer?.id === player.id}
          />
        ))
      ) : (
        <p className="mt-4">
          Selecione um time para ver os jogadores disponíveis.
        </p>
      )}
    </div>
  )
}

interface SquadPlayerProps {
  player: Player
  onSelectPlayer: () => void
  isPlayerSelected?: boolean
}

export function SquadPlayerItem({
  player,
  onSelectPlayer,
  isPlayerSelected,
}: SquadPlayerProps) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={mergeCn(
        "flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] transition-all group mb-2 mt-2 w-full",
        {
          "border-neon": isPlayerSelected,
        },
      )}
      onClick={onSelectPlayer}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="relative w-16 h-14 rounded-lg overflow-hidden border border-white/10 bg-white/5">
          <img
            src={player.image}
            alt={player.name}
            className="w-28 h-14 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <span className="text-xs font-bold text-white group-hover:text-neon transition-colors">
              {player.name}
            </span>
            <p className="text-xs">{player.overallRating}</p>
          </div>

          <span className="text-[9px] font-medium text-gray-500 uppercase tracking-tighter">
            {player.position}
          </span>
        </div>
      </div>
    </div>
  )
}
