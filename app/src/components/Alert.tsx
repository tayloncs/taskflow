import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration: number
  onChange: (isVisible: boolean) => void
}

const Alert = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (props.message) {
      setIsVisible(true)
      props.onChange(true)
      setTimeout(() => {
        setIsVisible(false)
        props.onChange(false)
      }, props.duration)
    }
  }, [props.message])

  if (!isVisible) {
    return <></>
  }

  return (
    <AlertWrapper $type={props.type || 'info'} $duration={props.duration}>
      {props.message}
    </AlertWrapper>
  )
}

export default Alert

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const alertTypeStyles = {
  success: css`
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
  `,
  error: css`
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
  `,
  warning: css`
    background-color: #fff3cd;
    color: #856404;
    border-color: #ffeeba;
  `,
  info: css`
    background-color: #d1ecf1;
    color: #0c5460;
    border-color: #bee5eb;
  `,
}

const AlertWrapper = styled.div<{ $type: 'success' | 'error' | 'warning' | 'info'; $duration: number }>`
  position: fixed;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $type }) => alertTypeStyles[$type]}
  animation: ${fadeIn} 0.5s ease-out, ${fadeOut} 0.5s ease-out ${props => props.$duration / 1000 - 0.5}s forwards;
`
