import { useTranslation } from 'react-i18next'

interface ErrorStateProps {
  text?: string
}

interface EmptyStateProps {
  text?: string
}

export const ErrorState = ({ text }: ErrorStateProps) => {
  const { t } = useTranslation()
  return <p className="status-message error">{text ?? t('common.error')}</p>
}

export const EmptyState = ({ text }: EmptyStateProps) => {
  const { t } = useTranslation()
  return <p className="status-message">{text ?? t('common.empty')}</p>
}
