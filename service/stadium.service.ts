import client from "@/utils/client"

const StadiumService = {
  async getStadiums() {
    const response = await client.get("/stadium")
    return response.data
  },
}

export default StadiumService
