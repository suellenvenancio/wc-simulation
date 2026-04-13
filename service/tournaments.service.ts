import client from "../utils/client"

const tournamentsService = {
  async getTournaments() {
    const response = await client.get("/tournament")
    return response
  },

  async getTournamentById(id: string) {
    const response = await client.get(`/tournament/${id}`)
    return response
  },
}

export default tournamentsService
