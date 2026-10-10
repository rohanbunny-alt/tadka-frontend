import { Link } from 'react-router-dom'
import { useApi } from '../api.js'
import { Pic, Eyebrow } from '../ui.jsx'
export default function About() {
  const [team] = useApi('/team')
  return <>
    <section className="hero"><div className="wrap two center"><div><Eyebrow>GOOD FOOD HAS A WAY OF BRINGING US TOGETHER</Eyebrow><h1>A little spice.<br/>A lot of heart.</h1>
      <p className="lead">We're a neighbourhood kitchen with one simple purpose: to make your everyday meals feel a little more like home.</p><p className="small">📍 Born in Bengaluru. Cooking with love since 2022.</p></div><Pic k="about-hero" emoji="👩‍🍳" className="tall"/></div></section>
    <div className="wrap stats">{[['10,000+', 'happy eaters'], ['4.9 / 5', 'neighbourhood rating'], ['25+', 'family-inspired recipes'], ['4', 'Bengaluru neighbourhoods']].map(([n, l]) => <div key={l}><b>{n}</b><small className="muted block">{l}</small></div>)}</div>
    <section className="wrap sec two center"><Pic k="about-story" emoji="🫓" className="photo"/><div><Eyebrow>IT STARTED WITH A LUNCHBOX</Eyebrow><h2>The best meals aren't fancy. They're made with care.</h2>
      <p className="muted">When our founder Meera moved to Bengaluru, she missed one thing most: a warm, everyday lunch that tasted like home. A few recipes from her mother, a tiny kitchen and a handful of neighbours became the very first Tadka tiffins.</p>
      <p className="muted">Today, our kitchen is bigger, but the idea hasn't changed. Real ingredients. Recipes worth repeating. Meals made the way you'd make them for someone you love.</p></div></section>
    <section className="band-full green"><div className="wrap"><Eyebrow>THE THINGS WE WON'T COMPROMISE ON</Eyebrow><h2>Goodness is always on the menu.</h2>
      <div className="grid3">{[['🌱', 'Fresh comes first', 'Seasonal vegetables, freshly ground spices and ingredients we\'re proud to put on your plate.'], ['👨‍🍳', 'Cooked, not assembled', 'Dals are slow-simmered. Rotis are rolled by hand. Nothing takes the place of a real cook.'], ['💚', 'A little extra care', 'Thoughtful portions, honest prices and packaging that keeps every meal warm and welcoming.']].map(([e, t, d]) => <div className="card pad" key={t}><span className="ico">{e}</span><h4>{t}</h4><p className="muted">{d}</p></div>)}</div></div></section>
    <section className="wrap sec"><Eyebrow>THE PEOPLE BEHIND YOUR PLATE</Eyebrow><h2>Big hearts. Very good hands.</h2><p className="muted">A small team with a shared love for food that makes someone's day.</p>
      <div className="grid3">{team.map((m, i) => <div key={m.name}><Pic k={'team-' + i} emoji={m.emoji} i={i} className="photo sq"/><h4>{m.name}</h4><small className="muted">{m.role}</small></div>)}</div></section>
    <section className="wrap"><div className="seat"><div><h3>There's always a seat for you.</h3><small className="muted">Indiranagar · Domlur · Koramangala · Ulsoor</small></div><Link to="/menu" className="btn">Taste a little Tadka →</Link></div></section>
  </>
}
