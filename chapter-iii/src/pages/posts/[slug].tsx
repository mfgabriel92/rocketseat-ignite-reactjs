import { getPrismicClient } from '@services/prismic'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string
  }
}

function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.createdAt}</time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.content}></div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if (!session?.isSubscriptionActive) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const prismic = await getPrismicClient()
  const { slug } = params as any  
  const response = await prismic.getByUID('post', String(slug), {})
  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content),
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
    }
  }
}

export default Post