import { cn } from '@bugninja/shared-ui'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className={cn("text-4xl font-bold text-center mb-8")}>
          BugNinja Application
        </h1>
        <p className="text-center text-muted-foreground">
          Welcome to your main application. Ready for your components!
        </p>
      </div>
    </main>
  )
} 