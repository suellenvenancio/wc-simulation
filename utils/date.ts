export function formatDate(date: Date) {
  const dateObj = new Date(date)

  const day = dateObj.toLocaleDateString('pt-BR', { day: '2-digit' })

  const month = dateObj
    .toLocaleDateString('pt-BR', { month: 'long' })
    .toUpperCase()
  const year = dateObj.toLocaleDateString('pt-BR', { year: 'numeric' })

  return `${day} DE ${month}, ${year}`
}

export function formatTime(date: Date) {
  const dateObj = new Date(date)
  return dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date) {
  return `${formatDate(date)} • ${formatTime(date)}`
}
