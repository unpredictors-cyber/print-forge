import type {
  BlogPost,
  Material,
  Order,
  Product,
  Profile,
  Review,
  Ticket,
  TicketMessage,
} from '@/lib/types'

export const MATERIALS: Material[] = [
  {
    id: 'pla',
    name: 'PLA',
    description: 'Standard biodegradable plastic. Great all-rounder.',
    priceMultiplier: 1,
  },
  {
    id: 'petg',
    name: 'PETG',
    description: 'Tougher and heat-resistant. Ideal for functional parts.',
    priceMultiplier: 1.15,
  },
  {
    id: 'abs',
    name: 'ABS',
    description: 'Durable, impact-resistant plastic for everyday products.',
    priceMultiplier: 1.25,
  },
  {
    id: 'nylon',
    name: 'Nylon',
    description: 'Industrial strength and flexibility for demanding use.',
    priceMultiplier: 1.5,
  },
]

const COLORS = {
  navy: { name: 'Navy', hex: '#1e3a8a' },
  white: { name: 'White', hex: '#f8fafc' },
  charcoal: { name: 'Charcoal', hex: '#334155' },
  teal: { name: 'Teal', hex: '#0d9488' },
  coral: { name: 'Coral', hex: '#f87171' },
  sand: { name: 'Sand', hex: '#d6c7a1' },
}

export const mockProducts: Product[] = [
  {
    id: 'prod-honeycomb-controller-stand',
    name: 'Honeycomb Controller Stand',
    description:
      'A modular desk organizer with angled pen slots, a phone groove, and trays for clips and cards. Printed as a single seamless piece with a matte finish that resists scratches and fingerprints.',
    size_reference: 'Approx. 18cm x 12cm x 8cm, shown next to a coffee mug for scale.',
    price: 179,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104548%20%284%29-pnYfouBdw3sWvPYYtz1BaLf4fMoDNu.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104546%20%281%29-Im6rcaC477NRhI8siqgBXOFMM2aEq2.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104545%20%281%29-YpWh7u40jdNuEC46TW3M7nyT66xiAv.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104547%20%281%29-sBuzNlCEtmoQ7iOOGq06bPucu9JBeN.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104544%20%281%29-KFJou3ttPH12bOchxgOa2Bv1jejMIe.png',
    ],
    available_colors: [COLORS.navy, COLORS.white, COLORS.charcoal, COLORS.sand],
    available_materials: [MATERIALS[0], MATERIALS[1], MATERIALS[2]],
    category_tags: ['office', 'organization'],
    lead_time_days: [3, 5],
    is_published: true,
  },
  {
    id: 'prod-dual-honeycomb-controller-stand',
    name: 'Dual Honeycomb Controller Stand',
    description:
      'An organic voronoi-pattern planter with a hidden drainage tray. The lattice walls keep roots aerated while the sculptural silhouette looks great on shelves and windowsills.',
    size_reference: 'Approx. 14cm x 14cm x 16cm, shown next to a coffee mug for scale.',
    price: 219,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104550%20%283%29-QTVKWJEEY0GzjGhkJ0wb6q7aPoIytx.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104551%20%284%29-r7A8dnB9paQJuqRGDWp4R8OAoLSGlL.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104549%20%282%29-QQUQo867Us0OawgXlle7cvXInNPecU.png',
    ],
    available_colors: [COLORS.white, COLORS.teal, COLORS.coral, COLORS.sand],
    available_materials: [MATERIALS[0], MATERIALS[1], MATERIALS[2]],
    category_tags: ['home', 'planters'],
    lead_time_days: [3, 5],
    is_published: true,
  },
  {
    id: 'prod-dragon-headphone-stand',
    name: 'Dragon Headphone Stand',
    description:
      'A print-in-place articulated dragon with 40+ flexible joints. No assembly required — it slithers, curls, and poses straight off the printer. A favorite desk toy and gift.',
    size_reference: 'Approx. 22cm x 6cm x 9cm, shown next to a coffee mug for scale.',
    price: 189,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104553%20%281%29-XAIhaRPTr9jpXM9LzzoEfKqZgT3JPV.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104555%20%281%29-UwxjWzmmCyu8zPxicJC74jgDh92jIK.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104554-G37FzwBvV1gtaUHTlw6daiF9bBCWki.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104552-FZI6o51T8t9m0Gx9yoB9damqQFVRgs.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104555-xAKfYbAdazWfu7RROnNBB19smPioXB.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104553-N91YK0wV7SHvOcvZ9MMLgJ873WMS0I.png',
    ],
    available_colors: [COLORS.teal, COLORS.coral, COLORS.navy, COLORS.white],
    available_materials: [MATERIALS[0], MATERIALS[1]],
    category_tags: ['toys', 'gifts'],
    lead_time_days: [2, 4],
    is_published: true,
  },
  {
    id: 'prod-nexus-max-organizer',
    name: 'Nexus Max Organizer',
    description:
      'A single-piece phone stand with a 62° viewing angle, cable pass-through, and rubberized feet. Fits phones and small tablets with or without a case.',
    size_reference: 'Approx. 12cm x 8cm x 10cm, shown next to a coffee mug for scale.',
    price: 169,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104557-R309oWvlvW1eZCNMBawPOe6QXDZDqm.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104558-qMRiLcGbe2NjyDAIAx4dUCuBeOe2js.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104556-7HBq79ysY316FAkxB16bTyvEGbnU4I.png',
    ],
    available_colors: [COLORS.charcoal, COLORS.white, COLORS.navy],
    available_materials: [MATERIALS[0], MATERIALS[1], MATERIALS[2]],
    category_tags: ['office', 'accessories'],
    lead_time_days: [2, 3],
    is_published: true,
  },
  {
    id: 'prod-milk-crate-organizer',
    name: 'Milk Crate Organizer',
    description:
      'A set of three interlocking hexagonal wall shelves with concealed mounting brackets. Arrange them in honeycomb clusters or spread them across a wall.',
    size_reference: 'Approx. 30cm x 10cm x 30cm, shown next to a coffee mug for scale.',
    price: 199,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104563%20%282%29-T6PuGhyEffV8hPqWepzs97aAfCGO3T.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104560%20%281%29-Ub6P3l75dYakUE7c5N0xqye3b52R50.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104559%20%281%29-7lcn8ynSMF6SWBUxxurpeVLS4SLT9m.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104561%20%281%29-cIwy43PF1mWGozCvG76lqLGML7FERn.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000104562%20%282%29-GswBRUXiFTrKgkQMF1WQusoBLsoklx.png',
    ],
    available_colors: [COLORS.white, COLORS.charcoal, COLORS.sand],
    available_materials: [MATERIALS[0], MATERIALS[1]],
    category_tags: ['home', 'organization'],
    lead_time_days: [4, 7],
    is_published: true,
  },

]

