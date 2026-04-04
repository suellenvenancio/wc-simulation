import promptService from "@/service/prompt.service"

export const usePrompt = () => {
  const simulateMatch = async ({
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
    const response = await promptService.simulateMatch({
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
  }
  const simulateDefaultTeam = async ({
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
  }) => {
    const response = await promptService.simulateDefaultTeam({
      promptName,
      tactic,
      teamName,
      teamPlayers,
      userTacticId,
    })
    return response
  }
  return {
    simulateMatch,
    simulateDefaultTeam,
  }
}
