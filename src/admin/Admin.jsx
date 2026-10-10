import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'

const tok = () => localStorage.getItem('tadka_admin')
async function call(path, method = 'GET', body) {
  const r = await fetch('/api/admin' + path, { method, headers: { 'Content-Type': 'application/json', 'X-Admin-Token': tok() || '' }, body: body ? JSON.stringify(body) : undefined })
  if (r.status === 401) { localStorage.removeItem('tadka_admin'); window.location.href = '/admin'; throw new Error('unauthorized') }
  return r.text().then(t => t ? JSON.parse(t) : null)
}
function useAdmin(path) {
  const [d, setD] = useState(null)
  const load = useCallback(() => call(path).then(setD).catch(() => {}), [path])
  useEffect(() => { load() }, [load])
  return [d, load]
}
const CATS = ['Meals & thalis', 'Everyday tiffins', 'Biryani & bowls', 'South Indian', 'Snacks & chai', 'Desserts', 'Starters', 'Drinks']

function Login({ onDone }) {
  const [u, setU] = useState(''), [p, setP] = useState(''), [err, setErr] = useState('')
  const go = async e => {
    e.preventDefault()
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) })
    if (!r.ok) return setErr('Wrong username or password.')
    localStorage.setItem('tadka_admin', (await r.json()).token); onDone()
  }
  return <div className="alogin"><form className="card pad" onSubmit={go}><div className="logo">tadka.</div><h3>Kitchen admin</h3><p className="muted small">Sign in to manage orders, dishes and combos.</p>
    <input className="in" placeholder="Username" value={u} onChange={e => setU(e.target.value)}/><input className="in" type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)}/>
    {err && <p className="red small">{err}</p>}<button className="btn full">Sign in</button><p className="muted small">Demo login: admin / tadka123</p></form></div>
}

