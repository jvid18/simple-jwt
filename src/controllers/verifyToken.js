import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res
			.status(401)
			.json({
				auth: false,
				message: 'No token provided.'
			});
	}

	let decoded;

	try	{
		decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.userId = decoded.id;

		next();
	} catch {
		return res
			.status(401)
			.json({ auth: false, message: 'Invalid token.' });
	}
}

export default verifyToken;
