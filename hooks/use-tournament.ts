"use client"
import tournamentsService from "@/service/tournaments.service"
import type { Championship } from "@/types"
import useSWR from "swr"

export function useTournament() {
  const { data, mutate, isLoading } = useSWR<Championship[]>(
    "championship",
    () =>
      tournamentsService.getTournaments() as unknown as Promise<Championship[]>,
  )

  return { tournament: data?.[0], mutate, isLoading }
}
