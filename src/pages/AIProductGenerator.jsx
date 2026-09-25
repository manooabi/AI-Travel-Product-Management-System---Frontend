
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function AIProductGenerator() {
  const navigate = useNavigate()

  const [prompt, setPrompt] = useState('')
  const [generatedProduct, setGeneratedProduct] = useState(null)
  const [formData, setFormData] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(
        'Please describe the travel product you want to generate.'
      )
      return
    }

    setError('')
    setSuccess('')
    setGeneratedProduct(null)
    setLoading(true)

    try {
      const response = await api.post('/ai/products/generate', {
        prompt: prompt.trim(),
      })

      const product = response.data.data

      setGeneratedProduct(product)

      setFormData({
        product_name: product.product_name,
        destination: product.destination,
        category: product.category,
        description: product.description,
        highlights: product.highlights?.join(', ') || '',
        inclusions: product.inclusions?.join(', ') || '',
        tags: product.tags?.join(', ') || '',
        price: '',
        inventory_count: '',
        valid_from: '',
        valid_until: '',
        status: 'active',
      })
    } catch (error) {
      console.error('AI product generation failed:', error)

      setError(
        error.response?.data?.message ||
        'Unable to generate the product.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleExamplePrompt = (example) => {
    setPrompt(example)
    setError('')
  }

  const handleSave = async () => {
    if (!formData) {
      return
    }

    setError('')
    setSuccess('')
    setSaving(true)

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

      setSuccess('Product saved successfully.')

      setTimeout(() => {
        navigate('/products')
      }, 800)
    } catch (error) {
      console.error('Save AI product failed:', error)

      if (error.response?.status === 422) {
        setError(
          'Please complete all required product fields.'
        )
      } else {
        setError(
          error.response?.data?.message ||
          'Unable to save product.'
        )
      }
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'

  const textareaClass =
    'mt-2 block w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'

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
                <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3 1.7z" />
              </svg>
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
              AI Workspace
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AI Product Generator
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Describe a travel product in natural language and let AI
            generate the content for you to review, edit and save.
          </p>
        </div>

        <Link
          to="/ai/search"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l5 5" />
          </svg>

          Search with AI
        </Link>
      </div>

      {/* AI Prompt Section */}
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
                <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3 1.7z" />
              </svg>
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
              What would you like to create?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Describe the destination, experience, duration or services
              you want included. AI will turn your idea into structured
              product content.
            </p>

            {/* Prompt */}
            <div className="mt-6 text-left">
              <label
                htmlFor="prompt"
                className="text-sm font-semibold text-slate-700"
              >
                Product idea
              </label>

              <textarea
                id="prompt"
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value)

                  if (error) {
                    setError('')
                  }
                }}
                placeholder="Example: Create a 3-day family beach holiday package in Bentota with breakfast, airport transfer and beach access."
                rows="5"
                disabled={loading}
                className={`${textareaClass} min-h-32`}
              />

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  Be specific about the type of experience you want.
                </p>

                <p className="shrink-0 text-[11px] font-medium text-slate-400">
                  {prompt.length}/2000
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600 sm:w-auto"
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

                    Generating product...
                  </>
                ) : (
                  <>
                    Generate Product

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3 1.7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Try an example
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Create a 3-day family beach holiday in Bentota with breakfast and airport transfer.',
                  'Create a luxury weekend escape in Colombo for couples with a city tour.',
                  'Create a cultural tour package in Kandy with temple visits and local experiences.',
                ].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => handleExamplePrompt(example)}
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

        {/* Process */}
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
                  Explain the travel experience you want.
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
                  Generate
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  AI creates structured product content.
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
                  Review & Save
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Review the result and add business details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
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
            </div>

            <div>
              <p className="text-sm font-semibold text-red-900">
                Something went wrong
              </p>

              <p className="mt-0.5 text-xs leading-5 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Product saved
              </p>

              <p className="mt-0.5 text-xs leading-5 text-emerald-700">
                {success}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Product */}
      {formData && (
        <section className="space-y-5">
          {/* Review Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                AI Output
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                Review Generated Product
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI has prepared the content below. Review and edit it before saving.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[11px] font-semibold text-emerald-700">
                Generated successfully
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            {/* Main Content */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M6 3h9l4 4v14H6z" />
                        <path d="M14 3v5h5" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Product Content
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Review and refine the AI-generated information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <label
                      htmlFor="product_name"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Product Name
                    </label>

                    <input
                      id="product_name"
                      name="product_name"
                      type="text"
                      value={formData.product_name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="destination"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Destination
                      </label>

                      <input
                        id="destination"
                        name="destination"
                        type="text"
                        value={formData.destination}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Category
                      </label>

                      <input
                        id="category"
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      className={textareaClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="highlights"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Highlights
                    </label>

                    <textarea
                      id="highlights"
                      name="highlights"
                      value={formData.highlights}
                      onChange={handleChange}
                      rows="4"
                      className={textareaClass}
                    />

                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Separate each highlight with a comma.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="inclusions"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Inclusions
                    </label>

                    <textarea
                      id="inclusions"
                      name="inclusions"
                      value={formData.inclusions}
                      onChange={handleChange}
                      rows="4"
                      className={textareaClass}
                    />

                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Separate each inclusion with a comma.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="tags"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Tags
                    </label>

                    <input
                      id="tags"
                      name="tags"
                      type="text"
                      value={formData.tags}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Use short searchable terms separated by commas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path d="M4 7h16" />
                        <path d="M6 7v13h12V7" />
                        <path d="M8 7V4h8v3" />
                        <path d="M9 11h6" />
                        <path d="M9 15h6" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Business Details
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Add the details AI does not generate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Price
                    </label>

                    <div className="relative mt-2">
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
                        placeholder="12500"
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 pl-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inventory_count"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Inventory Count
                    </label>

                    <input
                      id="inventory_count"
                      name="inventory_count"
                      type="number"
                      min="0"
                      value={formData.inventory_count}
                      onChange={handleChange}
                      placeholder="20"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="valid_from"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Valid From
                    </label>

                    <input
                      id="valid_from"
                      name="valid_from"
                      type="datetime-local"
                      value={formData.valid_from}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="valid_until"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Valid Until
                    </label>

                    <input
                      id="valid_until"
                      name="valid_until"
                      type="datetime-local"
                      value={formData.valid_until}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="active">
                        Active
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Card */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                    >
                      <path d="M5 12l4 4L19 6" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Ready to publish?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Review all generated content and business details
                      before adding this product to your catalogue.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600"
                >
                  {saving ? (
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

                      Saving Product...
                    </>
                  ) : (
                    <>
                      Save Product

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
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default AIProductGenerator

