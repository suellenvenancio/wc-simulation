'use client'
import { Button } from '@/components/button'
import { toast } from '@/components/toast'
import { userSevice } from '@/service/user.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateAccountPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleCreateAccout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const user = await userSevice.createAccount(name, email, password)

    if (user) {
      router.push('/login')
      return
    }
    toast('Erro ao criar conta')
  }

  return (
    <div className='flex flex-col glass-card w-full h-screen items-center justify-center gap-2'>
      <h1 className='text-2xl font-bold mb-6'>Create Account Page</h1>
      <form onSubmit={handleCreateAccout}>
        <input
          name='name'
          placeholder='nome'
          className='border p-4 rounded-2xl mb-4 w-full text-neon'
          onChange={e => setName(e.target.value)}
        />
        <input
          name='email'
          placeholder='email'
          className='border p-4 rounded-2xl mb-4 w-full text-neon'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name='password'
          placeholder='password'
          className='border p-4 rounded-2xl mb-4 w-full text-neon'
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          className='w-full bg-neon p-4 text-xl font-bold'
          name={'Criar'}
        />
      </form>
    </div>
  )
}
