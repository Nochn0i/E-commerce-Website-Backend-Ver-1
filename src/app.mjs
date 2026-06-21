import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app
	.use(express.json())
	.use(cors())
	.use(helmet())


export function finalize() {
	app.get('/', (_, res) => {
		console.log('[ app ] Server Was Pinged.')
		return res.status(200).json({
			message	: "Welcome To Express Server",
			health	: "Healthy",
			uptime	: process.uptime(),
		})
	})

	app.use((err, req, res, next) => {
		console.log('[ app ] Error Encountered. Err message:', err.message)
		console.error('[ app ] Full Error. ERR:', err)
		return res.status(err.statusCode || 500).json({
			message		: err.message || 'Internal Server Error',
			orginalError	: process.env.ENV === 'development ' ? err : '',
		})
	})

	console.log('[ app ] App was finalized.')
}

export function loadAPIRouter(apiRouter) {
	app.use('/api', apiRouter)
	console.log('[ app ] API router was loaded')
}

export function startServer(port = process.env.PORT) {
	console.log('[ app ] Starting Server...')
	return app.listen(port, () => console.log(`[ app ] Server running on port:::${port}`))
}

export default app
