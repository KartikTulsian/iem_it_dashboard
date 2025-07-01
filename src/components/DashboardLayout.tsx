'use client'

import React, { ReactNode } from 'react'
import { useClerk } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { signOut } = useClerk()

  const isDashboardRoute = ['/admin', '/teacher', '/student'].some((route) =>
    pathname.startsWith(route)
  )

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
    setTimeout(() => window.close(), 500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Optional Top Header */}
      {isDashboardRoute && (
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 text-sm hover:underline"
          >
            Sign Out
          </button>
        </header>
      )}

      {/* Page Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
