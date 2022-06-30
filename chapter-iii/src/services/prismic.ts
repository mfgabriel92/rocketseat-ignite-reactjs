import Prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown) {
  return Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_PERMANENT_ACCESS_TOKEN,
      req
    }
  )
}