export const CATEGORIES = [
  'office',
  'home',
  'toys',
  'games',
  'gifts',
  'planters',
  'accessories',
  'organization',
]

const REVIEW_COUNTS = [3, 11, 6, 19, 2]
const REVIEWERS = ['Maya R.', 'Daniel K.', 'Sofia L.', 'Ahmed B.', 'Priya S.', 'Noah T.', 'Lena W.', 'Chris J.']

export const mockReviews: Review[] = mockProducts.flatMap((product, productIndex) =>
  Array.from({ length: REVIEW_COUNTS[productIndex] ?? 4 }, (_, reviewIndex) => ({
    id: `rev-${productIndex}-${reviewIndex + 1}`,
    product_id: product.id,
    user_id: `user-${reviewIndex + 2}`,
    user_name: REVIEWERS[reviewIndex % REVIEWERS.length],
    rating: reviewIndex % 5 === 3 ? 4 : 5,
    comment: reviewIndex % 3 === 0
      ? `Beautifully finished and thoughtfully designed. The ${product.name.toLowerCase()} feels made for my space.`
      : reviewIndex % 3 === 1
        ? 'Solid print quality, clean edges, and it arrived earlier than expected.'
        : 'A practical piece with a polished finish. I would happily order another one.',
    created_at: `2026-08-${String(5 + (reviewIndex % 20)).padStart(2, '0')}T09:05:00Z`,
  })),
)

export const mockOrders: Order[] = [
  {
    id: 'ord-10241',
    customer_id: 'user-1',
    status: 'DELIVERED',
    total_amount: 62,
    items: [
      {
        product_id: 'prod-desk-organizer',
        product_name: 'Geometric Desk Organizer',
        image: '/images/products/desk-organizer.png',
        color: 'Navy',
        material: 'PLA',
        quantity: 1,
        unit_price: 34,
      },
      {
        product_id: 'prod-voronoi-planter',
        product_name: 'Voronoi Lattice Planter',
        image: '/images/products/voronoi-planter.png',
        color: 'White',
        material: 'PLA',
        quantity: 1,
        unit_price: 28,
      },
    ],
    created_at: '2026-07-08T14:00:00Z',
  },
  {
    id: 'ord-10388',
    customer_id: 'user-1',
    status: 'SHIPPED',
    total_amount: 91.8,
    items: [
      {
        product_id: 'prod-chess-set',
        product_name: 'Modern Minimal Chess Set',
        image: '/images/products/chess-set.png',
        color: 'Navy',
        material: 'Resin',
        quantity: 1,
        unit_price: 91.8,
      },
    ],
    created_at: '2026-08-02T09:30:00Z',
  },
  {
    id: 'ord-10412',
    customer_id: 'user-1',
    status: 'IN_PRODUCTION',
    total_amount: 24,
    items: [
      {
        product_id: 'prod-articulated-dragon',
        product_name: 'Articulated Dragon Figurine',
        image: '/images/products/articulated-dragon.png',
        color: 'Teal',
        material: 'PLA',
        quantity: 1,
        unit_price: 24,
      },
    ],
    created_at: '2026-08-14T11:15:00Z',
  },
]

