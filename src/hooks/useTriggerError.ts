import { notification } from 'antd'
import { useEffect } from 'react'

interface UseTriggerErrorProps {
  isError: boolean
  title: string
  description?: string
}

export const useTriggerError = ({ isError, title, description }: UseTriggerErrorProps): void => {
  useEffect(() => {
    if (isError) {
      notification.error({
        message: title,
        description: description,
      })
    }
  }, [isError, title, description])
}
