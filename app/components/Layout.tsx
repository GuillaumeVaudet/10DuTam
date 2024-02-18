import { type ReactNode, useState } from 'react'
import BurgerMenu from '~/molecules/BurgerMenu'
import Logo from '~/atoms/Logo'

export function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (
    <>
      <Logo />
      <BurgerMenu
        toggleMenu={ toggleMenu }
        isOpen={ isOpen } />
      <main>{ children }</main>
    </>
  )
}

export type LayoutProps = {
  children?: ReactNode;
}
