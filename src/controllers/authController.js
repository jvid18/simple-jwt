import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken'

const router = Router();

router.post('/signin', async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email })
	if (!user) {
		return res
						.status(404)
			.json({ message: 'No user found.' })
	}

	const passwordIsValid = await user.validatePassword(password);
	if (!passwordIsValid) {
		return res
			.status(401)
			.json({ auth: false, token: null });
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
		expiresIn: 60* 60
	});

	res.json({ auth: true, token });
});

router.post('/signup', async (req, res, next) => {
	const { username, email, password } = req.body;

	const user = new User ({
		username,
		email,
		password,
	});

	user.password = await user.encryptPassword(password);
	await user.save();

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
		expiresIn: 60 * 60,
	});

	res.json({ auth: true, token });
});

router.get('/me', verifyToken, async (req, res, next) => {
	const user = await User.findById(req.userId, { password: 0 });
	if (!user) {
		res
			.status(404)
			.json({ message: 'No user found.' })
	}

	res.json(user);
});

export default router;
