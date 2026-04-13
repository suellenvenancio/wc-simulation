import client from "@/utils/client"

const TeamService = {
  async getTeamsByGroupId(groupId: number) {
    const response = await client.get(`/team/group/${groupId}`)
    return response.data
  },
  async getTeamsByTournamentId(tournamentId: number) {
    const response = await client.get(`/team/tournament/${tournamentId}`)
    return response.data
  },
}

export default TeamService
