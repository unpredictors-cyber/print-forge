export type Role = 'CUSTOMER' | 'ADMIN' | 'MASTER_ADMIN'

export type AdminScope =
  | 'analytics'
  | 'products'
  | 'reviews'
  | 'support'
  | 'team'
  | 'blog'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: Role
  scopes: AdminScope[]
  phone: string | null
  address: string | null
  created_at: string
}

export interface Material {
  id: string
  name: string
  description: string
  priceMultiplier: number
}

export interface ColorOption {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  description: string
  size_reference: string
  price: number
  images: string[]
  available_colors: ColorOption[]
  available_materials: Material[]
  category_tags: string[]
  lead_time_days: [number, number]
  is_published: boolean
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export type OrderStatus =
  | 'PENDING'
  | 'IN_PRODUCTION'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export interface OrderItem {
  product_id: string
  product_name: string
  image: string
  color: string
  material: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: string
  customer_id: string | null
  status: OrderStatus
  total_amount: number
  items: OrderItem[]
  created_at: string
}

export type TicketType = 'RETURN' | 'REFUND' | 'COMPLAINT'
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'

export interface Ticket {
  id: string
  customer_id: string
  customer_name: string
  order_id: string
  assigned_to: string | null
  type: TicketType
  status: TicketStatus
  subject: string
  created_at: string
}

export interface TicketMessage {
  id: string
  ticket_id: string
  sender_id: string
  sender_name: string
  sender_role: 'customer' | 'support'
  content: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  keywords: string[]
  read_time: number
  content: string
  image: string
  author_id: string
  author_name: string
  published_at: string
}

export interface CartItem {
  key: string
  product_id: string
  product_name: string
  image: string
  color: ColorOption
  material: Material
  quantity: number
  unit_price: number
}
