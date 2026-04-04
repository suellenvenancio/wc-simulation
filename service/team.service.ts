import client from '@/utils/client'

const TeamService = {
  async getTeamsByGroupId(groupId: number) {
    const response = await client.get(`/teams?groupId=${groupId}`)
    return response.data
  },
  async getTeamsByChampionshipId(championshipId: number) {
    const response = await client.get(`/teams?championshipId=${championshipId}`)
    return response.data
  },
}

export default TeamService
