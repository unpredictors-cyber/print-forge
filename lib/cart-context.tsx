'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { CartItem } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'key'>) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clear: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('printforge-cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      window.localStorage.removeItem('printforge-cart')
    } finally {
      hydrated.current = true
    }

    const syncCart = (event: StorageEvent) => {
      if (event.key !== 'printforge-cart') return
      try {
        setItems(event.newValue ? JSON.parse(event.newValue) : [])
      } catch {
        setItems([])
      }
    }
    window.addEventListener('storage', syncCart)
    return () => window.removeEventListener('storage', syncCart)
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    window.localStorage.setItem('printforge-cart', JSON.stringify(items))
  }, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((item: Omit<CartItem, 'key'>) => {
    const key = `${item.product_id}-${item.color.name}-${item.material.id}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(i.quantity + item.quantity, 10) } : i,
        )
      }
      return [...prev, { ...item, key }]
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1 || quantity > 10 || !Number.isInteger(quantity)) return
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0),
    [items],
  )
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      subtotal,
      count,
    }),
    [items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clear, subtotal, count],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
