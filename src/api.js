import { useEffect, useState } from 'react'
export const get = (u) => fetch('/api' + u).then(r => r.json())
export const post = (u, b) => fetch('/api' + u, { method:'POST', headers:{'Content-Type':'application/json'}, body: b ? JSON.stringify(b) : undefined }).then(r => r.json())
export function useApi(url, init = []) {
  const [d, setD] = useState(init)
  const load = () => get(url).then(setD).catch(() => {})
  useEffect(() => { load() }, [url])
  return [d, load]
}
