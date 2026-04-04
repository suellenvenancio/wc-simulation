'use client'
import type { Match } from '@/types'
import useSWR from 'swr'
import MatchService from '../service/match.service'
import { useChampionShip } from './use-championship'

export function useMatch() {
  const { championship } = useChampionShip()
  const championshipId = 1

  const { data, mutate, isLoading } = useSWR<Match[]>(
    championshipId ? 'match' : null,
    () => MatchService.getMatchesByChampionshipId(championshipId!),
  )

  return { matches: data ?? [], mutate, isLoading }
}
