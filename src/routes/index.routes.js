import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
	res.json({
		message: 'Welcome to my API with JWT and express'
	})
})

export default router;
