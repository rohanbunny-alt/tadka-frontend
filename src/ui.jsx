import { useState } from 'react'
const tones = ['#f3dfc2,#e8c28f', '#f2e2cf,#d9a86c', '#efe4cf,#c9d3b6', '#f5dccb,#e4a98a']
// Shows /images/<key>.jpg if you add one, otherwise a warm placeholder with an emoji.
export function Pic({ k, emoji, i = 0, className = '' }) {
  const [bad, setBad] = useState(false)
  return <div className={'pic ' + className} style={{ background: `linear-gradient(135deg,${tones[i % 4]})` }}>
    <span>{emoji}</span>{!bad && <img src={`/images/${k}.jpg`} alt="" onError={() => setBad(true)}/>}</div>
}
export const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>
export const Dot = ({ veg }) => <i className={'dot ' + (veg ? 'v' : 'n')}/>
export const Stars = ({ n = 5 }) => <span className="stars">{'★'.repeat(n)}</span>
