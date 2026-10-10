import { createContext, useContext, useState } from 'react'
const Ctx = createContext()
export const useCart = () => useContext(Ctx)
export function CartProvider({ children }) {
  const [lines, setLines] = useState([{ name:'Homestyle paneer thali', qty:1, price:249 }, { name:'Gulab jamun', qty:1, price:89 }])
  const [open, setOpen] = useState(false)
  const add = (name, price) => { setLines(l => l.find(x => x.name === name) ? l.map(x => x.name === name ? { ...x, qty:x.qty+1 } : x) : [...l, { name, qty:1, price }]); setOpen(true) }
  const dec = (name) => setLines(l => l.flatMap(x => x.name === name ? (x.qty > 1 ? [{ ...x, qty:x.qty-1 }] : []) : [x]))
  const clear = () => setLines([])
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0)
  return <Ctx.Provider value={{ lines, add, dec, clear, count, subtotal, open, setOpen }}>{children}</Ctx.Provider>
}
