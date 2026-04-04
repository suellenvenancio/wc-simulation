import client from "@/utils/client"

const promptService = {
  simulateMatch: async ({
    promptName,
    awayTeam,
    homeTeam,
    awayTeamPlayers,
    homeTeamPlayers,
    tacticAwayTeam,
    tacticHomeTeam,
    matchId,
  }: {
    promptName: string
    homeTeam: string
    awayTeam: string
    homeTeamPlayers: string[]
    awayTeamPlayers: string[]
    tacticHomeTeam: string
    tacticAwayTeam: string
    matchId: number
  }) => {
    const response = await client.post("/prompt/simulateMatch", {
      promptName,
      homeTeam,
      awayTeam,
      homeTeamPlayers,
      awayTeamPlayers,
      tacticHomeTeam,
      tacticAwayTeam,
      matchId,
    })
    return response
  },
  simulateDefaultTeam: async ({
    promptName,
    tactic,
    teamName,
    teamPlayers,
    userTacticId,
  }: {
    promptName: string
    tactic: string
    teamName: string
    teamPlayers: string[]
    userTacticId: number
  }): Promise<{
    id: number
    promptId: number
    sentPrompt: string
    response: string
    userTacticId: number
    matchLineupId: number | null
    matchId: number | null
    createdAt: string
  }> => {
    return await client.post("/prompt/simulateDefaultTeam", {
      promptName,
      tactic,
      teamName,
      teamPlayers,
      userTacticId,
    })
  },
}

export default promptService
