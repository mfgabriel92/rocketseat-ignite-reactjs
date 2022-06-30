import { getPrismicClient } from '@services/prismic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string
  }
}

function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.isSubscriptionActive) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.createdAt}</time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className={`${styles.content} ${styles.previewContent}`}></div>
          <div className={styles.continueReading}>
            Want to continue reading?
            <Link href="/">
              <a>Subscribe Now</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = await getPrismicClient()
  const { slug } = params as any
  const response = await prismic.getByUID('post', String(slug), {})
  
  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    createdAt: new Date(response.first_publication_date || '').toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    updatedAt: new Date(response.last_publication_date || '').toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30
  }
}

export default PostPreview