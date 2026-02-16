import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',     // "*" means "All Robots are welcome"
      allow: '/',         // "/" means "You can look at every room"
    },
    sitemap: 'https://resqroute.vercel.app/sitemap.xml', // "Here is the map!"
  }
}
