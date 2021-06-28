import express from 'express'
import morgan from 'morgan'

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import likeRoutes from './routes/likeRoutes'
import commentRoutes from './routes/commentRoutes'
import followRoutes from './routes/followRoutes'
import errorMiddleware from './middlewares/error'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/post/like', likeRoutes)
app.use('/api/v1/post/comment', commentRoutes)
app.use('/api/v1/user/follow', followRoutes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`)
})