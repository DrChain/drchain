import { Router } from 'express'

import users from './users'
import records from './records'


var router = Router()

router.use(users)
router.use(records)

export default router
