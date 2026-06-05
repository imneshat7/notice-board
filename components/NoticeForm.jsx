import { useState } from 'react'
import { useRouter } from 'next/router'

const CATEGORIES = ['Exam', 'Event', 'General']

export default function NoticeForm({ initialData = {} }) {
  const router = useRouter()
  const isEdit = !!initialData.id

  const [form, setForm] = useState({
    title:       initialData.title || '',
    body:        initialData.body || '',
    category:    initialData.category || '',
    priority:    initialData.priority || 'NORMAL',
    publishDate: initialData.publishDate
      ? new Date(initialData.publishDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})

    const url    = isEdit ? `/api/notices/${initialData.id}` : '/api/notices'
    const method = isEdit ? 'PUT' : 'POST'

    const res  = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()

    if (!res.ok) {
      setErrors(data.errors || { general: 'Something went wrong.' })
      setSubmitting(false)
      return
    }

    router.push('/notices')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEdit ? 'Edit Notice' : 'Add Notice'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {errors.general && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
              {errors.general}
            </p>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              name="title" value={form.title} onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Notice title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
            <textarea
              name="body" value={form.body} onChange={handleChange} rows={4}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.body ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="Notice content..."
            />
            {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category" value={form.category} onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-400' : 'border-gray-300'}`}
              >
                <option value="">Select...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
              <select
                name="priority" value={form.priority} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date *</label>
            <input
              type="date" name="publishDate" value={form.publishDate} onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.publishDate ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.publishDate && <p className="text-red-500 text-xs mt-1">{errors.publishDate}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button" onClick={() => router.push('/notices')}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={submitting}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}