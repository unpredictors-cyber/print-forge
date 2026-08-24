import type { MetadataRoute } from 'next'

import { mockProducts } from '@/data/mockData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3dprintforge.vercel.app'
  const staticRoutes = ['', '/shop', '/policies/shipping', '/policies/returns', '/policies/privacy', '/policies/terms', '/policies/faq']
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: 'weekly' as const, priority: route === '' ? 1 : 0.7 })),
    ...mockProducts.filter((product) => product.is_published).map((product) => ({
      url: `${baseUrl}/shop/${product.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: product.images,
    })),
  ]
}
