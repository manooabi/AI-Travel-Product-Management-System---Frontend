// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import api from '../services/api'

// function Products() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('/products')

//         setProducts(response.data.data)
//       } catch (error) {
//         console.error('Products request failed:', error)

//         setError(
//           error.response?.data?.message ||
//           'Unable to load products.'
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   if (loading) {
//     return <p>Loading products...</p>
//   }

//   if (error) {
//     return <p>{error}</p>
//   }

//   return (
//     <div>
//       <div>
//         <h1>Products</h1>

//         <Link to="/products/create">
//           Create Product
//         </Link>
//       </div>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Destination</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Inventory</th>
//               <th>Status</th>
//               <th>Valid Until</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>
//                   {product.product_name}
//                 </td>

//                 <td>
//                   {product.destination}
//                 </td>

//                 <td>
//                   {product.category}
//                 </td>

//                 <td>
//                   LKR {product.price}
//                 </td>

//                 <td>
//                   {product.inventory_count}
//                 </td>

//                 <td>
//                   {product.status}
//                 </td>

//                 <td>
//                   {new Date(
//                     product.valid_until
//                   ).toLocaleDateString()}
//                 </td>

//                 <td>
//                   <Link
//                     to={`/products/${product.id}`}
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Products() {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await api.get('/products', {
          params: {
            page,
          },
        })

        setProducts(response.data.data)
        setPagination(response.data.meta)
      } catch (error) {
        console.error('Products request failed:', error)

        setError(
          error.response?.data?.message ||
          'Unable to load products.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page])

  const goToPage = (pageNumber) => {
    if (
      pageNumber < 1 ||
      (pagination && pageNumber > pagination.last_page)
    ) {
      return
    }

    setPage(pageNumber)
  }

  const getPageNumbers = () => {
    if (!pagination) {
      return []
    }

    const currentPage = pagination.current_page
    const lastPage = pagination.last_page

    if (lastPage <= 5) {
      return Array.from(
        { length: lastPage },
        (_, index) => index + 1
      )
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', lastPage]
    }

    if (currentPage >= lastPage - 2) {
      return [
        1,
        'ellipsis',
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ]
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis-end',
      lastPage,
    ]
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-8 w-32 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-200" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="space-y-5 p-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="grid min-w-[900px] grid-cols-7 items-center gap-6"
              >
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-4 animate-pulse rounded bg-slate-100" />
                <div className="h-6 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-4 animate-pulse rounded bg-slate-100" />
                <div className="h-6 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-6 animate-pulse rounded-full bg-slate-100" />
                <div className="h-8 animate-pulse rounded-lg bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-red-900">
              Unable to load products
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
              Catalogue
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <span className="text-xs font-medium text-slate-400">
              {pagination?.total ?? products.length} products
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Products
          </h2>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your travel products, pricing, inventory and availability.
          </p>
        </div>

        <Link
          to="/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:bg-indigo-700 hover:shadow-md"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>

          Create Product
        </Link>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-7 w-7"
            >
              <path d="M6 3h9l4 4v14H6z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6" />
              <path d="M9 17h4" />
            </svg>
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-900">
            No products found
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
            Your catalogue is currently empty. Create your first travel
            product to get started.
          </p>

          <Link
            to="/products/create"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Product catalogue
              </h3>

              <p className="mt-0.5 text-xs text-slate-400">
                Currently available products
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-500">
                {pagination?.total ?? products.length} available
              </span>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Product
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Destination
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Category
                  </th>

                  <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Price
                  </th>

                  <th className="px-5 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Inventory
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Valid Until
                  </th>

                  <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((product) => {
                  const isActive = product.status === 'active'

                  return (
                    <tr
                      key={product.id}
                      className="group transition-colors duration-150 hover:bg-slate-50/70"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                            {product.product_name
                              ?.charAt(0)
                              ?.toUpperCase() || 'P'}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[250px] truncate text-sm font-semibold text-slate-900">
                              {product.product_name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Product #{product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4 shrink-0 text-slate-400"
                          >
                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="2.5" />
                          </svg>

                          <span>{product.destination}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[180px] truncate rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-slate-900">
                          LKR{' '}
                          {Number(product.price).toLocaleString(
                            'en-LK'
                          )}
                        </span>
                      </td>

                      {/* Inventory */}
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`
                            inline-flex min-w-10 items-center justify-center rounded-lg px-2.5 py-1 text-xs font-semibold
                            ${
                              product.inventory_count === 0
                                ? 'bg-red-50 text-red-600'
                                : product.inventory_count <= 5
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'bg-slate-100 text-slate-600'
                            }
                          `}
                        >
                          {product.inventory_count}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold
                            ${
                              isActive
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-500'
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5 w-1.5 rounded-full
                              ${
                                isActive
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-400'
                              }
                            `}
                          />

                          {product.status.charAt(0).toUpperCase() +
                            product.status.slice(1)}
                        </span>
                      </td>

                      {/* Valid Until */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4 text-slate-400"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="17"
                              rx="2"
                            />
                            <path d="M16 2v4" />
                            <path d="M8 2v4" />
                            <path d="M3 10h18" />
                          </svg>

                          {new Date(
                            product.valid_until
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition duration-150 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          View

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-400">
                Showing{' '}
                <span className="font-semibold text-slate-600">
                  {pagination.from}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-slate-600">
                  {pagination.to}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-600">
                  {pagination.total}
                </span>{' '}
                products
              </p>

              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <button
                  type="button"
                  disabled={pagination.current_page === 1}
                  onClick={() =>
                    goToPage(pagination.current_page - 1)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>

                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map(
                    (pageNumber, index) => {
                      if (
                        pageNumber === 'ellipsis' ||
                        pageNumber === 'ellipsis-end'
                      ) {
                        return (
                          <span
                            key={`${pageNumber}-${index}`}
                            className="flex h-9 w-8 items-center justify-center text-xs font-medium text-slate-400"
                          >
                            ...
                          </span>
                        )
                      }

                      const isCurrent =
                        pageNumber === pagination.current_page

                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() =>
                            goToPage(pageNumber)
                          }
                          className={`
                            flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold transition
                            ${
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600'
                            }
                          `}
                        >
                          {pageNumber}
                        </button>
                      )
                    }
                  )}
                </div>

                {/* Next */}
                <button
                  type="button"
                  disabled={
                    pagination.current_page ===
                    pagination.last_page
                  }
                  onClick={() =>
                    goToPage(pagination.current_page + 1)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Products