import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">SkipLegal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Simplify Your Immigration Journey</h2>
                <p className="text-lg text-muted-foreground">
                  SkipLegal helps you navigate the complex immigration process with AI-powered assistance, document
                  management, and step-by-step guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Log In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Immigration assistance illustration"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">How SkipLegal Helps You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">AI Chatbot</h3>
                <p className="text-muted-foreground">
                  Get instant answers to your immigration questions from our AI assistant.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Document Upload</h3>
                <p className="text-muted-foreground">Securely upload and manage your RFE documents in one place.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Case Tracking</h3>
                <p className="text-muted-foreground">Monitor your immigration case status with real-time updates.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Form Wizard</h3>
                <p className="text-muted-foreground">Complete your immigration forms with our step-by-step guidance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 SkipLegal. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
