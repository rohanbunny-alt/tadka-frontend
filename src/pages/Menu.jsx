import { useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useApi } from '../api.js'
import { DishCard } from './Home.jsx'
export default function Menu() {
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('c') || ''
  const [veg, setVeg] = useState(false), [q, setQ] = useState(''), [sort, setSort] = useState('Recommended')
  const [cats] = useApi('/categories'), [all] = useApi('/dishes')
  const [dishes] = useApi(`/dishes?category=${encodeURIComponent(cat)}&veg=${veg}&q=${encodeURIComponent(q)}`)
  const list = [...dishes].sort((a, b) => sort === 'Price: low to high' ? a.price - b.price : sort === 'Price: high to low' ? b.price - a.price : 0)
  const count = n => all.filter(d => d.category === n).length
  return <>
    <section className="hero slim"><div className="wrap"><small className="muted">Home / Our menu</small><div className="two center"><div><h1 className="h1s">What's your kind of comfort?</h1>
      <p className="lead">Meals, tiffins, little bites and sweet endings. All made fresh for you.</p><p className="small"><span className="g">● Kitchen open</span> &nbsp; 25–35 min delivery &nbsp; Freshly cooked · FSSAI certified</p></div>
      <input className="search" placeholder='🔍 Search "thali", "biryani", "chai"' value={q} onChange={e => setQ(e.target.value)}/></div></div></section>
    <div className="wrap menu"><aside><small className="muted">ON THE MENU</small>
      <button className={!cat ? 'on' : ''} onClick={() => setSp({})}>▦ All dishes <span>{all.length}</span></button>
      {cats.map(c => <button key={c.name} className={cat === c.name ? 'on' : ''} onClick={() => setSp({ c: c.name })}>{c.emoji} {c.name} <span>{count(c.name)}</span></button>)}
      <div className="side-card"><span className="ico">📅</span><h4>Make good lunch a daily thing.</h4><p className="muted small">5 fresh tiffins for ₹849. Save ₹46 on your week.</p><button className="btn-w sm" onClick={() => setSp({ c: 'Everyday tiffins' })}>Explore tiffins</button></div></aside>
      <div><div className="row end"><div><h3>{cat || 'All dishes'}</h3><small className="muted">{list.length} ways to make your day</small></div>
        <div className="row"><label className="chk"><input type="checkbox" checked={veg} onChange={e => setVeg(e.target.checked)}/> Veg only</label>
          <select value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>Price: low to high</option><option>Price: high to low</option></select></div></div>
        {list.length ? <div className="grid3">{list.map((d, i) => <DishCard key={d.id} d={d} i={i}/>)}</div> : <p className="muted">Nothing matches yet. Try a different search or <Link to="/menu">see everything</Link>.</p>}</div></div>
  </>
}
