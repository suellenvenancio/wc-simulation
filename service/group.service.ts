import client from '@/utils/client'

const GroupService = {
  async getGroupsByChampionshipId(championshipId: number) {
    const response = await client.get(
      `/groups?championshipId=${championshipId}`,
    )
    return response.data
  },
}

export default GroupService
