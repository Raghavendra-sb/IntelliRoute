import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { useState } from 'react'

export default function HistoryCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className="cursor-pointer" onClick={() => setOpen(o => !o)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{item.user_query}</span>
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs">{item.is_coding_question ? 'Coding' : 'Non-Coding'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs opacity-70">{new Date(item.timestamp).toLocaleString()}</div>
        {open && (
          <div className="mt-3 text-sm">
            <div className="opacity-70">Accuracy: {item.is_coding_question ? item.accuracy_percentage : 'N/A'}</div>
            <div className="mt-2 whitespace-pre-wrap">{item.llm_result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}