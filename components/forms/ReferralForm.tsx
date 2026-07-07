'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import { useState, useCallback } from 'react'
import { FormField } from './FormField'
import { FormTextarea } from './FormTextarea'
import { SubmitButton } from './SubmitButton'
import { TurnstileWidget } from './TurnstileWidget'
import { FormSuccessState } from './FormSuccessState'
import type { FormSubmitStatus } from '@/hooks/useFormSubmit'
import type { ReferralFormPayload } from '@/types/api'
import { trackFormSubmit } from '@/features/analytics/events'

const schema = z.object({
  referrerName: z.string().min(2, 'Your name must be at least 2 characters'),
  referrerEmail: z.string().email('Please enter a valid email address'),
  candidateName: z.string().min(2, "Candidate's name must be at least 2 characters"),
  candidateEmail: z.string().email("Please enter the candidate's email address"),
  candidatePhone: z.string().optional(),
  candidateRole: z.string().optional(),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
})

type FormValues = z.infer<typeof schema>

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

export function ReferralForm() {
  const [status, setStatus] = useState<FormSubmitStatus>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onToken = useCallback((token: string) => setTurnstileToken(token), [])
  const onExpire = useCallback(() => setTurnstileToken(null), [])

  const onSubmit = async (data: FormValues) => {
    if (SITE_KEY && !turnstileToken) {
      toast.error('Please complete the security check.')
      return
    }

    setStatus('loading')

    const payload: ReferralFormPayload = {
      referrerName: data.referrerName,
      referrerEmail: data.referrerEmail,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      ...(data.candidatePhone && { candidatePhone: data.candidatePhone }),
      ...(data.candidateRole && { candidateRole: data.candidateRole }),
      ...(data.notes && { notes: data.notes }),
      turnstileToken: turnstileToken ?? 'dev-bypass',
    }

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = (await res.json()) as { success: boolean; error?: string }

      if (result.success) {
        setStatus('success')
        setShowSuccess(true)
        trackFormSubmit('referral')
        reset()
        setTurnstileToken(null)
      } else {
        setStatus('error')
        toast.error(result.error ?? 'Something went wrong. Please try again.')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      toast.error('Network error. Please check your connection and try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleReset = useCallback(() => {
    setShowSuccess(false)
    setStatus('idle')
    reset()
    setTurnstileToken(null)
  }, [reset])

  return (
    <AnimatePresence mode="wait">
      {showSuccess ? (
        <FormSuccessState
          key="success"
          onReset={handleReset}
          title="Referral Sent!"
          message="Thank you for the referral. We'll reach out to your contact shortly and follow up with you about your reward."
          buttonLabel="Refer someone else"
        />
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          <fieldset className="flex flex-col gap-5 border-0 p-0 m-0">
            <legend className="eyebrow mb-2">Your Details</legend>
            <FormField
              {...register('referrerName')}
              label="Your Name"
              name="referrerName"
              placeholder="Raj Sharma"
              autoComplete="name"
              error={errors.referrerName?.message}
              leadingIcon="User"
            />
            <FormField
              {...register('referrerEmail')}
              label="Your Email"
              name="referrerEmail"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              error={errors.referrerEmail?.message}
              leadingIcon="Mail"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-5 border-0 p-0 m-0">
            <legend className="eyebrow mb-2">Who You&apos;re Referring</legend>
            <FormField
              {...register('candidateName')}
              label="Candidate's Name"
              name="candidateName"
              placeholder="Priya Patel"
              error={errors.candidateName?.message}
              leadingIcon="UserPlus"
            />
            <FormField
              {...register('candidateEmail')}
              label="Candidate's Email"
              name="candidateEmail"
              type="email"
              placeholder="colleague@email.com"
              error={errors.candidateEmail?.message}
              leadingIcon="Mail"
            />
            <FormField
              {...register('candidatePhone')}
              label="Candidate's Phone"
              name="candidatePhone"
              type="tel"
              placeholder="+1 (731) 226-6022"
              error={errors.candidatePhone?.message}
              leadingIcon="Phone"
              hint="Optional"
            />
            <FormField
              {...register('candidateRole')}
              label="Target Role"
              name="candidateRole"
              placeholder="Software Engineer, Data Analyst…"
              error={errors.candidateRole?.message}
              leadingIcon="Briefcase"
              hint="Optional"
            />
          </fieldset>

          <FormTextarea
            {...register('notes')}
            label="Anything Else?"
            name="notes"
            placeholder="Tell us a little about why they'd be a great fit (optional)"
            error={errors.notes?.message}
            rows={3}
            hint="Optional · max 500 characters"
          />

          {SITE_KEY && (
            <TurnstileWidget siteKey={SITE_KEY} onToken={onToken} onExpire={onExpire} />
          )}

          <SubmitButton
            status={status}
            idleLabel="Submit Referral"
            loadingLabel="Sending…"
            successLabel="Referral Sent!"
            errorLabel="Try Again"
            className="self-start"
          />
        </motion.form>
      )}
    </AnimatePresence>
  )
}
