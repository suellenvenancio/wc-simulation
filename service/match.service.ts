import client from '@/utils/client'

const MatchService = {
  async getMatches() {
    const response = await client.get('/matches')
    return response.data
  },
  async getMatchesByChampionshipId(championshipId: number) {
    const response = await client.get(
      `/matches?championshipId=${championshipId}`,
    )
    return response.data
  },
  async getMatchesByStadiumId(stadiumId: number) {
    const response = await client.get(`/matches?stadiumId=${stadiumId}`)
    return response.data
  },
  async getMatchesByHomeTeamId(homeTeamId: number) {
    const response = await client.get(`/matches?homeTeamId=${homeTeamId}`)
    return response.data
  },
  async getMatchesByAwayTeamId(awayTeamId: number) {
    const response = await client.get(`/matches?awayTeamId=${awayTeamId}`)
    return response.data
  },
  async getMatchById(id: number) {
    const response = await client.get(`/matches/${id}`)
    return response.data
  },
  async getMatchByGroupId(groupId: number) {
    const response = await client.get(`/matches?groupId=${groupId}`)
    return response.data
  },
}

export default MatchService
