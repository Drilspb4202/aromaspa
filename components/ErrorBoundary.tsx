import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку
    console.error('Uncaught error:', error, errorInfo)
    
    // В production можно отправлять ошибки в систему мониторинга
    // Например, Sentry:
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { contexts: { react: errorInfo } });
    // }
    
    // Можно также отправлять на сервер для анализа
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Отправка ошибки на сервер (опционально)
      fetch('/api/error-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Игнорируем ошибки отправки логов
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Упс! Что-то пошло не так.</h1>
            <p className="mb-8 text-gray-300">Мы приносим извинения за неудобства. Пожалуйста, попробуйте обновить страницу или свяжитесь с поддержкой, если проблема сохраняется.</p>
            <p className="mb-4 text-red-400">{this.state.error && this.state.error.toString()}</p>
            <Button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Попробовать снова
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
