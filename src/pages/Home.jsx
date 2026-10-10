import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApi } from '../api.js'
import { useCart } from '../cart.jsx'
import { Pic, Eyebrow, Dot, Stars } from '../ui.jsx'

export function DishCard({ d, i }) {
  const { add } = useCart()
  return <article className="card dish"><div className="ph"><Pic k={'dish-' + d.id} emoji={d.emoji} i={i}/><span className="tag">{d.tag}</span><button className="heart" aria-label="Save">♡</button></div>
    <div className="body"><div className="row small"><span><Dot veg={d.veg}/>{d.veg ? 'VEGETARIAN' : 'NON-VEG'}</span><b>★ {d.rating}</b></div>
      <h4>{d.name}</h4><p className="muted">{d.desc}</p>
      <div className="row"><div><b className="price">₹{d.price}</b><small className="muted block">{d.time}</small></div><button className="btn-o" onClick={() => add(d.name, d.price)}>ADD +</button></div></div></article>
}
export const ComboCard = ({ c, i }) => { const { add } = useCart()
  return <article className="card combo"><div className="ph"><Pic k={'combo-' + c.id} emoji={c.emoji} i={i}/><span className="tag red">SAVE ₹{c.save}</span></div>
    <div className="body"><Eyebrow>{c.group === 'For one' ? 'COMFORT FOR ONE' : c.group === 'Family feasts' ? 'MAKE IT A FEAST' : 'START YOUR DAY RIGHT'.replace('START YOUR DAY RIGHT', c.kicker.toUpperCase())}</Eyebrow>
      <h4>{c.name}</h4><p className="muted">{c.desc}</p>
      <div className="row small"><span>{c.serves} · <Dot veg={c.veg}/>{c.veg ? 'Vegetarian' : 'Non-veg'}</span><span className="muted">{c.time}</span></div>
      <div className="row"><div><b className="price">₹{c.price}</b> <s className="muted">₹{c.mrp}</s></div><button className="btn sm" onClick={() => add(c.name, c.price)}>Add combo +</button></div></div></article> }

