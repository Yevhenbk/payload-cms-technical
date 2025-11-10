/**
 * @fileoverview LoginForm organism component
 * @module components/organisms/LoginForm
 */

'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/atoms'
import { authorizeUser } from '@/server/actions/authorizeUser'
import type { LoginFormData, FormErrors } from '@/types'
import { validateLoginForm } from '@/utils/validation'

export interface LoginFormProps {
  onSuccess?: () => void
}

/**
 * Enterprise-grade LoginForm component
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors<LoginFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (serverError) setServerError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const result = await authorizeUser(formData.email, formData.password)

      if (result.success) {
        onSuccess?.()
        window.location.reload()
      } else {
        setServerError(result.error || 'Authentication failed')
      }
    } catch (error) {
      setServerError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white px-8 py-10 shadow-lg rounded-xl border border-gray-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email below to login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {serverError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{serverError}</p>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="test@test.com"
            required
            autoComplete="email"
            disabled={isSubmitting}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            disabled={isSubmitting}
          />

          <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}
