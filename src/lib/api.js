const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function runQuery(user_query) {
  const res = await fetch(`${base}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_query })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Request failed')
  }
  return res.json()
}