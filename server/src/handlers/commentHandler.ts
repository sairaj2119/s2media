import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../../prisma'
import createError from 'http-errors'

export const createComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const { body } = req.body
  const postId = parseInt(req.params.postId)
  const userId = req.user.id

  const comment = await prisma.comment.create({
    data: {
      body,
      userId,
      postId,
    },
  })

  console.log(comment)
  return res.json(comment)
}

export const editComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = parseInt(req.params.postId)
  const commentId = parseInt(req.params.commentId)
  const userId = req.user.id
  const { body } = req.body

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  const editedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      body,
    },
  })

  return res.json(editedComment)
}

export const deleteComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = parseInt(req.params.postId)
  const commentId = parseInt(req.params.commentId)
  const userId = req.user.id

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  await prisma.comment.delete({
    where: { id: commentId },
  })

  return res.json({ msg: 'Comment deleted successfully' })
}