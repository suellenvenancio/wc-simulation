"use client"
import type { Match } from "@/types"
import useSWR from "swr"
import MatchService from "../service/match.service"
import { useTournament } from "./use-tournament"

export function useMatch() {
  const { tournament } = useTournament()
  const tournamentId = 1

  const { data, mutate, isLoading } = useSWR<Match[]>(
    tournamentId ? "match" : null,
    () => MatchService.getMatchesByTournamentId(tournamentId!),
  )

  return { matches: data ?? [], mutate, isLoading }
}
