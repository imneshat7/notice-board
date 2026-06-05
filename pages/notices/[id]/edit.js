import { prisma } from '../../../lib/prisma'
import NoticeForm from '../../../components/NoticeForm'

export default function EditNoticePage({ notice }) {
  return <NoticeForm initialData={notice} />
}

export async function getServerSideProps({ params }) {
  const notice = await prisma.notice.findUnique({ where: { id: params.id } })

  if (!notice) return { notFound: true }

  return {
    props: { notice: JSON.parse(JSON.stringify(notice)) }
  }
}