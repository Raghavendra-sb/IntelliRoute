import { useState } from 'react'
import QueryInputBox from '../components/QueryInputBox.jsx'
import ResponseCard from '../components/ResponseCard.jsx'
import { runQuery } from '../lib/api.js'
import { useGlobalQueries } from '../context/GlobalQueryContext.jsx'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert.jsx'

export default function Query() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const { addQuery } = useGlobalQueries()

  async function submit() {
    if (!text.trim()) {
      setError('Please enter a query')
      return
    }
    setError('')
    setLoading(true)
    setData(null)
    try {
      const res = await runQuery(text)
      setData(res)
      addQuery({ ...res, timestamp: Date.now() })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2">
      <div className="space-y-3">
        <div className="glass gradient-border p-4">
          <div className="text-sm opacity-70">Enter your query</div>
          <QueryInputBox value={text} onChange={setText} onSubmit={submit} loading={loading} />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div>
        <ResponseCard data={data} loading={loading} />
      </div>
    </main>
  )
}