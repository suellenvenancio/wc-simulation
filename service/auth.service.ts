import client from "@/utils/client"

const authService = {
  login: async (email: string, password: string) => {
    const response = await client.post("/auth/login", {
      email,
      password,
    })

    return response
  },
  logout: async () => {
    return await client.post("auth/logout")
  },
}

export default authService
