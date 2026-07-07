'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValueEvent } from 'motion/react'
import { X, Send, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import {
  CHATBOT_NAME,
  chatFallback,
  chatGreeting,
  chatTopics,
  findBestTopic,
  findSmallTalk,
  type ChatTopic,
} from '@/content/chatbot'

const ease = [0.16, 1, 0.3, 1] as const

const BOT_AVATAR = '/assets/chatbot/bot-avatar.png'

type SectionSide = { id: string; side: 'left' | 'right'; top: number }

const sectionSides: SectionSide[] = [
  { id: 'services', side: 'right', top: 35 },
  { id: 'process', side: 'left', top: 50 },
  { id: 'stats', side: 'right', top: 25 },
  { id: 'refer-teaser', side: 'left', top: 45 },
  { id: 'testimonials', side: 'right', top: 60 },
  { id: 'faq', side: 'left', top: 40 },
  { id: 'cta', side: 'right', top: 50 },
]

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  showMenu?: boolean
  action?: ChatTopic['action']
}

let messageId = 0
const nextId = () => `msg-${++messageId}`

export function ChatbotWidget() {
  const { shouldReduceMotion } = useReducedMotionContext()
  const { scrollY } = useLenisScroll()

  const [activeSection, setActiveSection] = useState<SectionSide | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevSectionIdRef = useRef<string | null>(null)

  useMotionValueEvent(scrollY, 'change', () => {
    if (isOpen) return
    let found: SectionSide | null = null
    for (const sec of sectionSides) {
      const el = document.getElementById(sec.id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const threshold = sec.id === sectionSides[0].id ? 0.55 : 0.4
      if (rect.top < window.innerHeight * threshold && rect.bottom > 80) {
        found = sec
        break
      }
    }
    const foundId = found?.id ?? null
    if (foundId !== prevSectionIdRef.current) {
      prevSectionIdRef.current = foundId
      setActiveSection(found)
      if (found) setIsDismissed(false)
    }
  })

  const openChat = useCallback(() => {
    setIsOpen(true)
    setMessages((prev) =>
      prev.length === 0 ? [{ id: nextId(), role: 'bot', text: chatGreeting, showMenu: true }] : prev,
    )
  }, [])

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const pushBotReply = useCallback(
    (text: string, options?: { showMenu?: boolean; action?: ChatTopic['action'] }) => {
      setIsTyping(true)
      const delay = shouldReduceMotion ? 150 : 550 + Math.random() * 300
      setTimeout(() => {
        setIsTyping(false)
        const reply: Message = { id: nextId(), role: 'bot', text }
        if (options?.showMenu) reply.showMenu = true
        if (options?.action) reply.action = options.action
        setMessages((prev) => [...prev, reply])
      }, delay)
    },
    [shouldReduceMotion],
  )

  const handleTopic = useCallback(
    (topic: ChatTopic) => {
      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: topic.label }])
      pushBotReply(topic.answer, { showMenu: true, action: topic.action })
    },
    [pushBotReply],
  )

  const handleSend = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: trimmed }])
    setInput('')

    const smallTalk = findSmallTalk(trimmed)
    if (smallTalk) {
      pushBotReply(smallTalk, { showMenu: true })
      return
    }

    const match = findBestTopic(trimmed)
    if (match) {
      pushBotReply(match.answer, { showMenu: true, action: match.action })
    } else {
      pushBotReply(chatFallback, { showMenu: true })
    }
  }, [input, pushBotReply])

  return (
    <>
      {activeSection && !isOpen && !isDismissed && (
        <motion.div
          key={activeSection.id}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: activeSection.side === 'left' ? -280 : 280, scale: 0.5, rotate: activeSection.side === 'left' ? -15 : 15 }
          }
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.2 }
              : { type: 'spring', stiffness: 180, damping: 17, mass: 0.85 }
          }
          style={{ top: `${activeSection.top}%` }}
          className={`group fixed z-[10000] ${activeSection.side === 'left' ? 'left-6 sm:left-8' : 'right-6 sm:right-8'}`}
        >
            <div className={`flex items-center gap-3 ${activeSection.side === 'right' ? 'flex-row-reverse' : ''}`}>
              <div
                className={`relative rounded-2xl border border-white/10 bg-charcoal-800/60 px-4 py-2.5 text-sm text-white shadow-lg shadow-black/30 backdrop-blur-xl ${activeSection.side === 'right' ? 'chat-bubble-right' : 'chat-bubble-left'}`}
              >
                <div className="flex items-center gap-2">
                  <span>Need help? 👋</span>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={handleDismiss}
                    className="flex h-3.5 w-3.5 items-center justify-center rounded text-slate-500 transition-colors hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="relative h-20 w-20 flex-shrink-0">
                <motion.button
                  type="button"
                  aria-label="Open chat assistant"
                  onClick={openChat}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                  transition={shouldReduceMotion ? {} : { y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, default: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                >
                  <Image src={BOT_AVATAR} alt="" fill sizes="80px" className="pointer-events-none object-cover" priority />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease }}
            role="dialog"
            aria-modal="true"
            aria-label={`${CHATBOT_NAME} chat`}
            className="floating-safe-bottom fixed right-4 z-[10001] flex h-[min(560px,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800 shadow-2xl shadow-black/50 sm:right-6"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-ink-900/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
                  <Image src={BOT_AVATAR} alt="" fill sizes="36px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{CHATBOT_NAME}</p>
                  <p className="text-xs text-slate-400">Usually replies instantly</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message, index) => {
                const isLast = index === messages.length - 1
                return (
                  <div key={message.id} className="space-y-2">
                    <div className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <p
                        className={cn(
                          'max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                          message.role === 'user'
                            ? 'rounded-br-sm bg-emerald-500 text-white'
                            : 'rounded-bl-sm bg-white/5 text-snow-50',
                        )}
                      >
                        {message.text}
                      </p>
                    </div>

                    {message.action && isLast && (
                      <div className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {message.action.external ? (
                          <a
                            href={message.action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-400/20"
                          >
                            {message.action.label}
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            href={message.action.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-400/20"
                          >
                            {message.action.label}
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    )}

                    {message.showMenu && isLast && !isTyping && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {chatTopics.map((topic) => (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => handleTopic(topic)}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-400"
                          >
                            {topic.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: `${dot * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                aria-label="Type your question"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
