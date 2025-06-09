'use client'

import * as React from 'react'
import { Camera, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from '@bugninja/shared-ui/components/ui/avatar'

export function MediaShowcase() {
  return (
    <div className="space-y-8">
      {/* Regular Image */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Regular Image</h3>
        <div className="overflow-hidden rounded-xl max-w-md">
          <Image
            src="/maldives.jpg"
            alt="Maldives water villas"
            width={400}
            height={200}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Icon</h3>
        <div className="flex gap-16">
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 border rounded-lg">
              <ImageIcon className="h-8 w-8" />
            </div>
            <span className="text-sm text-muted-foreground">Image</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 border rounded-lg">
              <Camera className="h-8 w-8" />
            </div>
            <span className="text-sm text-muted-foreground">Camera</span>
          </div>
        </div>
      </div>

      {/* Avatars */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Avatar</h3>
        <div className="flex items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Fallback</span>
          </div>
        </div>
      </div>
    </div>
  )
} 