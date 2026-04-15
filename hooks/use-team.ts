"use client"
import teamService from "@/service/team.service"
import type { Team } from "@/types"
import useSWR from "swr"

export function useTeam() {
  const championshipId = 1

  const { data, mutate, isLoading } = useSWR<Team[] | []>(
    championshipId ? "teams" : null,
    () => teamService.getTeamsByTournamentId(championshipId),
  )

  return { teams: data ?? [], mutate, isLoading }
}
