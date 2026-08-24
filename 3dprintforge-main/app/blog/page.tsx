import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import { mockBlogPosts } from '@/data/mockData'

export default function BlogPage() {
  return <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
    <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The workshop journal</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Ideas, materials, and making notes.</h1><p className="mt-4 text-lg leading-8 text-slate-600">Practical guides for choosing materials, designing better objects, and getting more from 3D printing.</p></div>
    <div className="mt-12 grid gap-7 md:grid-cols-2">{mockBlogPosts.map((post, i) => <article key={post.id} className={`overflow-hidden rounded-md border border-border bg-card shadow-sm ${i === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}><div className="relative min-h-56 bg-muted"><Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="p-7"><div className="flex items-center gap-3 text-xs font-medium text-slate-500"><span>{post.keywords[0]}</span><span>•</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {post.read_time} min read</span></div><h2 className="mt-3 text-2xl font-bold text-slate-950">{post.title}</h2><p className="mt-3 leading-7 text-slate-600">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">Read article <ArrowRight className="h-4 w-4" /></Link></div></article>)}</div>
  </main>
}
