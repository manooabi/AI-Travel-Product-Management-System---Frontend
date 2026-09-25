
import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function AISearch() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query.')
      return
    }

    setError('')
    setProducts([])
    setLoading(true)

    try {
      const response = await api.post('/ai/search', {
        query: query.trim(),
      })

      setProducts(response.data.data || [])
    } catch (error) {
      console.error('AI search failed:', error)

      setError(
        error.response?.data?.message ||
        'Unable to process the search.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleExampleSearch = (example) => {
    setQuery(example)
    setError('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleSearch()
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-3 w-3"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
              AI Workspace
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AI Product Search
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Find travel products using natural language. Describe what
            you are looking for and let AI translate your request into
            database filters.
          </p>
        </div>

        <Link
          to="/ai"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3 1.7z" />
          </svg>

          Generate Product
        </Link>
      </div>

      {/* Search Workspace */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50/70 via-white to-white px-5 py-6 sm:px-7 sm:py-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
              What are you looking for?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Search naturally instead of building filters manually.
              AI will interpret your request and find matching products.
            </p>

            {/* Search Input */}
            <div className="mt-6">
              <div
                className={`flex flex-col gap-2 rounded-2xl border bg-white p-2 shadow-sm transition focus-within:ring-4 sm:flex-row ${
                  error
                    ? 'border-red-200 focus-within:border-red-300 focus-within:ring-red-50'
                    : 'border-slate-200 focus-within:border-indigo-300 focus-within:ring-indigo-50'
                }`}
              >
                <div className="relative flex-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16l5 5" />
                  </svg>

                  <input
                    id="query"
                    type="text"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      if (error) {
                        setError('')
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Try: Show active family packages in Colombo"
                    className="block w-full rounded-xl border-0 bg-transparent px-4 py-3.5 pl-11 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    disabled={loading}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="opacity-25"
                        />

                        <path
                          d="M21 12a9 9 0 0 1-9 9"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>

                      Searching...
                    </>
                  ) : (
                    <>
                      Search

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>

                  <p className="text-xs font-medium leading-5 text-red-700">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="mt-5">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Try an example
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Show active family packages',
                  'Products below LKR 10,000',
                  'Family packages in Colombo',
                  'Show airport transfer services',
                ].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => handleExampleSearch(example)}
                    disabled={loading}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Explanation */}
        <div className="grid border-t border-slate-100 sm:grid-cols-3">
          <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <span className="text-xs font-bold">01</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Describe
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Tell AI what kind of product you need.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <span className="text-xs font-bold">02</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Interpret
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  AI converts your request into structured filters.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <span className="text-xs font-bold">03</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Find
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Laravel applies the filters against your products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
              <svg
                className="h-4 w-4 animate-spin text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-25"
                />

                <path
                  d="M21 12a9 9 0 0 1-9 9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Searching your catalogue
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                AI is interpreting your request and finding matching products.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {!loading && products.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                Results
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                Matching products
              </h2>
            </div>

            <p className="text-xs text-slate-500">
              {products.length}{' '}
              {products.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-indigo-600">
                        {product.category}
                      </p>

                      <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-6 text-slate-900 transition group-hover:text-indigo-700">
                        {product.product_name}
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        product.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  {/* Destination */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z" />
                        <circle cx="12" cy="9" r="2.3" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Destination
                      </p>

                      <p className="mt-0.5 text-sm font-medium text-slate-700">
                        {product.destination}
                      </p>
                    </div>
                  </div>

                  {/* Price / Inventory */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        LKR {Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Inventory
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {product.inventory_count}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-medium text-slate-400">
                      View product details
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading &&
        !error &&
        query &&
        products.length === 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-900">
              No matching products
            </h2>

            <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find any products matching your request.
              Try changing the destination, category or price range.
            </p>

            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              Clear search
            </button>
          </section>
        )}

      {/* Initial State */}
      {!query && !loading && !error && products.length === 0 && (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-700">
            Start with a natural-language request
          </p>

          <p className="mx-auto mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
            For example, ask for active family packages in Colombo or
            products below a specific price.
          </p>
        </section>
      )}
    </div>
  )
}

export default AISearch

