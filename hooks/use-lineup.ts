"use-client"

import { simulateService } from "@/service/lineups"

export function useLineup() {
  const getDefaltLineupByTeam = async ({
    userId,
    teamId,
  }: {
    userId: string
    teamId: number
  }) => {
    return (await simulateService.getDefaultLineup({ userId, teamId })).data
  }

  const createOrUpdateDefaultLineup = async ({
    userId,
    teamId,
    formation,
    players,
  }: {
    userId: string
    teamId: number
    formation: string
    players: { playerId: number; positionIndex: number }[]
  }) => {
    return await simulateService.createDefaultLineup({
      userId,
      teamId,
      formation,
      players,
    })
  }

  return {
    getDefaltLineupByTeam,
    createOrUpdateDefaultLineup,
  }
}
