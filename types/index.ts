export interface Championship {
  id: number
  name: string
  year: number
  teams?: Team[]
  matches?: Match[]
  groups?: Group[]
}

export interface GroupStanding {
  id: number
  teamId: number
  team?: Team
  groupId: number
  group?: Group
  points: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface Group {
  id: number
  name: string
  championshipId: number
  championship?: Championship
  teams?: Team[]
  standings?: GroupStanding[]
}

export interface Stadium {
  id: number
  name: string
  city: string
  capacity: number
  matches?: Match[]
}

export interface Team {
  id: number
  name: string
  flag: string
  rankingFifa?: number | null
  championships?: Championship[]
  groupId?: number | null
  group?: Group | null
  staff?: Staff | null
  players: Player[]
  homeMatches?: Match[]
  awayMatches?: Match[]
}

export interface Staff {
  id: number
  name: string
  preferredFormation?: string | null
  teamId: number
  team?: Team
}

export interface Player {
  id: number
  name: string
  position: string
  overallRating: number
  goalsLastSeason: number
  teamId: number
  team?: Team
  image: string
}

export interface Match {
  id: number
  matchDate: Date
  homeScore?: number | null
  awayScore?: number | null
  championshipId: number
  championship?: Championship
  stadiumId: number
  stadium?: Stadium
  homeTeamId: number
  homeTeam: Team
  awayTeamId: number
  awayTeam: Team
}

export enum Position {
  All = "All",
  GOL = "GOL",
  DEF = "DEF",
  MEI = "MEI",
  ATA = "ATA",
}

export interface ResponseType<T> {
  message: string
  statusCode: number
  data: T
}

export interface User {
  id: string
  name: string
  email: string
}

export enum PromptName {
  DEFAULT_LINEUP = "DEFAULT_LINEUP",
  MATCH_LINEUP = "MATCH_LINEUP",
}
