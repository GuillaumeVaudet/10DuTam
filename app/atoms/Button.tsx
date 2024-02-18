import { type MouseEventHandler } from "react"
import styles from './Button.module.css'

export enum VARIANT {
  Primary = 'primary',
  Social = 'social',
}

const Button = ({ label, variant, handleClick, type }: ButtonProps) => {
  return (
    <>
      <button
        className={ `${styles[variant]}` }
        onClick={ handleClick }
        type={ type }>
        { label }
      </button>
    </>
  )
}

interface ButtonProps {
  label: string,
  variant: VARIANT,
  handleClick: MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset'
}

export default Button
