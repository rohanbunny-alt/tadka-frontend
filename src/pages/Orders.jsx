import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApi, post } from '../api.js'
import { useCart } from '../cart.jsx'
import { Pic } from '../ui.jsx'
export default function Orders() {
  const [orders, reload] = useApi('/orders'), [tab, setTab] = useState('prev'), { add } = useCart()
  const prev = orders.filter(o => o.status !== 'Active'), active = orders.filter(o => o.status === 'Active')
  const list = tab === 'prev' ? prev : active, a = active[0]
  const rate = async (id, r) => { await post(`/orders/${id}/rate?rating=${r}`); reload() }
  return <div className="wrap"><small className="muted">Home / Your orders</small>
    <div className="row end"><h1 className="h1s">Your good-food history.</h1><b className="red small">Welcome back, Ananya</b></div><p className="muted">Old favourites, happy memories and another helping whenever you like.</p>
    {a && <div className="band green slimband"><span className="ico">🛵</span><div className="grow"><b>Your lunch is on its way!</b><small className="muted block">#{a.id} · Paneer thali + Gulab jamun · Arriving by 1:18 pm</small></div><b className="big">12 min</b><Link className="btn" to={'/track/' + a.id}>Track your order →</Link></div>}
    <div className="ord"><div><div className="row"><div><button className={'chip ' + (tab === 'prev' ? 'on' : '')} onClick={() => setTab('prev')}>Previous orders · {prev.length}</button><button className={'chip ' + (tab === 'act' ? 'on' : '')} onClick={() => setTab('act')}>Active · {active.length}</button></div><small className="muted">Last 30 days ⌄</small></div>
      {list.map((o, i) => <div className="card pad oc" key={o.id}><div className="row"><small className="muted">#{o.id} &nbsp; {o.date}</small><span className={'badge ' + o.status}>{o.status}</span></div>
        <div className="row"><Pic k={'ord-' + o.id} emoji={o.emoji} i={i} className="thumb"/><div className="grow"><h4>{o.title}</h4><small className="muted block">{o.items}</small><small className="muted block">{o.place}</small></div><div className="right"><b className="price big">₹{o.total}</b><small className="muted block">including all fees</small></div></div><hr/>
        <div className="row small"><span className="muted">{o.status === 'Cancelled' ? `₹${o.total} refunded to your original payment method` : o.rating ? `You rated this meal ★ ${o.rating}.0` : <>How was your meal? {[1, 2, 3, 4, 5].map(n => <button key={n} className="star" onClick={() => rate(o.id, n)}>☆</button>)}</>}</span>
          <span><a className="muted" href="#invoice">{o.status === 'Cancelled' ? 'View details' : 'View invoice'}</a> &nbsp; <button className="btn sm" onClick={() => o.lines.length ? o.lines.forEach(l => add(l.name.replace(/^\d+ × /, ''), l.price)) : add(o.title, o.total)}>Order again ⟳</button></span></div></div>)}
      <p className="center-t muted small">You're all caught up. Time for your next favourite?</p></div>
      <aside><div className="card pad peach"><small className="red">YOUR MOST-LOVED MEAL</small><Pic k="dish-1" emoji="🍛" className="photo"/><h4>Homestyle paneer thali</h4><small className="muted block">Ordered 6 times. Always a good idea.</small><button className="btn full" onClick={() => add('Homestyle paneer thali', 249)}>One more? · ₹249 +</button></div>
        <div className="card pad"><span className="ico">🏠</span><h4>Your usual spot</h4><small className="muted block">Home · Ananya Sharma<br/>24, 12th Main Road, 2nd Stage<br/>Indiranagar, Bengaluru 560038</small><a className="red small" href="#addr">Manage addresses →</a></div>
        <div className="card pad green"><span className="ico">💬</span><h4>Need a little help?</h4><small className="muted block">Missing something or have an order question? We're here for you.</small><a className="red small" href="#help">Chat with our team →</a></div></aside></div></div>
}
