import { Link } from 'react-router-dom'
import Button from '../components/ui/button.jsx'

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center">
      <div className="glass gradient-border mx-auto max-w-3xl px-8 py-12">
        <h1 className="bg-gradient-to-r from-brand to-fuchsia-500 bg-clip-text text-4xl font-bold text-transparent">IntelliRoute – Intelligent LLM Routing System</h1>
        <p className="mt-3 opacity-80">Smart routing using LangGraph + Gemini API</p>
        <div className="mt-6">
          <Link to="/query"><Button size="lg">Start Query</Button></Link>
        </div>
      </div>
    </main>
  )
}