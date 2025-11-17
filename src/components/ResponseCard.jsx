import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import Button from './ui/button.jsx'
import { Check, Clipboard, Code2, Gauge, Triangle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { motion, AnimatePresence } from 'framer-motion'

function useTyping(text) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    if (!text) {
      setDisplay('')
      return
    }
    if (text.length > 800) {
      setDisplay(text)
      return
    }
    setDisplay('')
    let i = 0
    const step = Math.max(1, Math.floor(800 / Math.max(1, text.length)))
    const id = setInterval(() => {
      i += step
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 6)
    return () => clearInterval(id)
  }, [text])
  return display
}

export default function ResponseCard({ data, loading }) {
  const steps = useMemo(() => {
    if (loading) return ['Classifying', 'Routing', 'Generating']
    if (!data) return []
    return ['Classification', 'Processing', 'Result']
  }, [loading, data])

  const containerRef = useRef(null)
  const typed = useTyping(data?.llm_result || '')

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [typed])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Triangle className="h-4 w-4" />Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {steps.map((s, idx) => (
              <motion.div key={s} initial={{ opacity: 0.4, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="glass p-2 text-center">
                <span className="text-xs opacity-80">{s}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code2 className="h-4 w-4" />Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data && (
              <div className="grid grid-cols-2 gap-3">
                <div className="glass p-3">
                  <div className="text-xs opacity-70">Classification</div>
                  <div className="text-sm">{data.is_coding_question ? 'Coding' : 'Non-Coding'}</div>
                </div>
                {data.is_coding_question && (
                  <div className="glass p-3">
                    <div className="flex items-center gap-2 text-xs opacity-70"><Gauge className="h-4 w-4" />Accuracy</div>
                    <div className="text-sm">{data.accuracy_percentage}</div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm opacity-70">LLM Response</div>
              {data?.llm_result && (
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(data.llm_result)} className="gap-2"><Clipboard className="h-4 w-4" />Copy</Button>
              )}
            </div>

            <div ref={containerRef} className="max-h-[420px] overflow-y-auto scrollbar-thin">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 text-sm opacity-70">
                    Generating...
                  </motion.div>
                )}
                {!loading && data?.llm_result && (
                  <motion.div key="response" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline ? (
                            <SyntaxHighlighter style={oneDark} language={match?.[1] || 'python'} PreTag="div" {...props}>
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>{children}</code>
                          )
                        }
                      }}
                    >
                      {typed}
                    </ReactMarkdown>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}