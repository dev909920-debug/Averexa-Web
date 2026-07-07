'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import { useState, useCallback, useRef } from 'react'
import { FormField } from './FormField'
import { FormTextarea } from './FormTextarea'
import { FormLoader } from './FormLoader'
import { FormSuccessState } from './FormSuccessState'
import { Icon } from '@/components/ui/Icon'
import type { FormSubmitStatus } from '@/hooks/useFormSubmit'
import { trackFormSubmit } from '@/features/analytics/events'

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  targetJobTitle: z.string().min(2, 'Please enter your target job title'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
})

type FormValues = z.infer<typeof schema>

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? ''
const ACCEPTED_TYPES = ['.pdf', '.doc', '.docx']
const MAX_FILE_MB = 5

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function ContactForm() {
  const [status, setStatus] = useState<FormSubmitStatus>('idle')
  const [showSuccess, setShowSuccess] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResumeError(null)
    const file = e.target.files?.[0] ?? null
    if (!file) { setResumeFile(null); return }

    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_TYPES.includes(ext)) {
      setResumeError('Please upload a PDF, DOC, or DOCX file.')
      setResumeFile(null)
      return
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setResumeError(`File must be under ${MAX_FILE_MB}MB.`)
      setResumeFile(null)
      return
    }
    setResumeFile(file)
  }

  function handleRemoveFile() {
    setResumeFile(null)
    setResumeError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: FormValues) => {
    if (!APPS_SCRIPT_URL) {
      toast.error('Form service not configured.')
      return
    }

    setStatus('loading')

    let resumeBase64 = ''
    let resumeMime = ''
    let resumeName = ''

    if (resumeFile) {
      try {
        resumeBase64 = await fileToBase64(resumeFile)
        resumeMime = resumeFile.type
        resumeName = resumeFile.name
      } catch {
        setStatus('error')
        toast.error('Failed to process resume file. Please try again.')
        setTimeout(() => setStatus('idle'), 3000)
        return
      }
    }

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      targetJobTitle: data.targetJobTitle,
      description: data.description ?? '',
      resumeBase64,
      resumeMime,
      resumeName,
    }

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const result = (await res.json()) as { success: boolean; error?: string }

      if (result.success) {
        setStatus('success')
        setShowSuccess(true)
        trackFormSubmit('contact')
        reset()
        setResumeFile(null)
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
    setResumeFile(null)
  }, [reset])

  return (
    <AnimatePresence mode="wait">
      {showSuccess ? (
        <FormSuccessState key="success" onReset={handleReset} />
      ) : status === 'loading' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FormLoader />
        </motion.div>
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
          <FormField
            {...register('fullName')}
            label="Full Name"
            name="fullName"
            placeholder="Raj Sharma"
            autoComplete="name"
            error={errors.fullName?.message}
            leadingIcon="User"
          />
          <FormField
            {...register('email')}
            label="Email Address"
            name="email"
            type="email"
            placeholder="raj@example.com"
            autoComplete="email"
            error={errors.email?.message}
            leadingIcon="Mail"
          />
          <FormField
            {...register('phone')}
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            error={errors.phone?.message}
            leadingIcon="Phone"
          />
          <FormField
            {...register('targetJobTitle')}
            label="Target Job Title"
            name="targetJobTitle"
            placeholder="Software Engineer, Product Manager…"
            error={errors.targetJobTitle?.message}
            leadingIcon="Briefcase"
          />

          {/* Resume Upload */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-white/80"
              htmlFor="resume-upload"
            >
              Resume{' '}
              <span className="text-white/35 font-normal text-xs">(optional · PDF, DOC, DOCX · max 5MB)</span>
            </label>

            <AnimatePresence mode="wait">
              {resumeFile ? (
                <motion.div
                  key="file-selected"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon name="FileText" size="sm" className="shrink-0 text-emerald-400" aria-hidden="true" />
                    <span className="truncate text-sm text-emerald-300">{resumeFile.name}</span>
                    <span className="shrink-0 text-xs text-white/35">
                      {(resumeFile.size / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="shrink-0 rounded-md p-1 text-white/40 transition-colors hover:text-white/80"
                    aria-label="Remove resume"
                  >
                    <Icon name="X" size="xs" aria-hidden="true" />
                  </button>
                </motion.div>
              ) : (
                <motion.label
                  key="file-empty"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  htmlFor="resume-upload"
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] px-4 py-4 transition-colors duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] transition-colors group-hover:bg-emerald-500/10">
                    <Icon name="Upload" size="sm" className="text-white/40 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      Upload your resume
                    </span>
                    <span className="text-xs text-white/30">PDF, DOC or DOCX</span>
                  </div>
                </motion.label>
              )}
            </AnimatePresence>

            <input
              ref={fileInputRef}
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
              aria-describedby={resumeError ? 'resume-error' : undefined}
            />

            {resumeError && (
              <p id="resume-error" className="text-xs text-red-400" role="alert">
                {resumeError}
              </p>
            )}
          </div>

          <FormTextarea
            {...register('description')}
            label="Brief Description"
            name="description"
            placeholder="Tell us about your background and what you're looking for (optional)"
            error={errors.description?.message}
            rows={4}
            hint="Optional · max 500 characters"
          />

          <button
            type="submit"
            className="self-start h-11 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 font-medium text-sm text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send Enquiry
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
