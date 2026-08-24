import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { mockBlogPosts } from '@/data/mockData'

export function generateStaticParams() { return mockBlogPosts.map((post) => ({ slug: post.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = mockBlogPosts.find((item) => item.slug === slug); return { title: post ? `${post.title} | Layer & Form` : 'Journal | Layer & Form', description: post?.excerpt, keywords: post?.keywords } }
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = mockBlogPosts.find((item) => item.slug === slug); if (!post) notFound(); return <main className="mx-auto max-w-4xl px-6 py-14 lg:px-8"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Back to journal</Link><div className="mt-10"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{post.keywords.join(' / ')}</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{post.title}</h1><div className="mt-5 flex items-center gap-2 text-sm text-slate-500"><Clock3 className="h-4 w-4" /> {post.read_time} minute read</div></div><div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-md bg-muted"><Image src={post.image} alt={post.title} fill className="object-cover" priority /></div><article className="prose prose-slate mt-10 max-w-none leading-8" dangerouslySetInnerHTML={{ __html: post.content }} /></main> }
