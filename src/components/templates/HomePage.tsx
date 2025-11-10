/**
 * @fileoverview HomePage template component
 * @module components/templates/HomePage
 */

'use client'

import Link from 'next/link'
import { LoginForm, PostForm, PostList } from '@/components/organisms'
import { UserGreeting } from '@/components/molecules'
import { Button } from '@/components/atoms'
import type { User, Post } from '@/types'

export interface HomePageProps {
  user: User | null
  posts: Post[]
  onLogout: () => void
}

/**
 * Enterprise-grade HomePage template
 */
export const HomePage: React.FC<HomePageProps> = ({ user, posts, onLogout }) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <LoginForm onSuccess={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage your posts and content efficiently</p>
        </div>

        {/* User Greeting */}
        <div className="mb-8">
          <UserGreeting user={user} onLogout={onLogout} />
        </div>

        {/* Admin Link */}
        <div className="mb-8 flex gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Admin Dashboard
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Post Form */}
          <div className="lg:col-span-1">
            <PostForm onSuccess={() => window.location.reload()} />
          </div>

          {/* Right Column - Post List */}
          <div className="lg:col-span-2">
            <PostList posts={posts} emptyMessage="Create your first post to get started" />
          </div>
        </div>
      </div>
    </div>
  )
}
