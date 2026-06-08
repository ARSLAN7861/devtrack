import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0a0f1e]">

      {/* ── Large screens (≥1024px): full sidebar ── */}
      <div className="hidden lg:flex flex-col shrink-0">
        <Sidebar onNavigate={() => {}} collapsed={false} />
      </div>

      {/* ── Medium screens (768-1023px): icon-only sidebar ── */}
      <div className="hidden md:flex lg:hidden flex-col shrink-0">
        <Sidebar onNavigate={() => {}} collapsed={true} />
      </div>

      {/* ── Mobile (<768px): hamburger + slide-in drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:hidden ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onNavigate={() => setMobileOpen(false)} collapsed={false} />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          menuButton={
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 -ml-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          }
        />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
