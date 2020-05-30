const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const User = require('./models/user')
const app = express()

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5ed2a28692cefb2b14511be4')
        req.user = user
        next()
    } catch(e) {
        console.log(e)
    }
    
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const dbUrl = `mongodb://putninv:284516Mnb@cluster0-shard-00-00-xdylf.mongodb.net:27017,cluster0-shard-00-01-xdylf.mongodb.net:27017,cluster0-shard-00-02-xdylf.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
        Cop`
        await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
        const candidate =await User.findOne()

        if(!candidate) {
            const user = new User({
                email: 'def_user@gmail.com',
                name: 'Piter',
                cart: {items: []}
            })
            await user.save()
        }
    } catch(e) {
        console.log(e)
    }
    
}

start()



