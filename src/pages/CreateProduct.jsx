import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function CreateProduct() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    product_name: '',
    destination: '',
    category: '',
    description: '',
    highlights: '',
    inclusions: '',
    tags: '',
    price: '',
    inventory_count: '',
    valid_from: '',
    valid_until: '',
    status: 'active',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const payload = {
        ...formData,

        highlights: formData.highlights
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),

        inclusions: formData.inclusions
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),

        tags: formData.tags
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),

        price: Number(formData.price),
        inventory_count: Number(formData.inventory_count),
      }

      await api.post('/products', payload)

      setSuccess('Product created successfully.')

      setTimeout(() => {
        navigate('/products')
      }, 800)
    } catch (error) {
      console.error('Create product failed:', error)

      if (error.response?.status === 422) {
        setError(
          'Please check the form fields and try again.'
        )
      } else {
        setError(
          error.response?.data?.message ||
          'Unable to create product.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'

  const textareaClass =
    'mt-2 block w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'

  const labelClass =
    'text-sm font-semibold text-slate-700'

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Link
              to="/products"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 transition hover:text-indigo-700"
            >
              Products
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-xs font-medium text-slate-400">
              Create
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create Product
          </h2>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Add a new travel product to your catalogue with pricing,
            inventory and availability details.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
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

          Back to Products
        </Link>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
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
              <p className="text-sm font-semibold text-red-900">
                Unable to create product
              </p>

              <p className="mt-0.5 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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
              <p className="text-sm font-semibold text-emerald-900">
                Product created successfully
              </p>

              <p className="mt-0.5 text-xs text-emerald-700">
                Redirecting you to the product catalogue...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Basic information
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-400">
                  Define the core identity and location of your travel product.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="product_name"
                className={labelClass}
              >
                Product Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="product_name"
                name="product_name"
                type="text"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="e.g. Colombo Family Weekend Escape"
                className={inputClass}
                required
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Use a clear, customer-friendly name for the product.
              </p>
            </div>

            {/* Destination */}
            <div>
              <label
                htmlFor="destination"
                className={labelClass}
              >
                Destination
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                <input
                  id="destination"
                  name="destination"
                  type="text"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Colombo, Sri Lanka"
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className={labelClass}
              >
                Category
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Family Holiday"
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* Product Content */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
                  Product content
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-400">
                  Describe the experience and what customers can expect.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className={labelClass}
              >
                Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the travel experience, key details and what makes this product valuable..."
                rows="5"
                className={textareaClass}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Highlights */}
              <div>
                <label
                  htmlFor="highlights"
                  className={labelClass}
                >
                  Highlights
                </label>

                <textarea
                  id="highlights"
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleChange}
                  placeholder="Beach access, Airport pickup, Breakfast"
                  rows="4"
                  className={textareaClass}
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Separate each highlight with a comma.
                </p>
              </div>

              {/* Inclusions */}
              <div>
                <label
                  htmlFor="inclusions"
                  className={labelClass}
                >
                  Inclusions
                </label>

                <textarea
                  id="inclusions"
                  name="inclusions"
                  value={formData.inclusions}
                  onChange={handleChange}
                  placeholder="Hotel stay, Breakfast, Airport transfer"
                  rows="4"
                  className={textareaClass}
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Separate each inclusion with a comma.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className={labelClass}
              >
                Tags
              </label>

              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="family, beach, colombo, weekend"
                className={inputClass}
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Add short searchable keywords separated by commas.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pricing & inventory
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-400">
                  Set the selling price and available inventory.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className={labelClass}
              >
                Price
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  LKR
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`${inputClass} pl-12`}
                  required
                />
              </div>
            </div>

            {/* Inventory */}
            <div>
              <label
                htmlFor="inventory_count"
                className={labelClass}
              >
                Inventory Count
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="inventory_count"
                name="inventory_count"
                type="number"
                min="0"
                value={formData.inventory_count}
                onChange={handleChange}
                placeholder="e.g. 20"
                className={inputClass}
                required
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Number of available bookings or units.
              </p>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
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
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Availability & status
                </h3>

                <p className="mt-0.5 text-xs leading-5 text-slate-400">
                  Control when the product is available and how it appears in the catalogue.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            {/* Valid From */}
            <div>
              <label
                htmlFor="valid_from"
                className={labelClass}
              >
                Valid From
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="valid_from"
                name="valid_from"
                type="datetime-local"
                value={formData.valid_from}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Valid Until */}
            <div>
              <label
                htmlFor="valid_until"
                className={labelClass}
              >
                Valid Until
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="valid_until"
                name="valid_until"
                type="datetime-local"
                value={formData.valid_until}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Status */}
            <div className="sm:col-span-2">
              <label
                htmlFor="status"
                className={labelClass}
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>

              <p className="mt-1.5 text-xs text-slate-400">
                Inactive products remain in the catalogue but are not
                considered active.
              </p>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 pb-4 sm:flex-row sm:justify-end">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600"
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

                Creating...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>

                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct