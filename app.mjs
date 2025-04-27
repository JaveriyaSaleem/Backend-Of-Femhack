import express from "express"
import cors from "cors"
import SignupRouter from "./Router/SignupRouter.js"
import taskRoute from "./Router/taskRoutes.js"
import connectToDb from "./db/db.js"

const app = express()
const port = 5000
import path from "path"
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(
	cors({
		origin: ['http://localhost:5174',
			 'http://localhost:5173',
			'https://femhack-production.up.railway.app/',
			
			],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(express.json())
app.use('/api/signup', SignupRouter)
app.use('/api/task', taskRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
connectToDb();
console.log(connectToDb())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})