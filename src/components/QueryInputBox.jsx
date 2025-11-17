import Textarea from './ui/textarea.jsx'
import Button from './ui/button.jsx'

export default function QueryInputBox({ value, onChange, onSubmit, loading }) {
  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter your query"
      />
      <Button onClick={onSubmit} disabled={loading}>{loading ? 'Running...' : 'Run Query'}</Button>
    </div>
  )
}