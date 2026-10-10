import { Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from './cart.jsx'
import { post } from './api.js'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Orders from './pages/Orders.jsx'
import Combos from './pages/Combos.jsx'
import Track from './pages/Track.jsx'
import Admin from './admin/Admin.jsx'

const Logo = () => <Link to="/" className="logo">tadka.</Link>

function Header() {
  const { count, setOpen } = useCart()
  return <header className="hdr"><div className="wrap hdr-in">
    <div><Logo/><div className="deliv"><small>DELIVERING TO</small><b>📍 Indiranagar, Bengaluru ⌄</b></div></div>
    <nav>{[['/', 'Home'], ['/about', 'About'], ['/menu', 'Menu'], ['/orders', 'Orders'], ['/combos', 'Combos']].map(([to, l]) =>
      <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'on' : ''}>{l}</NavLink>)}</nav>
    <div className="hdr-r"><button className="icon" aria-label="Search">🔍</button>
      <button className="cartbtn" onClick={() => setOpen(true)}>🛍 Cart · {count}</button><span className="avatar">AS</span></div>
  </div></header>
}

function CartDrawer() {
  const { lines, add, dec, clear, subtotal, open, setOpen } = useCart()
  const [promo, setPromo] = useState('')
  const nav = useNavigate()
  const off = promo.toUpperCase() === 'WELCOME20' && subtotal >= 249 ? Math.min(100, Math.floor(subtotal / 5)) : 0
  if (!open) return null
  const place = async () => { const o = await post('/orders', { lines, promo }); clear(); setOpen(false); nav('/track/' + o.id) }
  return <div className="overlay" onClick={() => setOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}>
    <div className="row"><h3>Your cart</h3><button className="icon" onClick={() => setOpen(false)}>✕</button></div>
    {lines.length === 0 && <p className="muted">Your cart is empty. Time to pick a favourite.</p>}
    {lines.map(l => <div className="row cl" key={l.name}><span>{l.name}</span>
      <span className="qty"><button onClick={() => dec(l.name)}>−</button>{l.qty}<button onClick={() => add(l.name, l.price)}>+</button></span><b>₹{l.qty * l.price}</b></div>)}
    <input className="in" placeholder="Promo code (try WELCOME20)" value={promo} onChange={e => setPromo(e.target.value)}/>
    <div className="row"><span>Subtotal</span><b>₹{subtotal}</b></div>
    {off > 0 && <div className="row g"><span>WELCOME20</span><b>−₹{off}</b></div>}
    <div className="row"><span>Delivery</span><b>₹30</b></div>
    <div className="row big"><span>Total</span><b>₹{subtotal - off + (subtotal ? 30 : 0)}</b></div>
    <button className="btn" disabled={!lines.length} onClick={place}>Place order</button>
  </aside></div>
}

function Footer() {
  return <footer className="ftr"><div className="wrap">
    <div className="fgrid">
      <div><Logo/><p>A little spice. A lot of home. Fresh Indian food from our neighbourhood kitchen to your door.</p><div className="soc">◎ f ▶</div></div>
      <div><h5>Explore</h5><Link to="/about">Our story</Link><Link to="/menu">Browse menu</Link><Link to="/menu?c=Everyday tiffins">Everyday tiffins</Link><Link to="/combos">Meal combos</Link></div>
      <div><h5>Your Tadka</h5><Link to="/orders">Previous orders</Link><Link to="/track/TDK-1086">Track delivery</Link><Link to="/orders">Saved addresses</Link><a href="#help">Help & support</a></div>
      <div><h5>Say hello</h5><span>hello@tadka.in</span><span>+91 80 4567 8900</span><span>Every day, 8 am – 11 pm</span><span>Made with love in Bengaluru</span></div>
    </div>
    <div className="fbot"><span>© 2026 Tadka Kitchens. All rights reserved.</span><span>Privacy policy · Terms of service · Food safety & hygiene</span><span>Good food. Good company.</span></div>
  </div></footer>
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  if (pathname.startsWith('/admin')) return <Admin/>
  return <><Header/><CartDrawer/><main><Routes>
    <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/menu" element={<Menu/>}/>
    <Route path="/orders" element={<Orders/>}/><Route path="/combos" element={<Combos/>}/><Route path="/track/:id" element={<Track/>}/>
  </Routes></main><Footer/></>
}
