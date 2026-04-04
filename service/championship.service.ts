import client from '../utils/client'

const ChampionshipService = {
  async getChampionships() {
    const response = await client.get('/championships')
    return response.data
  },
}

export default ChampionshipService