function Dashboard() {
  const [s] = useAdmin('/stats'), [orders] = useAdmin('/orders')
  if (!s || !orders) return <p className="muted">Loading…</p>
  const cards = [['Revenue', '₹' + s.revenue], ['Total orders', s.orders], ['Active now', s.active], ['Avg. rating', s.avgRating + ' ★'], ['Dishes on menu', s.dishes - s.hidden + ' / ' + s.dishes], ['Combos', s.combos]]
  const bars = [['Active', s.active, '#d49a1b'], ['Delivered', s.delivered, '#2f7a4f'], ['Cancelled', s.cancelled, '#c8502b']]
  return <><h2>Dashboard</h2><div className="stats4">{cards.map(([l, v]) => <div className="card pad" key={l}><small className="muted">{l}</small><h2>{v}</h2></div>)}</div>
    <div className="two2"><div className="card pad"><h4>Recent orders</h4><table className="tbl"><tbody>{orders.slice(0, 5).map(o => <tr key={o.id}><td>#{o.id}</td><td>{o.title}</td><td>₹{o.total}</td><td><span className={'badge ' + o.status}>{o.status}</span></td></tr>)}</tbody></table></div>
      <div className="card pad"><h4>Order status</h4>{bars.map(([l, n, c]) => <div key={l} className="bar"><span>{l}</span><div><i style={{ width: (s.orders ? n / s.orders * 100 : 0) + '%', background: c }}/></div><b>{n}</b></div>)}</div></div></>
}

function Orders() {
  const [orders, reload] = useAdmin('/orders'), [f, setF] = useState('All')
  if (!orders) return <p className="muted">Loading…</p>
  const list = orders.filter(o => f === 'All' || o.status === f)
  const set = async (id, st) => { await call(`/orders/${id}/status?status=${st}`, 'PUT'); reload() }
  return <><h2>Orders</h2><div className="chips2">{['All', 'Active', 'Delivered', 'Cancelled'].map(x => <button key={x} className={'chip ' + (f === x ? 'on' : '')} onClick={() => setF(x)}>{x}</button>)}</div>
    <div className="card pad"><table className="tbl"><thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Rating</th><th>Status</th></tr></thead><tbody>
      {list.map(o => <tr key={o.id}><td><b>#{o.id}</b></td><td>{o.date}</td><td>{o.items}</td><td>₹{o.total}</td><td>{o.rating ? '★ ' + o.rating : '—'}</td>
        <td><select value={o.status} onChange={e => set(o.id, e.target.value)}><option>Active</option><option>Delivered</option><option>Cancelled</option></select></td></tr>)}</tbody></table></div></>
}

function Crud({ title, path, fields, cols, blank, extra }) {
  const [rows, reload] = useAdmin(path), [form, setForm] = useState(null)
  if (!rows) return <p className="muted">Loading…</p>
  const save = async e => { e.preventDefault(); const b = { ...form, price: +form.price, mrp: +form.mrp || 0, rating: +form.rating || 0 }
    await call(form.id ? `${path}/${form.id}` : path, form.id ? 'PUT' : 'POST', b); setForm(null); reload() }
  const del = async r => { if (window.confirm(`Delete "${r.name}"?`)) { await call(`${path}/${r.id}`, 'DELETE'); reload() } }
  return <><div className="row"><h2>{title}</h2><button className="btn sm" onClick={() => setForm(blank)}>+ Add new</button></div>
    <div className="card pad"><table className="tbl"><thead><tr><th/>{cols.map(c => <th key={c[0]}>{c[1]}</th>)}{extra && <th>{extra.head}</th>}<th/></tr></thead><tbody>
      {rows.map(r => <tr key={r.id}><td className="em">{r.emoji}</td>{cols.map(c => <td key={c[0]}>{c[2] ? c[2](r[c[0]]) : r[c[0]]}</td>)}{extra && <td>{extra.cell(r, reload)}</td>}
        <td className="act"><button onClick={() => setForm(r)}>Edit</button><button className="red" onClick={() => del(r)}>Delete</button></td></tr>)}</tbody></table></div>
    {form && <div className="overlay" onClick={() => setForm(null)}><form className="modal" onClick={e => e.stopPropagation()} onSubmit={save}><h3>{form.id ? 'Edit' : 'Add'} {title.toLowerCase().replace(/s$/, '')}</h3>
      <div className="fgrid2">{fields.map(([k, l, t, o]) => t === 'check' ? <label key={k} className="chk"><input type="checkbox" checked={!!form[k]} onChange={e => setForm({ ...form, [k]: e.target.checked })}/> {l}</label> :
        <label key={k}><small className="muted">{l}</small>{t === 'select' ? <select value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}>{o.map(x => <option key={x}>{x}</option>)}</select> :
          <input className="in" type={t || 'text'} required value={form[k] ?? ''} step="any" onChange={e => setForm({ ...form, [k]: e.target.value })}/>}</label>)}</div>
      <div className="row"><button type="button" className="btn-w sm" onClick={() => setForm(null)}>Cancel</button><button className="btn sm">Save</button></div></form></div>}</>
}

const Dishes = () => <Crud title="Dishes" path="/dishes" blank={{ name: '', desc: '', price: '', veg: true, rating: 4.5, tag: 'New', category: CATS[0], time: '25–30 min', emoji: '🍛' }}
  cols={[['name', 'Name'], ['category', 'Category'], ['price', 'Price', v => '₹' + v], ['veg', 'Type', v => v ? 'Veg' : 'Non-veg'], ['rating', 'Rating', v => '★ ' + v]]}
  fields={[['name', 'Name'], ['category', 'Category', 'select', CATS], ['desc', 'Description'], ['tag', 'Tag'], ['price', 'Price (₹)', 'number'], ['rating', 'Rating', 'number'], ['time', 'Delivery time'], ['emoji', 'Emoji'], ['veg', 'Vegetarian', 'check']]}
  extra={{ head: 'On menu', cell: (r, reload) => <label className="sw"><input type="checkbox" checked={!r.hidden} onChange={async e => { await call(`/dishes/${r.id}/visibility?hidden=${!e.target.checked}`, 'PUT'); reload() }}/> {r.hidden ? 'Hidden' : 'Visible'}</label> }}/>
const Combos = () => <Crud title="Combos" path="/combos" blank={{ name: '', desc: '', price: '', mrp: '', group: 'For two', kicker: 'Better together', serves: 'Serves 2', veg: true, time: '25–35 min', emoji: '🍱' }}
  cols={[['name', 'Name'], ['group', 'Group'], ['price', 'Price', v => '₹' + v], ['mrp', 'MRP', v => '₹' + v], ['save', 'Saves', v => '₹' + v]]}
  fields={[['name', 'Name'], ['group', 'Group', 'select', ['For one', 'For two', 'Family feasts']], ['desc', 'Contents'], ['kicker', 'Kicker line'], ['price', 'Combo price (₹)', 'number'], ['mrp', 'Item total (₹)', 'number'], ['serves', 'Serves'], ['time', 'Delivery time'], ['emoji', 'Emoji'], ['veg', 'Vegetarian', 'check']]}/>

export default function Admin() {
  const [authed, setAuthed] = useState(!!tok())
  if (!authed) return <Login onDone={() => setAuthed(true)}/>
  const out = () => { localStorage.removeItem('tadka_admin'); setAuthed(false) }
  return <div className="adm"><aside><div className="logo">tadka.<small> admin</small></div>
    {[['/admin', '📊 Dashboard', true], ['/admin/orders', '🧾 Orders'], ['/admin/dishes', '🍛 Dishes'], ['/admin/combos', '🍱 Combos']].map(([to, l, end]) => <NavLink key={to} to={to} end={end}>{l}</NavLink>)}
    <div className="grow"/><Link to="/">↗ View site</Link><button onClick={out}>Sign out</button></aside>
    <section><Routes><Route path="/admin" element={<Dashboard/>}/><Route path="/admin/orders" element={<Orders/>}/><Route path="/admin/dishes" element={<Dishes/>}/><Route path="/admin/combos" element={<Combos/>}/></Routes></section></div>
}
