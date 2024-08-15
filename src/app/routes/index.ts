import express from 'express'
import loginRoute from '../modules/auth/auth.route'
import jobRoute from '../modules/jobs/jobs.route'
import userRoute from '../modules/user/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: loginRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  // {
  //   path: '/jobs',
  //   route: jobRoute,
  // },
  
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
