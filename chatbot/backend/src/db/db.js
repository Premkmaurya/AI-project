const mongoose = require('mongoose');

const connectDb = ()=> { 
	mongoose.connect(process.env.MONGODB_URL)
	.then(()=>{
		console.log('db connected successfully.')
	})
	.catch(()=>{
		console.log('db is not connected.')
	})
}

module.exports = connectDb;