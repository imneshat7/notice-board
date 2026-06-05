import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    if (req.method === 'PUT') {
      const { title, body, category, priority, publishDate } = req.body

      const errors = {}
      if (!title?.trim())       errors.title = 'Title is required'
      if (!body?.trim())        errors.body = 'Body is required'
      if (!category?.trim())    errors.category = 'Category is required'
      if (!publishDate)         errors.publishDate = 'Date is required'
      else if (isNaN(new Date(publishDate))) errors.publishDate = 'Date is invalid'
      if (!['URGENT', 'NORMAL'].includes(priority)) {
        errors.priority = 'Invalid priority'
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category.trim(),
          priority,
          publishDate: new Date(publishDate)
        }
      })
      return res.status(200).json(notice)
    }

    if (req.method === 'DELETE') {
      await prisma.notice.delete({ where: { id } })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}