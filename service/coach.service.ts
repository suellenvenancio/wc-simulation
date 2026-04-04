import client from '../utils/client'

const CoachService = {
  async getCoachesByTeamId(teamId: number) {
    const response = await client.get(`/coaches?teamId=${teamId}`)
    return response.data
  },
}

export default CoachService
