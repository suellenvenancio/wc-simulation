"use client"
import { Layout } from "@/components/layout"
import { MatchCard } from "@/components/matchCard"
import { useMatch } from "@/hooks/use-match"

export default function MatchesPage() {
  const { matches } = useMatch()

  return (
    <Layout>
      <h1 className="mb-4 font-bold text-2xl tracking-tight">Jogos</h1>
      <div className="flex items-center gap-12 flex-wrap">
        {matches.map((match) => (
          <div key={match.id} className="flex items-center gap-2 m-2">
            <MatchCard
              matchId={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              matchDate={match.matchDate}
              stadium={match?.stadium}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}
