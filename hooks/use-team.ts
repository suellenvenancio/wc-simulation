'use client'
import TeamService from '@/service/team.service'
import type { Team } from '@/types'
import useSWR from 'swr'
import { useChampionShip } from './use-championship'

export function useTeam() {
  const { championship } = useChampionShip()
  const championshipId = 1

  const { data, mutate, isLoading } = useSWR<Team[]>(
    championshipId ? 'teams' : null,
    () => TeamService.getTeamsByChampionshipId(championshipId),
  )

  return { teams: data ?? [], mutate, isLoading }
}
