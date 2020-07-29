const express = require('express')

const connectDB = require('./config/db')

const app = express()

connectDB()

app.get('/', (req, res) => {
	res.send('Backend working!!!')
})

app.use(express.json({ extended: false }))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`server running at PORT: ${PORT}`)
})
