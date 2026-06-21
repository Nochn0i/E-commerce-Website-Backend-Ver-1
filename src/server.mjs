import 'dotenv/config'
import connect_db from './config/connect_db.mjs'
import __config, { validate_config } from './config/config.mjs'
import { startServer, loadAPIRouter, finalize } from './app.mjs'

(async () => {
	try {
		await validate_config()
		await connect_db(
			__config.MONGOURI,
			__config.DBNAME,
			__config.DBST,
			__config.DBSCT,
		)
		finalize()
		startServer()
	} catch (error) {
		console.log('[ server ] Internal Server Error!')
		console.error('[ server ] Error:', error)
		process.exit(1)
	}
})()
		 
