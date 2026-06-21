import mongoose from 'mongoose'

mongoose.connection
	.on('connected', () => console.log('[ mongodb ] Connected To MongoDB successfully. HOST:', mongoose.connection.host))
	.on('error', (error) => console.log('[ mongodb ] Error Connecting To MongoDB. Error: ', error))

export default async (uri, name, serverTimeout, socketTimeout) => await mongoose.connect(uri, {
	dbName: name,
	serverSelectionTimeoutMS: serverTimeout,
	socketTimeoutMS: socketTimeout
})
