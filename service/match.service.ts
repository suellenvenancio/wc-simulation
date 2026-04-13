import client from "@/utils/client"

const MatchService = {
  async getMatches() {
    const response = await client.get("/match")
    return response
  },
  async getMatchesByTournamentId(tournamentId: number) {
    const response = await client.get(`/match/tournament/${tournamentId}`)
    return response.data
  },
  async getMatchesByStadiumId(stadiumId: number) {
    const response = await client.get(`/match/stadium/${stadiumId}`)
    return response.data
  },
  async getMatchesByHomeTeamId(homeTeamId: number) {
    const response = await client.get(`/match/homeTeam/${homeTeamId}`)
    return response.data
  },
  async getMatchesByAwayTeamId(awayTeamId: number) {
    const response = await client.get(`/match/awayTeam/${awayTeamId}`)
    return response.data
  },
  async getMatchById(id: number) {
    const response = await client.get(`/match/${id}`)
    return response.data
  },
  async getMatchByGroupId(groupId: number) {
    const response = await client.get(`/match/group/${groupId}`)
    return response.data
  },
}

export default MatchService
