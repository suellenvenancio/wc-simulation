import PlayerService from '@/service/player.service'

export function usePlayer() {
  async function getPlayersByTeamId(teamId: number) {
    return (await PlayerService.getPlayersByTeamId(teamId)) ?? []
  }

  return { getPlayersByTeamId }
}
