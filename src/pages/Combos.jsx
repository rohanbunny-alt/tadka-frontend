import { useState } from 'react'
import { useApi } from '../api.js'
import { useCart } from '../cart.jsx'
import { ComboCard } from './Home.jsx'
import { Pic, Eyebrow } from '../ui.jsx'
export default function Combos() {
  const [g, setG] = useState(''), { add } = useCart()
  const [combos] = useApi('/combos?group=' + encodeURIComponent(g)), [allc] = useApi('/combos')
  const f = allc[0]
  return <div className="wrap"><small className="muted">Home / Meal combos</small><h1 className="h1s">Good things come together.</h1>
    <p className="lead">Thoughtful pairings, generous portions and happier prices. There's a combo for every kind of company.</p>
    {f && <div className="band peach"><Pic k="combo-1" emoji="🍛" className="band-img"/><div><Eyebrow>THE NEIGHBOURHOOD'S FAVOURITE PAIR</Eyebrow><h2>Lunch is better<br/>with a plus-one.</h2>
      <p className="muted">Two comforting paneer thalis, four gulab jamun and one very good lunch break. Meet The lunch duo.</p>
      <p><b className="price big">₹{f.price}</b> <s className="muted">₹{f.mrp}</s> <span className="pill">SAVE ₹{f.save}</span></p><button className="btn" onClick={() => add(f.name, f.price)}>Add The lunch duo +</button></div></div>}
    <div className="row chips"><div>{['', 'For one', 'For two', 'Family feasts'].map(x => <button key={x} className={'chip ' + (g === x ? 'on' : '')} onClick={() => setG(x)}>{x || 'All combos'}</button>)}</div><small className="muted">{combos.length} delicious pairings</small></div>
    <div className="grid3">{combos.map((c, i) => <ComboCard key={c.id} c={c} i={i}/>)}</div>
    <div className="info">{[['🍴', 'Made to share', 'Portions you can count on. No second-guessing.'], ['₹', 'Better value, always', 'Savings are compared with individual menu prices.'], ['📦', 'The same fresh goodness', 'Every combo is cooked to order in our kitchen.']].map(([e, t, d]) => <div key={t}><span className="ico">{e}</span><div><b>{t}</b><small className="muted block">{d}</small></div></div>)}</div></div>
}