export default function Home() {
  const [cats] = useApi('/categories'), [dishes] = useApi('/dishes'), [combos] = useApi('/combos')
  const [reviews] = useApi('/reviews'), [faqs] = useApi('/faqs')
  const [open, setOpen] = useState(0)
  return <>
    <section className="hero"><div className="wrap two">
      <div><Eyebrow>● FRESH FROM OUR KITCHEN, STRAIGHT TO YOU</Eyebrow>
        <h1>Big on flavour.<br/>Feels like home.</h1>
        <p className="lead">From comforting thalis to a little something sweet. Freshly made Indian favourites, delivered with a whole lot of love.</p>
        <div className="btns"><Link to="/menu" className="btn">Find your favourite →</Link><Link to="/menu" className="btn-w">Explore our menu</Link></div>
        <div className="proof"><span className="avs"><i>AS</i><i>RM</i><i>PN</i></span><div><Stars/><br/><small className="muted">4.9/5 · Loved by 10,000+ happy eaters</small></div></div></div>
      <div className="heroimg"><Pic k="hero" emoji="🍛" className="tall"/><span className="stamp">FRESHLY MADE EVERY DAY</span>
        <div className="eta">🛵 <div><b>At your door in 30 min</b><small className="muted block">Warm, fast, beautiful</small></div></div></div>
    </div></section>
    <div className="perks wrap">{['🍳 Real cooks. Real recipes.', '🌿 Fresh, never frozen', '📦 Packed with care', '🛵 Neighbourhood-fast delivery'].map(p => <span key={p}>{p}</span>)}</div>

    <section className="wrap sec"><div className="row end"><div><Eyebrow>WHAT ARE YOU CRAVING?</Eyebrow><h2>A little something for every mood.</h2></div><Link to="/menu" className="btn-w sm">All categories →</Link></div>
      <div className="cats">{cats.slice(0, 6).map((c, i) => <Link to={'/menu?c=' + encodeURIComponent(c.name)} key={c.name} className="cat"><Pic k={'cat-' + i} emoji={c.emoji} i={i} className="round"/><b>{c.name}</b><small className="muted">{c.tagline}</small></Link>)}</div></section>

    <section className="wrap sec"><div className="row end"><div><Eyebrow>THE NEIGHBOURHOOD FAVOURITES</Eyebrow><h2>Good food. Great company.</h2><p className="muted">The dishes our regulars come back for. One bite and you'll know why.</p></div><Link to="/menu" className="btn-w sm">View full menu →</Link></div>
      <div className="grid4">{dishes.slice(0, 4).map((d, i) => <DishCard key={d.id} d={d} i={i}/>)}</div></section>

    <section className="wrap"><div className="band green"><Pic k="tiffin" emoji="🍱" className="band-img"/><div>
      <Eyebrow>YOUR DAILY DOSE OF HOME</Eyebrow><h2>Your lunch break, made a little better.</h2>
      <p className="muted">Fresh sabzi. Soft rotis. A different menu every day. Our everyday tiffins bring the comfort of home to your busy afternoons.</p>
      <p className="small"><b>From ₹179 / meal</b> &nbsp; Pause anytime</p><Link to="/menu?c=Everyday tiffins" className="btn">Meet your everyday tiffin →</Link></div></div></section>

    <section className="wrap sec"><div className="row end"><div><Eyebrow>BETTER TOGETHER</Eyebrow><h2>More flavour. A little less spend.</h2></div><Link to="/combos" className="btn-w sm">Explore combos →</Link></div>
      <div className="grid3">{combos.slice(0, 3).map((c, i) => <ComboCard key={c.id} c={c} i={i}/>)}</div></section>

    <section className="wrap sec two center"><div><Eyebrow>A KITCHEN WITH A HEART</Eyebrow><h2>Not just food.<br/>A feeling of belonging.</h2>
      <p className="muted">Tadka began with a simple thought: everyone deserves a meal that feels like someone made it just for them. So we built a kitchen around family recipes, fresh ingredients and people who genuinely love to cook.</p><Link to="/about" className="btn-w sm">A little about us →</Link></div><Pic k="kitchen" emoji="👩‍🍳" className="photo"/></section>

    <section className="band-full"><div className="wrap"><Eyebrow>FROM CRAVING TO COMFORT</Eyebrow><h2>Your next good meal is three steps away.</h2>
      <div className="grid3 steps">{[['🍴', 'Find your kind of comfort', 'Pick a thali, build a feast or settle into your daily tiffin.'], ['👨‍🍳', 'We cook it fresh', 'Your meal is made to order, then packed to keep the goodness in.'], ['🛵', 'Make yourself at home', 'Track your delivery, put your feet up and get ready to dig in.']].map(([e, t, d], i) =>
        <div key={t}><div className="row"><span className="ico">{e}</span><span className="num">0{i + 1}</span></div><h4>{t}</h4><p className="muted">{d}</p></div>)}</div></div></section>

    <section className="wrap sec"><div className="row end"><div><Eyebrow>A SEAT AT OUR TABLE</Eyebrow><h2>Happy plates. Happier people.</h2></div><span className="btn-w sm">4.9 out of 5 ★ →</span></div>
      <div className="grid3">{reviews.map(r => <div className="card pad" key={r.name}><Stars/><p>"{r.text}"</p><div className="who"><i>{r.initials}</i><div><b>{r.name}</b><small className="muted block">{r.meta}</small></div></div></div>)}</div></section>

    <section className="wrap sec two" id="help"><div><Eyebrow>A LITTLE HELP ON THE SIDE</Eyebrow><h2>Good questions.<br/>Simple answers.</h2><p className="muted">Need a hand with something else? Our team is just a message away.</p><button className="btn-w sm">Talk to our team 💬</button></div>
      <div className="faq">{faqs.map((f, i) => <div key={f.q} className="fq"><button onClick={() => setOpen(open === i ? -1 : i)}><b>{f.q}</b><span>{open === i ? '−' : '+'}</span></button>{open === i && <p className="muted">{f.a}</p>}</div>)}</div></section>

    <section className="wrap"><div className="cta"><div><small>YOUR FIRST TADKA MOMENT</small><h2>Come hungry. Leave happy.</h2><p>Get 20% off your first order. Use WELCOME20 at checkout.</p>
      <Link to="/menu" className="btn-w">Let's order something good →</Link><small className="block">Up to ₹100 off · Minimum order ₹249 · New customers only</small></div><Pic k="cta" emoji="🍮" className="cta-img"/></div></section>
  </>
}
