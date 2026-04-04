'use client'
import ChampionshipService from '@/service/championship.service'
import type { Championship } from '@/types'
import useSWR from 'swr'

export function useChampionShip() {
  const { data, mutate, isLoading } = useSWR<Championship[]>(
    'championship',
    () => ChampionshipService.getChampionships() as Promise<Championship[]>,
  )

  return { championship: data?.[0], mutate, isLoading }
}
