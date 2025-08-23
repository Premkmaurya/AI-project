const mongoose = require('mongoose');


async function connectDb() {
	try{
	  await	mongoose.connect(process.env.MONGO_URI);

		console.log('db connected.')
	}catch(err){
		console.log('db is not connect yet.',err)
	}
}

module.exports = connectDb;