export const mockTickets: Ticket[] = [
  {
    id: 'tick-501',
    customer_id: 'user-1',
    customer_name: 'Jordan Miles',
    order_id: 'ord-10241',
    assigned_to: 'admin-2',
    type: 'COMPLAINT',
    status: 'IN_PROGRESS',
    subject: 'Planter arrived with a small crack',
    created_at: '2026-07-15T10:00:00Z',
  },
  {
    id: 'tick-502',
    customer_id: 'user-2',
    customer_name: 'Maya R.',
    order_id: 'ord-10199',
    assigned_to: null,
    type: 'RETURN',
    status: 'OPEN',
    subject: 'Ordered wrong color, requesting return',
    created_at: '2026-08-10T16:20:00Z',
  },
  {
    id: 'tick-503',
    customer_id: 'user-3',
    customer_name: 'Daniel K.',
    order_id: 'ord-10305',
    assigned_to: 'admin-2',
    type: 'REFUND',
    status: 'RESOLVED',
    subject: 'Item never arrived — tracking stuck',
    created_at: '2026-07-28T13:45:00Z',
  },
]

export const mockTicketMessages: TicketMessage[] = [
  {
    id: 'msg-1',
    ticket_id: 'tick-501',
    sender_id: 'user-1',
    sender_name: 'Jordan Miles',
    sender_role: 'customer',
    content:
      'Hi, my Voronoi planter arrived today but there is a hairline crack along one of the lattice walls. Photo attached. Can this be replaced?',
    created_at: '2026-07-15T10:00:00Z',
  },
  {
    id: 'msg-2',
    ticket_id: 'tick-501',
    sender_id: 'admin-2',
    sender_name: 'Priya (Support)',
    sender_role: 'support',
    content:
      "So sorry about that, Jordan! That's definitely not up to our standard. We've queued a replacement print in White PLA — it will ship within 3 business days at no charge. No need to return the damaged one.",
    created_at: '2026-07-15T14:30:00Z',
  },
  {
    id: 'msg-3',
    ticket_id: 'tick-501',
    sender_id: 'user-1',
    sender_name: 'Jordan Miles',
    sender_role: 'customer',
    content: 'Amazing, thank you for the quick turnaround!',
    created_at: '2026-07-15T15:02:00Z',
  },
  {
    id: 'msg-4',
    ticket_id: 'tick-502',
    sender_id: 'user-2',
    sender_name: 'Maya R.',
    sender_role: 'customer',
    content:
      'I accidentally ordered the phone stand in Coral instead of Charcoal. It is unopened — can I return or exchange it?',
    created_at: '2026-08-10T16:20:00Z',
  },
  {
    id: 'msg-5',
    ticket_id: 'tick-503',
    sender_id: 'user-3',
    sender_name: 'Daniel K.',
    sender_role: 'customer',
    content: 'Tracking has shown "in transit" for 12 days. I would like a refund please.',
    created_at: '2026-07-28T13:45:00Z',
  },
  {
    id: 'msg-6',
    ticket_id: 'tick-503',
    sender_id: 'admin-2',
    sender_name: 'Priya (Support)',
    sender_role: 'support',
    content:
      'Confirmed with the carrier that the package was lost. A full refund of $16.00 has been issued to your original payment method — you should see it within 3–5 business days.',
    created_at: '2026-07-29T09:10:00Z',
  },
]

export const mockProfiles: Profile[] = [
  {
    id: 'user-1',
    email: 'jordan@example.com',
    full_name: 'Jordan Miles',
    role: 'CUSTOMER',
    scopes: [],
    phone: '+1 (555) 012-3456',
    address: '482 Maker Lane, Austin, TX 78701',
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: 'admin-1',
    email: 'alex@printforge.shop',
    full_name: 'Alex Chen',
    role: 'MASTER_ADMIN',
    scopes: ['analytics', 'products', 'reviews', 'support', 'team', 'blog'],
    phone: null,
    address: null,
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'admin-2',
    email: 'priya@printforge.shop',
    full_name: 'Priya Sharma',
    role: 'ADMIN',
    scopes: ['support', 'reviews'],
    phone: null,
    address: null,
    created_at: '2026-02-18T00:00:00Z',
  },
  {
    id: 'admin-3',
    email: 'marco@printforge.shop',
    full_name: 'Marco Ruiz',
    role: 'ADMIN',
    scopes: ['products', 'blog'],
    phone: null,
    address: null,
    created_at: '2026-03-22T00:00:00Z',
  },
]

