import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  exact?: boolean
  children: ReactElement
}

function ActiveLink({ exact = false, children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()
  
  let isActive = false
  if (exact && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (!exact && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true
  }

  return (
    <Link {...rest} >
      {cloneElement(children, {
        backgroundColor: isActive ? 'pink.500' : 'transparent'
      })}
    </Link>
  )
}

export default ActiveLink