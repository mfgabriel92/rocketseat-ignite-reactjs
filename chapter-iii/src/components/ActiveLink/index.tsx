import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClass: string
}

function ActiveLink({ children, activeClass, ...rest }: ActiveLinkProps) {
  const { asPath  } = useRouter()
  const className = asPath === rest.href
    ? activeClass
    : ''
  
  return (
    <Link {...rest} className={className}>
      {cloneElement(children, { className })}
    </Link>
  )
}

export default ActiveLink