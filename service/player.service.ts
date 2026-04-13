import { Player } from "@/types"
import client from "@/utils/client"

const PlayerService = {
  async getPlayersByTeamId(teamId: number): Promise<Player[]> {
    const response = await client.get(`/player/team/${teamId}`)
    return response.data
  },
}

export default PlayerService
