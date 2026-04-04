import client from "@/utils/client"

export const simulateService = {
  async createDefaultLineup({
    userId,
    teamId,
    formation,
    players,
  }: {
    userId: string
    teamId: number
    formation: string
    players: { playerId: number; positionIndex: number }[]
  }): Promise<{
    id: number
    formation: string
    userId: string
    teamId: number
  }> {
    return await client.post("simulate/lineup/default", {
      userId,
      teamId,
      formation,
      players,
    })
  },
  async getDefaultLineup({
    userId,
    teamId,
  }: {
    userId: string
    teamId: number
  }) {
    return await client.get(`simulate/lineup/user/${userId}/team/${teamId}`)
  },
  async createOrUpdateLineup({
    userId,
    teamId,
    formation,
    matchId,
    players,
  }: {
    userId: string
    teamId: number
    formation: string
    matchId: number
    players: { playerId: number; positionIndex: number }[]
  }) {
    return await client.post("simulation/lineup", {
      userId,
      teamId,
      formation,
      matchId,
      players,
    })
  },
}
