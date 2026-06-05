import Link from 'next/link'

export default function NoticeCard({ notice, onDeleteClick }) {
  const date = new Date(notice.publishDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 flex flex-col gap-3 p-5 ${
      notice.priority?.toUpperCase() === 'URGENT' ? 'border-red-200' : 'border-gray-100'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-900 text-base leading-snug">{notice.title}</h2>
        {notice.priority?.toUpperCase() === 'URGENT' && (
          <span className="shrink-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            URGENT
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{notice.body}</p>

      <div className="flex items-center gap-2 text-xs">
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
          {notice.category}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">{date}</span>
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100 mt-auto">
        <Link
          href={`/notices/${notice.id}/edit`}
          className="flex-1 text-center text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200"
        >
          Edit
        </Link>
        <button
          onClick={onDeleteClick}
          className="flex-1 text-sm font-medium bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  )
}