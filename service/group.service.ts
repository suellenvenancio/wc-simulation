import client from "@/utils/client"

const groupService = {
  async getGroupsByTournamentId(tournamentId: number) {
    const response = await client.get(`/group/tournament/${tournamentId}`)
    return response.data
  },
}

export default groupService