/** The signed-in demo user. Replaced by the Supabase session user when connected. */
export const mockCurrentUser: Profile = mockProfiles[0]

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'PLA vs PETG vs Resin: Choosing the Right Material for Your Print',
    slug: 'pla-vs-petg-vs-resin-material-guide',
    excerpt:
      'Not sure which material to pick at checkout? Here is a practical guide to strength, finish, and cost across our four print materials.',
    keywords: ['3D printing materials', 'PLA', 'PETG', 'resin printing', 'material guide'],
    read_time: 6,
    content: `<p>Every product in our shop can be printed in multiple materials, and the right choice depends on how you plan to use it. Here is how we think about it.</p>
<h2>PLA: The Everyday Default</h2>
<p>PLA is our standard material. It is plant-based, prints with crisp detail, and comes in the widest color range. For decorative items, organizers, and toys, PLA is almost always the right call.</p>
<h2>PETG: Built for Function</h2>
<p>PETG adds heat resistance and impact strength for about 15% more. Choose it for anything that lives in a car, near a window, or gets handled roughly — phone stands, hooks, and outdoor planters.</p>
<h2>Resin: Maximum Detail</h2>
<p>Resin prints capture detail that filament simply cannot — smooth surfaces with no visible layer lines. It is our premium finish for chess pieces, figurines, and display items.</p>
<h2>Nylon: Industrial Strength</h2>
<p>When a part needs to flex without snapping — clips, brackets, functional prototypes — nylon is the professional choice.</p>
<blockquote>Rule of thumb: decorative → PLA, functional → PETG or Nylon, display-quality → Resin.</blockquote>`,
    image: '/images/blog/materials-guide.png',
    author_id: 'admin-1',
    author_name: 'Alex Chen',
    published_at: '2026-07-18T00:00:00Z',
  },
  {
    id: 'post-2',
    title: '5 Design Tips for Ordering Custom 3D Printed Products',
    slug: 'design-tips-custom-3d-printed-products',
    excerpt:
      'From wall thickness to color contrast, these five tips will help you get the most out of every custom order.',
    keywords: ['custom 3D printing', 'design tips', 'product customization', 'print quality'],
    read_time: 4,
    content: `<p>Ordering a custom print is easy, but a few small decisions make a big difference in the final result.</p>
<h2>1. Match Material to Use</h2>
<p>Read the material descriptions on each product page. A planter that lives outside needs PETG; a desk figurine shines in resin.</p>
<h2>2. Think About Color in Context</h2>
<p>Navy and charcoal hide dust and fingerprints; white and sand show off geometric detail. Pick based on where the piece will live.</p>
<h2>3. Lead Times Are Real Print Times</h2>
<p>Every item is printed on demand — the lead time on the product page is when your print actually starts and finishes, not warehouse padding.</p>
<h2>4. Bundle Your Order</h2>
<p>Items in the same order and material print together, which often means everything ships sooner.</p>
<h2>5. Reviews Tell You About Finish</h2>
<p>Our review section is unfiltered. Check what other customers say about surface finish before choosing between PLA and resin.</p>`,
    image: '/images/blog/design-tips.png',
    author_id: 'admin-3',
    author_name: 'Marco Ruiz',
    published_at: '2026-08-04T00:00:00Z',
  },
]

export const mockPolicies: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'Shipping Policy',
    body: [
      'Every item is printed on demand. The lead time shown on each product page reflects actual production time before your order ships.',
      'Once shipped, domestic delivery takes 2–5 business days via tracked carrier. You will receive a tracking link by email the moment your package leaves our workshop.',
      'Orders containing multiple items ship together once all items finish printing. If you need items sooner, place separate orders.',
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    body: [
      'If your item arrives damaged or defective, open a ticket from your account dashboard within 14 days and we will reprint or refund it — your choice, no return shipping required.',
      'Because every product is made to order in your chosen color and material, we cannot accept returns for preference-based reasons on customized items. Standard-configuration items may be returned unused within 30 days.',
      'Refunds are issued to the original payment method within 3–5 business days of approval.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'We collect only the information needed to fulfill your order: name, email, shipping address, and payment details (processed securely by Stripe — we never see your card number).',
      'Photos uploaded for custom lithophane products are used solely for producing your item and are deleted from our servers 30 days after delivery.',
      'We never sell or share your personal data with third parties for marketing purposes.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    body: [
      'By placing an order you confirm that any custom content you upload (such as photos) is owned by you or used with permission.',
      'We reserve the right to decline orders containing content that infringes intellectual property or violates our content guidelines.',
      'Prices, materials, and lead times are subject to change; the price shown at checkout is the price you pay.',
    ],
  },
}
