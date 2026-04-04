'use client'
import GroupService from '@/service/group.service'
import type { Group } from '@/types'
import useSWR from 'swr'
import { useChampionShip } from './use-championship'

export function useGroups() {
  const { championship } = useChampionShip()
  const championshipId = 1

  const { data, mutate, isLoading } = useSWR<Group[]>(
    championshipId ? 'groups' : null,
    () => {
      return GroupService.getGroupsByChampionshipId(championshipId!)
    },
  )
  return { groups: data ?? [], mutate, isLoading }
}
