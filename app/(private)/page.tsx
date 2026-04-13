"use client"
import { IconButton } from "@/components/iconButton"
import { CloseIcon } from "@/components/icons/close"
import { Layout } from "@/components/layout"
import { SquadComponent } from "@/components/squad"
import { TacticalField } from "@/components/tacticalField"
import { useAuth } from "@/context/auth"
import { useGroups } from "@/hooks/use-groups"
import { useLineup } from "@/hooks/use-lineup"
import { type Group, type Player, Position, type Team } from "@/types"
import { mergeCn } from "@/utils/cn"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

export default function NationalTeamPage() {
  const { createOrUpdateDefaultLineup, getDefaltLineupByTeam } = useLineup()
  const { groups } = useGroups()
  const { user } = useAuth()

  const [selectedGroup, setSelectedGroup] = useState<Group>()
  const [selectedTeam, setSelectedTeam] = useState<Team>()
  const [selectedPosition, setSelectedPosition] = useState<Position>(
    Position.All,
  )
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(
    null,
  )
  const [lineup, setLineup] = useState<
    { player: Player; positionIndex: number }[]
  >([])
  const [formation, setFormation] = useState()

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player)
    if (selectedCellIndex === null) return

    setLineup((prev) => {
      const indexAlreadyExists = prev.some(
        (l) => l.positionIndex === selectedCellIndex,
      )

      if (indexAlreadyExists) {
        return prev.map((l) =>
          l.positionIndex === selectedCellIndex ? { ...l, player } : l,
        )
      } else {
        return [...prev, { player, positionIndex: selectedCellIndex }]
      }
    })

    setSelectedCellIndex(null)
  }
  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team)
    setSelectedCellIndex(null)
  }

  const handlePositionClick = useCallback((position: Position) => {
    setSelectedPosition(position)
  }, [])

  const filteredPlayers =
    selectedTeam?.players.filter((player) => {
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

  const onSaveTeam = async (formation: string) => {
    if (selectedTeam && user) {
      await createOrUpdateDefaultLineup({
        userId: user.id,
        formation,
        players: lineup.map((l) => {
          return { positionIndex: l.positionIndex, playerId: l.player.id }
        }),
        teamId: selectedTeam?.id,
      })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedTeam && user) {
      getDefaltLineupByTeam({
        teamId: selectedTeam?.id,
        userId: user.id,
      }).then((defaultTeam) => {
        if (defaultTeam) {
          setLineup(
            defaultTeam.players.map(
              (p: {
                id: number
                player: Player[]
                playerId: number
                positionIndex: number
                userTeamTacticId: number
              }) => ({
                player: p.player,
                positionIndex: p.positionIndex,
              }),
            ),
          )
          setFormation(defaultTeam.formation)
          return
        }
        setLineup([])
      })
    }
  }, [selectedTeam, user])

  const onSelectGroup = (group: Group) => {
    console.log(group)
    setSelectedGroup(group)
    setSelectedTeam(undefined)
    setSelectedPlayer(null)
    setSelectedPosition(Position.All)
    setLineup([])
  }

  return (
    <Layout>
      <div className="flex flex-col  justify-center items-star w-full">
        <div className="flex flex-1 mb-6 scroll-pl-6 overflow-x-auto space-x-1 w-full custom-scrollbar-hide 2-full items-start">
          {groups.map((group) => (
            // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={group.id}
              className="flex items-center m-1 cursor-pointer"
              onClick={() => onSelectGroup(group)}
            >
              <p
                key={group.id}
                className={mergeCn("glass-card p-3 w-20 text-sm", {
                  "border-neon": selectedGroup?.id === group.id,
                })}
              >
                {group.name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-12 w-270 justify-center">
          <GroupStandings
            group={selectedGroup}
            setSelectedTeam={handleSelectTeam}
            className="w-170 ml-12"
          />
          <TacticalField
            key={selectedTeam?.id}
            teamName={selectedTeam?.name || "Selecione um time"}
            flag={selectedTeam?.flag}
            handlePositionClick={handlePositionClick}
            selectedCellIndex={selectedCellIndex}
            setSelectedCellIndex={setSelectedCellIndex}
            lineup={lineup}
            onSaveTeam={onSaveTeam}
            formationDefault={formation}
            className="h-125 w-200"
          />
          <SquadComponent
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            players={filteredPlayers}
            selectedPlayer={selectedPlayer}
            handleSelectPlayer={handleSelectPlayer}
            team={selectedTeam}
            className="w-200"
          />
        </div>
      </div>
    </Layout>
  )
}

interface GroupStandingsProps {
  group?: Group
  setSelectedTeam: (team: Team) => void
  className?: string
}

function GroupStandings({
  group,
  setSelectedTeam,
  className,
}: GroupStandingsProps) {
  return (
    <div className={mergeCn("glass-card p-6 w-72 h-50", className)}>
      {group ? (
        <div>
          <h2 className="text-lg font-bold mb-2">{group.name}</h2>
          <ul>
            {group.teams?.map((team, i) => {
              const points =
                group.standings?.find((s) => s.teamId === team.id)?.points ?? 0

              return (
                // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  key={team.id}
                  className="flex items-center justify-between mb-1 cursor-pointer w-full"
                  onClick={() => setSelectedTeam(team)}
                >
                  <div className="flex  w-full">
                    <p className="mr-4">{i + 1}.</p>
                    {team.flag && (
                      <Image
                        key={team.id}
                        src={team.flag}
                        alt={team.name}
                        width={20}
                        height={20}
                        className="inline-block mr-2 max-h-10 object-contain"
                      />
                    )}

                    <li key={team.name} className={team.flag ? "" : "italic"}>
                      {team.name}
                    </li>
                  </div>
                  <p>{points}</p>
                </div>
              )
            })}
          </ul>
        </div>
      ) : (
        <p>Select a group to see the teams.</p>
      )}
    </div>
  )
}

function FeedBackModal({
  response,
  onClose,
}: {
  response: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-1 glass-card backdrop-blur-sm z-[999] flex flex-col justify-center items-center p-4 animate-in fade-in duration-200 w-200 h-150 m-52">
      <div className="flex justify-between items-center p-5 border-b border-gray-100 w-full mb-4">
        <h2 className="text-lg font-bold text-gray-800 text-white">
          Análise da Seleção
        </h2>

        <IconButton icon={<CloseIcon />} onClick={onClose} />
      </div>
      <p className="text-sm">{response}</p>
    </div>
  )
}
