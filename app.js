const express = require("express")
const app = express()
const Joi = require("joi")



app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.get("/", (req,res)=>{
	res.json({
		message:"Welcome Joy Validation"
	})
})



app.post("/register",(req,res)=>{
	try{
		
		const schema=Joi.object({
			username:Joi.string().min(3).max(31).required(),
			email:Joi.string().email().required(),
			password:Joi.string().min(6).max(8).required()
		})
		
		const {error}=schema.validate(req.body,{
			abortEarly:false,
			errors:{
				wrap:{label:""}
			}
		})
		
		if(error){
			const errorList = error.details.map(e=>e.message.split("Tawhid"))
			return res.status(400).json({
				message:"Invalid Input",
				error:errorList
			})
		}
		
		
	const user ={
		username:req.body.username,
		email:req.body.email,
		password:req.body.password
	}
	
	if(user){
		return res.status(200).send(user)
	}
	
	
	
	}
	
	catch(error){
		res.status(400).send(error)
	}
	
})



module.exports=app;