import Link from "next/link";
import { ArrowRight, Beaker, ShieldCheck, PieChart, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/40">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#93c5fd] opacity-20 dark:from-[#1d4ed8] dark:to-[#1e3a8a] dark:opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-md dark:bg-slate-950/70 supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/10">
              <Beaker className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CRMP</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-blue-600 transition-colors">Architecture</a>
            <a href="#docs" className="hover:text-blue-600 transition-colors">Documentation</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 rounded-full px-5">
                Sign In Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-8 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              v2.2 Architecture Deployed
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl mb-8 leading-[1.1]">
              The Centralized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Research Management</span> Platform.
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A comprehensive portal designed strictly for the administration, evaluation, and progression of collaborative academic research proposals. Complete with role-based routing and live budget orchestration.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-full h-14 px-8 shadow-xl shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                  Access Portal <ChevronRight className="ml-1 h-5 w-5 opacity-60" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium rounded-full h-14 px-8 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  Run Auth Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="features" className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Role-Centric Infrastructure</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Dynamically adapting interfaces depending on your exact administrative role.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 dark:bg-blue-900/30 dark:text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 dark:text-white">Strict Auth Guards</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Powered by Edge Middleware and Zustand, routes are instantly protected ensuring PIs cannot see Admin finance modules and vice-versa.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 dark:text-white">Dynamic Routing</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Sign in once. The platform automatically determines whether you belong in the PI workspace or the Administration dashboards.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 dark:bg-emerald-900/30 dark:text-emerald-400">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 dark:text-white">Simulated Mock Engine</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Develop securely without a backend. The API layer currently intercepts all requests and mimics realistic database behaviors.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800/60 dark:bg-slate-950 px-6 py-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>© 2026 Collaborative Research Platform. Architecture Mock Build.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> System Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
