import { Player } from '@/types'
import client from '@/utils/client'

const PlayerService = {
  async getPlayersByTeamId(teamId: number): Promise<Player[]> {
    const response = await client.get(`/players?teamId=${teamId}`)
    return response.data
  },
}

export default PlayerService
