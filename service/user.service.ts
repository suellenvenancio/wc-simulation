import { User } from '@/types'
import client from '@/utils/client'

export const userSevice = {
  async me(): Promise<User> {
    return (await client.get('/users/me')).data
  },
  async createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    return (await client.post('/users', { name, email, password })).data
  },
}
