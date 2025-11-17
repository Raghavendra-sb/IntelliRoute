import { useGlobalQueries } from '../context/GlobalQueryContext.jsx'
import HistoryCard from '../components/HistoryCard.jsx'

export default function History() {
  const { queries } = useGlobalQueries()
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold">History</h2>
      <div className="grid gap-3">
        {queries.length === 0 && <div className="opacity-70">No history yet</div>}
        {queries.map((q, i) => (
          <HistoryCard key={i} item={q} />
        ))}
      </div>
    </main>
  )
}