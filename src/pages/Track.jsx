import { useParams } from 'react-router-dom'
import { useApi } from '../api.js'
import { Eyebrow } from '../ui.jsx'
export default function Track() {
  const { id } = useParams()
  const [t] = useApi(`/orders/${id}/track`, null)
  if (!t || !t.steps) return <div className="wrap sec"><p className="muted">Loading your order…</p></div>
  const cur = t.steps.findIndex(s => !s.done)
  return <div className="wrap"><small className="muted">Home / Orders / Track</small>
    <div className="row end"><h1 className="h1s">A little comfort is on its way.</h1><span className="pill g2">● ON THE WAY</span></div><p className="muted">Your meal is packed, warm and heading home. We'll keep you posted.</p>
    <div className="card trk"><div className="map">
      <svg viewBox="0 0 560 330" preserveAspectRatio="xMidYMid slice">
        <rect width="560" height="330" fill="#eef0e6"/><rect x="190" y="150" width="130" height="90" rx="10" fill="#dfe9cc"/>
        {[60, 150, 240, 330, 420, 510].map(x => <rect key={x} x={x} y="0" width="16" height="330" fill="#fff"/>)}{[40, 120, 200, 280].map(y => <rect key={y} y={y} x="0" width="560" height="16" fill="#fff"/>)}
        <text x="230" y="30" fill="#9a9a8f" fontSize="14" fontWeight="700">INDIRANAGAR</text><text x="40" y="140" fill="#9a9a8f" fontSize="12" fontWeight="700">DOMLUR</text>
        <polyline points="90,265 90,208 240,208 240,128 390,128 390,70" fill="none" stroke="#c8502b" strokeWidth="5"/>
        <circle cx="90" cy="265" r="16" fill="#2f7a4f"/><text x="82" y="271" fontSize="15">🍳</text>
        <circle cx="240" cy="208" r="17" fill="#c8502b"/><text x="231" y="214" fontSize="15">🛵</text>
        <circle cx="390" cy="70" r="16" fill="#c8502b"/><text x="382" y="76" fontSize="15">🏠</text></svg>
      <span className="live">● Live delivery · Updated just now</span><span className="pin p1">Tadka kitchen</span><span className="pin p2"><b>Ravi is on the way</b><br/>1.5 km from your door</span><span className="pin p3">Your home</span>
      <div className="driver"><span className="avatar">RK</span><div className="grow"><b>{t.driver}</b><small className="muted block">{t.driverMeta}</small></div><button className="btn-w sm">Call Ravi 📞</button><button className="icon">💬</button></div></div>
      <div className="steps-v"><Eyebrow>ALMOST AT YOUR TABLE</Eyebrow><h2>{t.minutesAway} <small>minutes away</small></h2><small className="muted">Estimated arrival · {t.eta}</small>
        {t.steps.map((s, i) => <div key={s.label} className={'st ' + (s.done ? 'done' : i === cur ? 'now' : '')}><i>{s.done ? '✓' : i === cur ? '🛵' : '○'}</i><div><b>{s.label}</b><small className="muted block">{s.time}</small></div></div>)}
        <div className="safe">🛡 Contactless delivery selected. Ravi will call when he arrives.</div></div></div>
    <div className="trk3"><div className="card pad"><h4>🏠 A familiar doorstep</h4><small className="muted block">{t.address}</small><small className="muted block">{t.note}</small></div>
      <div className="card pad"><h4>Inside your bag</h4>{t.lines.map(l => <div className="row small" key={l.name}><span>{l.name}</span><span>₹{l.price}</span></div>)}<div className="row small"><span>Delivery · GST & packing</span><span>₹{t.delivery}</span></div><hr/><div className="row"><b>Total paid</b><b>₹{t.total}</b></div><small className="g">✓ {t.payment}</small></div>
      <div className="card pad peach"><h4>💬 We're here for you.</h4><small className="muted block">Have a question about your delivery? Our kitchen team is happy to help.</small><button className="btn-w sm">Get order support</button></div></div></div>
}
