"use client"
import { Button } from "@/components/button"
import { Layout } from "@/components/layout"
import { SquadComponent } from "@/components/squad"
import { type FormationKey, TacticalField } from "@/components/tacticalField"
import { useSimulate } from "@/hooks/use-simulate"
import { useTeam } from "@/hooks/use-team"
import { type Player, Position, PromptName, type Team } from "@/types"
import { mergeCn } from "@/utils/cn"
import { useParams } from "next/navigation"
import { useCallback, useState } from "react"

export default function SimulatePage() {
  const { teams } = useTeam()
  const params = useParams()

  const homeTeamId = params.homeTeamId as string
  const awayTeamId = params.awayTeamId as string
  const matchId = params.matchId as string

  const [selectedPositionHomeTeam, setSelectedPositionHomeTeam] =
    useState<Position>(Position.All)
  const [selectedPositionAwayTeam, setSelectedPositionAwayTeam] =
    useState<Position>(Position.All)
  const [selectedCellIndexHomeTeam, setSelectedCellIndexHomeTeam] = useState<
    number | null
  >(null)
  const [selectedCellIndexAwayTeam, setSelectedCellIndexAwayTeam] = useState<
    number | null
  >(null)
  const [selectedPlayerHomeTeam, setSelectedPlayerHomeTeam] =
    useState<Player | null>(null)
  const [selectedPlayerAwayTeam, setSelectedPlayerAwayTeam] =
    useState<Player | null>(null)

  const [lineupHomeTeam, setLineupHomeTeam] = useState<
    { player: Player; positionIndex: number }[]
  >([])
  const [lineupAwayTeam, setLineupAwayTeam] = useState<
    { player: Player; positionIndex: number }[]
  >([])

  const [formationHomeTeam, setFormationHomeTeam] =
    useState<FormationKey>("4-4-2")
  const [formationAwayTeam, setFormationAwayTeam] =
    useState<FormationKey>("4-4-2")

  const { simulateMatch } = useSimulate()

  const homeTeam = teams.find((team) => team.id === Number(homeTeamId))
  const awayTeam = teams.find((team) => team.id === Number(awayTeamId))

  const handlePositionHomeTeam = useCallback((position: Position) => {
    setSelectedPositionHomeTeam(position)
  }, [])

  const handlePositionAwayTeam = useCallback((position: Position) => {
    setSelectedPositionAwayTeam(position)
  }, [])

  const onSaveSimulationHomeTeam = async (formation: FormationKey) => {
    setFormationHomeTeam(formation)
  }

  const onSaveSimulationAwayTeam = async (formation: FormationKey) => {
    setFormationAwayTeam(formation)
  }

  const filteredPlayers = (team: Team, selectedPosition: Position) => {
    return (
      team?.players.filter((player) => {
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
    )
  }

  const handleSelectPlayerAwayTeam = (player: Player) => {
    setSelectedPlayerAwayTeam(player)
    if (selectedCellIndexAwayTeam === null) return

    setLineupAwayTeam((prev) => {
      const indexAlreadyExists = prev.some(
        (l) => l.positionIndex === selectedCellIndexAwayTeam,
      )

      if (indexAlreadyExists) {
        return prev.map((l) =>
          l.positionIndex === selectedCellIndexAwayTeam ? { ...l, player } : l,
        )
      } else {
        return [...prev, { player, positionIndex: selectedCellIndexAwayTeam }]
      }
    })
  }

  const handleSelectPlayerHomeTeam = (player: Player) => {
    setSelectedPlayerHomeTeam(player)
    if (selectedCellIndexHomeTeam === null) return

    setLineupHomeTeam((prev) => {
      const indexAlreadyExists = prev.some(
        (l) => l.positionIndex === selectedCellIndexHomeTeam,
      )

      if (indexAlreadyExists) {
        return prev.map((l) =>
          l.positionIndex === selectedCellIndexHomeTeam ? { ...l, player } : l,
        )
      } else {
        return [...prev, { player, positionIndex: selectedCellIndexHomeTeam }]
      }
    })
  }

  const handleSimulateMatch = async () => {
    await simulateMatch({
      promptName: PromptName.MATCH_LINEUP,
      homeTeam: homeTeam?.name ?? "",
      awayTeam: awayTeam?.name ?? "",
      tacticHomeTeam: formationHomeTeam,
      tacticAwayTeam: formationAwayTeam,
      homeTeamPlayers: lineupHomeTeam.map((l) => l.player.name),
      awayTeamPlayers: lineupAwayTeam.map((l) => l.player.name),
      matchId: Number(matchId),
    })
  }

  return (
    <Layout>
      <div className="flex justify-end w-full">
        <Button
          name="Simular jogo"
          onClick={() => handleSimulateMatch()}
          className={mergeCn(
            "w-36 mr-12 mt-4 py-3 bg-white/5 border border-white/10rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400",
            {
              " hover:border-neon/30 hover:text-neon transition-all text-white hover:bg-neon/10":
                lineupHomeTeam.length === 11 && lineupAwayTeam.length === 11,
            },
          )}
        />
      </div>
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex gap-4">
          <SquadComponent
            selectedPosition={selectedPositionHomeTeam}
            setSelectedPosition={setSelectedPositionHomeTeam}
            players={filteredPlayers(homeTeam!, selectedPositionHomeTeam)}
            selectedPlayer={selectedPlayerHomeTeam}
            handleSelectPlayer={handleSelectPlayerHomeTeam}
            team={homeTeam}
            className="w-70 h-150"
          />

          <section className="col-span-8 space-y-6">
            <div className="flex gap-4">
              <TacticalField
                teamName={homeTeam?.name ?? ""}
                flag={homeTeam?.flag}
                handlePositionClick={handlePositionHomeTeam}
                selectedCellIndex={selectedCellIndexHomeTeam}
                setSelectedCellIndex={setSelectedCellIndexHomeTeam}
                lineup={lineupHomeTeam}
                onSaveTeam={onSaveSimulationHomeTeam}
                className="w-80 h-130"
              />
              <TacticalField
                teamName={awayTeam?.name ?? ""}
                flag={awayTeam?.flag}
                handlePositionClick={handlePositionAwayTeam}
                selectedCellIndex={selectedCellIndexAwayTeam}
                setSelectedCellIndex={setSelectedCellIndexAwayTeam}
                lineup={lineupAwayTeam}
                onSaveTeam={onSaveSimulationAwayTeam}
                className="w-80 h-130"
              />
            </div>
          </section>

          <SquadComponent
            selectedPosition={selectedPositionAwayTeam}
            setSelectedPosition={setSelectedPositionAwayTeam}
            players={filteredPlayers(awayTeam!, selectedPositionAwayTeam)}
            selectedPlayer={selectedPlayerAwayTeam}
            handleSelectPlayer={handleSelectPlayerAwayTeam}
            team={awayTeam}
            className="mr-6 w-70 h-170"
          />
        </div>
      </main>
    </Layout>
  )
}
