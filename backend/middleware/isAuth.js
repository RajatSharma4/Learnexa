import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(400).json({ message: "User does'nt have token" })
        }

        const varifiedToken = await jwt.verify(token, process.env.JWT_SECRET)
        if (!varifiedToken) {
            return res.status(400).json({ message: "User does'nt have varified token" })
        }

        req.userId = varifiedToken.userId
        next()
    } catch (error) {
        return res.status(500).json({ message: `isAuth error ${error}` })
    }
}

