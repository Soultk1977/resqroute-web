import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // 1. We use your Vercel link for now.
  // 2. When you buy 'resqroute.in', you just change this ONE line.
  const baseUrl = 'https://resqroute.vercel.app' 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
