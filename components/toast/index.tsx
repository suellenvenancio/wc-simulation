import type { ToastOptions } from 'react-toastify'
import { ToastContainer, toast as tostify } from 'react-toastify'

export function toast(message: string, options?: ToastOptions) {
  tostify(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeButton: true,
    style: { backgroundColor: '#00ff88', color: 'white', fontWeight: 700 },
    ...options,
  })
}

export function AppToastContainer() {
  return (
    <ToastContainer
      position='top-right'
      autoClose={4000}
      hideProgressBar
      closeButton={true}
    />
  )
}
