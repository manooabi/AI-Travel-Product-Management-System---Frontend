// import { NavLink, Outlet, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import api from '../../services/api'

// function AppLayout() {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = async () => {
//     try {
//       await api.post('/logout')
//     } catch (error) {
//       console.error('Logout request failed:', error)
//     } finally {
//       logout()
//       navigate('/login', { replace: true })
//     }
//   }

//   return (
//     <div>
//       <header>
//         <h1>AI Travel Product Management System</h1>

//         <div>
//           <span>
//             Welcome, {user?.name}
//           </span>

//           <button onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <div style={{ display: 'flex' }}>

//         <aside>
//           <nav>
//             <div>
//               <NavLink to="/dashboard">
//                 Dashboard
//               </NavLink>
//             </div>

//             <div>
//               <NavLink to="/products">
//                 Products
//               </NavLink>
//             </div>

//             <div>
//               <NavLink to="/ai">
//                 AI Tools
//               </NavLink>
//             </div>
//             <div>
//   <NavLink to="/ai/search">
//     AI Search
//   </NavLink>
// </div>
//           </nav>
//         </aside>

//         <main>
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   )
// }

// export default AppLayout


import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      logout()
      navigate('/login', { replace: true })
    }
  }

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      label: 'Products',
      path: '/products',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      ),
    },
    {
      label: 'AI Generator',
      path: '/ai',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z" />
          <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" />
        </svg>
      ),
    },
    {
      label: 'AI Search',
      path: '/ai/search',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l5 5" />
        </svg>
      ),
    },
  ]

  const isActive = (path) => {
    if (path === '/ai') {
      return location.pathname === '/ai'
    }

    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-slate-200 bg-white
          shadow-[4px_0_24px_rgba(15,23,42,0.04)]
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Brand */}
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M3 13l7-2 4-7 2 1-1 7 6 2v2l-7-1-4 5-2-1 1-5-6 1z" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                TravelAI
              </p>

              <p className="text-[11px] font-medium text-slate-400">
                Product Management
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1.5">

            {navigationItems.map((item) => {
              const active = isActive(item.path)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 rounded-xl px-3.5 py-3
                    text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <span
                    className={`
                      transition-colors
                      ${
                        active
                          ? 'text-indigo-600'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    // <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </NavLink>
              )
            })}

          </nav>

          {/* AI workspace card */}
          <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z" />
              </svg>
            </div>

            <p className="text-xs font-bold text-indigo-950">
              AI-powered workspace
            </p>

            <p className="mt-1 text-[11px] leading-5 text-indigo-700/80">
              Generate travel products and search your catalogue using natural language.
            </p>
          </div>
        </div>

        {/* User / Logout */}
        <div className="border-t border-slate-100 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.name || 'User'}
              </p>

              <p className="truncate text-xs text-slate-400">
                {user?.email || ''}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 3v18" />
            </svg>

            Sign out
          </button>

        </div>

      </aside>

      {/* Main application */}
      <div className="lg:pl-72">

        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                aria-label="Open navigation"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              </button>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Travel Product Management
                </p>

                <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  {location.pathname === '/dashboard'
                    ? 'Dashboard'
                    : location.pathname.startsWith('/products')
                      ? 'Products'
                      : location.pathname === '/ai'
                        ? 'AI Product Generator'
                        : location.pathname.startsWith('/ai/search')
                          ? 'AI Product Search'
                          : 'Workspace'}
                </h1>
              </div>

            </div>

            <div className="hidden items-center gap-3 sm:flex">

              <div className="hidden h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 md:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-medium text-slate-500">
                  System online
                </span>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

            </div>

          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  )
}

export default AppLayout