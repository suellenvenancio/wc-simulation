"use client"
import groupService from "@/service/group.service"
import type { Group } from "@/types"
import useSWR from "swr"
import { useTournament } from "./use-tournament"

export function useGroups() {
  const { tournament } = useTournament()
  const championshipId = 1

  const { data, mutate, isLoading } = useSWR<Group[]>(
    championshipId ? "groups" : null,
    () => {
      return groupService.getGroupsByTournamentId(championshipId!)
    },
  )

  return { groups: data ?? [], mutate, isLoading }
}
