'use client'

import * as React from 'react'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@bugninja/shared-ui/components/ui/alert'
import { useToast } from '@bugninja/shared-ui/components/ui/use-toast'
import { Toast } from '@bugninja/shared-ui/components/ui/toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@bugninja/shared-ui/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@bugninja/shared-ui/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bugninja/shared-ui/components/ui/tooltip'
import { Progress } from '@bugninja/shared-ui/components/ui/progress'
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'

export function FeedbackShowcase() {
  const { toast } = useToast()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Alerts/Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Alerts & Notifications</h3>
        <div className="space-y-4">
          <Alert variant="default">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Operation completed successfully.</AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action may have unexpected consequences.</AlertDescription>
          </Alert>

          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Here's some useful information for you.</AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Toasts */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Toast Notifications</h3>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              toast({
                title: "Success",
                description: "Your message has been sent successfully.",
              })
            }
          >
            Show Success Toast
          </Button>
          <Button variant="secondary" onClick={() => toast({
            title: "Information",
            description: "This is an informational toast.",
          })}>
            Show Info Toast
          </Button>
        </div>
      </div>

      {/* Modals/Dialogs */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Modals/Dialogs</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modal Title</DialogTitle>
              <DialogDescription>
                This is a modal dialog. It's used for displaying content that requires user attention or interaction.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Popovers */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Popovers</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Show Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <h4 className="font-medium mb-2">Popover Title</h4>
              <p className="text-sm text-muted-foreground">This is a popover with some content in it.</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Tooltips */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tooltips</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover for tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Progress Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Progress</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skeleton Loaders</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-[200px] bg-muted animate-pulse rounded" />
              <div className="h-4 w-[160px] bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Error States */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Error States</h3>
        <Alert variant="destructive" className="bg-destructive/5 border-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">There were 2 errors with your submission</AlertTitle>
          <AlertDescription className="text-destructive">
            <ul className="list-disc pl-4 mt-2">
              <li>Email is required</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
} 