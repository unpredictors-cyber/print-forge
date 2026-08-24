import Link from 'next/link'
import { notFound } from 'next/navigation'
import { mockPolicies } from '@/data/mockData'
export function generateStaticParams() { return Object.keys(mockPolicies).map(slug => ({slug})) }
export default async function PolicyPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const policy=mockPolicies[slug]; if(!policy) notFound(); return <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8"><Link href="/" className="text-sm font-semibold text-primary hover:underline">Layer & Form</Link><h1 className="mt-8 text-4xl font-bold text-slate-950">{policy.title}</h1><div className="mt-8 space-y-5 leading-8 text-slate-600">{policy.body.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div></main> }
