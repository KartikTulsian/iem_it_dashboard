'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect } from 'react'

export default function LoginPage() {
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role = user.publicMetadata.role
      if (role === 'admin' || role === 'teacher' || role === 'student') {
        // ✅ Open dashboard in new tab only
        window.open(`/${role}`, '_blank')
      }
    }
  }, [isLoaded, isSignedIn, user])

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#EDF9FD] to-[#D1F1FF]">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white/40 backdrop-blur-md p-10 md:p-14 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-md w-full transition-all"
        >
          <div className="flex flex-col items-center mb-4">
            <Image src="/iem_logo_bg_remove.png" alt="IEM Logo" width={150} height={100} className="mb-2" />
            <h1 className="text-2xl font-bold text-gray-800 text-center p-1">PROGRAM IT</h1>
            <h2 className="text-gray-500 text-sm mt-1">Sign in to your account</h2>
          </div>

          <Clerk.GlobalError className="text-sm text-red-400 text-center" />

          <Clerk.Field name="identifier" className="w-full flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-600">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="password" className="w-full flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-600">Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm w-full p-[10px] font-semibold transition duration-200"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}
