import Prismic from '@prismicio/client'
import { getPrismicClient } from '@services/prismic'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from './styles.module.scss'

interface PostsProps {
  posts: {
    id: string,
    slug: string,
    title: string,
    excerpt: string,
    createdAt: string,
    updatedAt: string
  }[]
}

function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig-news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts?.map(post => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <a>
                  <time>{post.createdAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))
          }
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  const posts = response.results.map(post => ({
    id: post.id,
    slug: post.uid,
    title: post.data.title,
    excerpt: post.data.content.find((content: Record<string, any>) => content.type === 'paragraph')?.text.substr(0, 300) + '...' ?? '',
    createdAt: new Date(post.data.first_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    updatedAt: new Date(post.data.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return {
    props: {
      posts
    }
  }
}

export default Posts