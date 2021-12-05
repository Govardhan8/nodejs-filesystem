import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})

//Initial check up
app.get('/', function (req, res) {
	res.send({
		message: 'App is up and running!!',
	})
})

app.post('/createfile', (request, response) => {
	const date = getDateTime()
	fs.writeFile(`./textfiles/${date}.txt`, Date(), () => {
		response.send(`${date}.txt is created`)
	})
})

app.get('/allfiles', (request, response) => {
	const filenames = fs.readdirSync('./textfiles/')
	response.send(filenames)
})

const getDateTime = () => {
	const currentdate = new Date()
	const datetime = `${currentdate.getDate()}${currentdate.getMonth()}${currentdate.getFullYear()}-${currentdate.getHours()}${currentdate.getMinutes()}${currentdate.getSeconds()}`
	return datetime
}
