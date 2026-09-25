// import { useEffect, useState } from 'react'
// import api from '../services/api'

// function Dashboard() {
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const response = await api.get('/dashboard')

//         setStats(response.data.data)
//       } catch (error) {
//         console.error('Dashboard request failed:', error)

//         setError(
//           error.response?.data?.message ||
//           'Unable to load dashboard.'
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboard()
//   }, [])

//   if (loading) {
//     return <p>Loading dashboard...</p>
//   }

//   if (error) {
//     return <p>{error}</p>
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <div>
//         <h2>Total Products</h2>
//         <p>{stats.total_products}</p>
//       </div>

//       <div>
//         <h2>Active Products</h2>
//         <p>{stats.active_products}</p>
//       </div>

//       <div>
//         <h2>Expired Products</h2>
//         <p>{stats.expired_products}</p>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import { useEffect, useState } from 'react'
import api from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard')

        setStats(response.data.data)
      } catch (error) {
        console.error('Dashboard request failed:', error)

        setError(
          error.response?.data?.message ||
          'Unable to load dashboard.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">

        <div>
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />

              <div className="mt-6 h-4 w-28 animate-pulse rounded bg-slate-100" />

              <div className="mt-3 h-9 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>

      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.7L2.7 17a2 2 0 001.7 3h15.2a2 2 0 001.7-3L13.7 3.7a2 2 0 00-3.4 0z" />
            </svg>
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Dashboard unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

        </div>
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Products',
      value: stats.total_products,
      description: 'Products in your catalogue',
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
      iconClass: 'bg-slate-100 text-slate-700',
    },
    {
      title: 'Active Products',
      value: stats.active_products,
      description: 'Currently available products',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Expired Products',
      value: stats.expired_products,
      description: 'Products past their validity',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
      iconClass: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="space-y-8">

      {/* Page introduction */}
      <section>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Overview
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {stats ? 'there' : ''}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep track of your travel catalogue, product availability,
              and AI-powered product operations from one place.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 md:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            System operational
          </div>

        </div>
      </section>

      {/* KPI cards */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  {card.icon}
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Live
                </span>

              </div>

              <div className="mt-7">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  {card.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* Workspace section */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]">

        <div className="grid lg:grid-cols-[1fr_360px]">

          <div className="p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  AI workspace
                </p>

                <h3 className="mt-0.5 text-lg font-bold text-slate-900">
                  Work smarter with AI
                </h3>
              </div>

            </div>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500">
              Generate complete travel product content from a simple idea,
              or search your catalogue using natural language. AI handles
              intent while your application keeps business rules and data
              under control.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <a
                href="/ai"
className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:bg-indigo-700 hover:shadow-md"              >
                Generate a product

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>

              <a
                href="/ai/search"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Search with AI
              </a>

            </div>

          </div>

          <div className="relative hidden overflow-hidden bg-slate-950 p-8 lg:block">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  Intelligent tools
                </p>

                <p className="mt-3 text-2xl font-bold leading-tight text-white">
                  From idea to
                  <br />
                  travel product.
                </p>
              </div>

              <div className="mt-10 space-y-3">

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-indigo-200">
                    ✦
                  </span>

                  <span className="text-xs font-medium text-slate-300">
                    AI product generation
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-indigo-200">
                    ⌕
                  </span>

                  <span className="text-xs font-medium text-slate-300">
                    Natural-language search
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard