require('dotenv').config();
const express = require("express");
const midtransClient = require('midtrans-client');
const checkout = express.Router();

checkout.use((_,__,next)=>{
	console.log(`checkout ${new Date()}`)
	next();
});
checkout.use(express.json());

checkout.post("/pay",(req,res)=>{

	const {
		total_biling,
		first_name,
		last_name,
		email,
		phone,
		item_details
	} = req.body;

	// Create Snap API instance
	let snap = new midtransClient.Snap({
	    // Set to true if you want Production Environment (accept real transaction).
	    isProduction : false,
	    serverKey : process.env.PAYMENT_SERVER_KEY
	});

	let parameter = {
	    "transaction_details": {
	        "order_id": require("crypto").randomBytes(16).toString("hex"),
	        "gross_amount": total_biling
	    },
	    "credit_card":{
	        "secure" : true
	    },
	    "customer_details": {
	        first_name,
	        last_name,
	        email,
	        phone
	    },
	    "item_details": item_details
	};

	// console.log(parameter)

	snap.createTransaction(parameter)
	.then((transaction)=>{
		res.json({...transaction,order_id: parameter.transaction_details.order_id});
	})
	.catch(d => {
		console.log(d);
		res.json({
			message: "failed to checkout"
		})
	});

});

module.exports = {
	v1: {
		checkout
	}
}
