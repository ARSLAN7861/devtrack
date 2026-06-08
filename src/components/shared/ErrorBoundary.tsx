import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { resetApp } from '@/store/localStorage'

interface Props { children: ReactNode }
interface State { hasError: boolean; error: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-rose-500/30 bg-rose-500/5 p-8 text-center">
          <AlertTriangle size={40} className="text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 text-sm mb-2">
            The app encountered an error. This can happen if the stored data is corrupted.
          </p>
          <code className="block text-xs text-rose-400 bg-rose-500/10 rounded p-2 mb-6 text-left overflow-auto">
            {this.state.error}
          </code>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-2.5 rounded-lg border border-[#1a2235] text-slate-300 hover:text-white text-sm transition-colors"
            >
              Reload
            </button>
            <button
              onClick={() => { resetApp(); window.location.reload() }}
              className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors"
            >
              Reset App
            </button>
          </div>
        </div>
      </div>
    )
  }
}
