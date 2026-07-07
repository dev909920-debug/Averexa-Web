'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
    }
  }
}

type TurnstileWidgetProps = {
  siteKey: string
  onToken: (token: string) => void
  onExpire: () => void
}

const SCRIPT_ID = 'cf-turnstile-script'

function renderTurnstile(container: HTMLElement, siteKey: string, onToken: (token: string) => void, onExpire: () => void): string | null {
  if (!window.turnstile) return null
  return window.turnstile.render(container, {
    sitekey: siteKey,
    callback: onToken,
    'expired-callback': onExpire,
    theme: 'dark',
  })
}

export function TurnstileWidget({ siteKey, onToken, onExpire }: TurnstileWidgetProps) {
  const widgetId = useRef<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (window.turnstile) {
      widgetId.current = renderTurnstile(container, siteKey, onToken, onExpire)
      return
    }

    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      widgetId.current = renderTurnstile(container, siteKey, onToken, onExpire)
    }
    document.body.appendChild(script)

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current)
      }
    }
  }, [siteKey, onToken, onExpire])

  return (
    <div ref={containerRef} className="min-h-[65px] flex items-center justify-center" />
  )
}
