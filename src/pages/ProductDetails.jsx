// import { useEffect, useState } from 'react'
// import {
//   Link,
//   useNavigate,
//   useParams,
// } from 'react-router-dom'
// import api from '../services/api'

// function ProductDetails() {
//   const { id } = useParams()
// const navigate = useNavigate()
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await api.get(`/products/${id}`)

//         setProduct(response.data.data)
//       } catch (error) {
//         console.error('Product request failed:', error)

//         setError(
//           error.response?.data?.message ||
//           'Unable to load product.'
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   const handleDelete = async () => {
//   const confirmed = window.confirm(
//     'Are you sure you want to delete this product?'
//   )

//   if (!confirmed) {
//     return
//   }

//   try {
//     await api.delete(`/products/${id}`)

//     navigate('/products', { replace: true })
//   } catch (error) {
//     console.error('Delete product failed:', error)

//     setError(
//       error.response?.data?.message ||
//       'Unable to delete product.'
//     )
//   }
// }
//   if (loading) {
//     return <p>Loading product...</p>
//   }

//   if (error) {
//     return <p>{error}</p>
//   }

//   return (
//     <div>
//      <div>
//   <Link to="/products">
//     Back to Products
//   </Link>

//   {' | '}

//   <Link to={`/products/${id}/edit`}>
//     Edit Product
//   </Link>

//   {' | '}

//   <button onClick={handleDelete}>
//     Delete Product
//   </button>
// </div>

//       <h1>{product.product_name}</h1>

//       <p>
//         <strong>Destination:</strong>{' '}
//         {product.destination}
//       </p>

//       <p>
//         <strong>Category:</strong>{' '}
//         {product.category}
//       </p>

//       <p>
//         <strong>Description:</strong>{' '}
//         {product.description}
//       </p>

//       <p>
//         <strong>Price:</strong>{' '}
//         LKR {product.price}
//       </p>

//       <p>
//         <strong>Inventory:</strong>{' '}
//         {product.inventory_count}
//       </p>

//       <p>
//         <strong>Status:</strong>{' '}
//         {product.status}
//       </p>

//       <p>
//         <strong>Valid From:</strong>{' '}
//         {new Date(product.valid_from).toLocaleString()}
//       </p>

//       <p>
//         <strong>Valid Until:</strong>{' '}
//         {new Date(product.valid_until).toLocaleString()}
//       </p>

//       <p>
//         <strong>Expired:</strong>{' '}
//         {product.is_expired ? 'Yes' : 'No'}
//       </p>

//       <h2>Highlights</h2>

//       <ul>
//         {product.highlights?.map((highlight, index) => (
//           <li key={index}>
//             {highlight}
//           </li>
//         ))}
//       </ul>

//       <h2>Inclusions</h2>

//       <ul>
//         {product.inclusions?.map((inclusion, index) => (
//           <li key={index}>
//             {inclusion}
//           </li>
//         ))}
//       </ul>

//       <h2>Tags</h2>

//       <ul>
//         {product.tags?.map((tag, index) => (
//           <li key={index}>
//             {tag}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default ProductDetails

import { useEffect, useState } from 'react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import api from '../services/api'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)

        setProduct(response.data.data)
      } catch (error) {
        console.error('Product request failed:', error)

        setError(
          error.response?.data?.message ||
          'Unable to load product.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) {
      return
    }

    try {
      await api.delete(`/products/${id}`)

      navigate('/products', { replace: true })
    } catch (error) {
      console.error('Delete product failed:', error)

      setError(
        error.response?.data?.message ||
        'Unable to delete product.'
      )
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-8 w-72 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="flex gap-2">
            <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-56 animate-pulse rounded-2xl bg-slate-200" />
          </div>

          <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
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
              Unable to load product
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>

            <Link
              to="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 shadow-sm transition hover:bg-red-50"
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

              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isActive = product.status === 'active'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Link
              to="/products"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 transition hover:text-indigo-700"
            >
              Products
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-xs font-medium text-slate-400">
              Product #{product.id}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {product.product_name}
            </h2>

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
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 text-slate-400"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              {product.destination}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span>{product.category}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>

            Back
          </Link>

          <Link
            to={`/products/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>

            Edit Product
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 hover:border-red-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M4 7h16" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M6 7l1 14h10l1-14" />
              <path d="M9 7V4h6v3" />
            </svg>

            Delete
          </button>
        </div>
      </div>

      {/* Product Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Product description
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Overview of the travel experience
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm leading-7 text-slate-600">
                {product.description}
              </p>
            </div>
          </section>

          {/* Highlights & Inclusions */}
          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3 1.7z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Highlights
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Key product features
                  </p>
                </div>
              </div>

              {product.highlights?.length > 0 ? (
                <ul className="space-y-3">
                  {product.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3 w-3"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </span>

                      <span className="leading-6">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  No highlights added.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Inclusions
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    What's included
                  </p>
                </div>
              </div>

              {product.inclusions?.length > 0 ? (
                <ul className="space-y-3">
                  {product.inclusions.map((inclusion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3 w-3"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </span>

                      <span className="leading-6">
                        {inclusion}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  No inclusions added.
                </p>
              )}
            </section>
          </div>

          {/* Tags */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="m20 13-7 7-10-10V3h7z" />
                  <circle cx="7" cy="7" r="1" />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Tags
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Search and classification keywords
                </p>
              </div>
            </div>

            {product.tags?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No tags added.
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Price & Inventory */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-bold text-slate-900">
                Product summary
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Price
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  LKR{' '}
                  {Number(product.price).toLocaleString(
                    'en-LK'
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Inventory
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {product.inventory_count}
                  </p>
                </div>

                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      product.inventory_count === 0
                        ? 'bg-red-50 text-red-600'
                        : product.inventory_count <= 5
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-emerald-50 text-emerald-600'
                    }
                  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path d="M4 7h16v13H4z" />
                    <path d="m4 7 3-4h10l3 4" />
                    <path d="M9 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Availability */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-bold text-slate-900">
                Availability
              </h3>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
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

                  Valid From
                </div>

                <p className="mt-1.5 text-sm font-semibold text-slate-700">
                  {new Date(
                    product.valid_from
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
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

                  Valid Until
                </div>

                <p className="mt-1.5 text-sm font-semibold text-slate-700">
                  {new Date(
                    product.valid_until
                  ).toLocaleString()}
                </p>
              </div>

              <div
                className={`
                  rounded-xl p-3
                  ${
                    product.is_expired
                      ? 'bg-red-50'
                      : 'bg-emerald-50'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      flex h-7 w-7 items-center justify-center rounded-lg
                      ${
                        product.is_expired
                          ? 'bg-red-100 text-red-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }
                    `}
                  >
                    {product.is_expired ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    )}
                  </span>

                  <div>
                    <p
                      className={`
                        text-xs font-bold
                        ${
                          product.is_expired
                            ? 'text-red-800'
                            : 'text-emerald-800'
                        }
                      `}
                    >
                      {product.is_expired
                        ? 'Product expired'
                        : 'Product currently valid'}
                    </p>

                    <p
                      className={`
                        mt-0.5 text-[11px]
                        ${
                          product.is_expired
                            ? 'text-red-600'
                            : 'text-emerald-600'
                        }
                      `}
                    >
                      {product.is_expired
                        ? 'This product is past its validity period.'
                        : 'This product is within its validity period.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Metadata */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product information
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">
                  Product ID
                </span>

                <span className="font-semibold text-slate-600">
                  #{product.id}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">
                  Category
                </span>

                <span className="max-w-[150px] truncate font-semibold text-slate-600">
                  {product.category}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">
                  Status
                </span>

                <span className="font-semibold capitalize text-slate-600">
                  {product.status}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default ProductDetails

