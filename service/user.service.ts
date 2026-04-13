import { User } from "@/types"
import client from "@/utils/client"

export const userSevice = {
  async me(): Promise<User> {
    return (await client.get("/user/me")).data
  },
  async createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await client.post("/user", { name, email, password })
  },
}
