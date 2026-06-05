import { useState } from 'react'
import Link from 'next/link'
import { prisma } from '../../lib/prisma'
import NoticeCard from '../../components/NoticeCard'
import DeleteModal from '../../components/DeleteModal'

export default function NoticesPage({ notices: initial }) {
  const [notices, setNotices]   = useState(initial)
  const [toDelete, setToDelete] = useState(null)

  const handleDelete = async () => {
    await fetch(`/api/notices/${toDelete}`, { method: 'DELETE' })
    setNotices(prev => prev.filter(n => n.id !== toDelete))
    setToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notice Board</h1>
            <p className="text-gray-500 text-sm mt-1">{notices.length} notice{notices.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/notices/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
          >
            + Add Notice
          </Link>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No notices yet.</p>
            <Link href="/notices/new" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
              Add the first one →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map(notice => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDeleteClick={() => setToDelete(notice.id)}
              />
            ))}
          </div>
        )}
      </div>

      {toDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const notices = await prisma.notice.findMany({
    orderBy: [
      { priority: 'desc' },
      { publishDate: 'desc' }
    ]
  })

  return {
    props: { notices: JSON.parse(JSON.stringify(notices)) }
  }
}