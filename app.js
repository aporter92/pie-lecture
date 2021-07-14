const Express = require("express")
//Imports Express dependency into the application
const app = Express()
// Top level function allowing access to all of its methods
const dbConnection = require("./db")
const controllers = require("./controllers")

dbConnection.authenticate()
.then(()=> dbConnection.sync())
//.sync() syncs models or schemas to database
.then(() => {
    app.listen(3000, () => {
        console.group(`[server] is running on 3000`)
    })
})
.catch((err) => {
    console.log(`[server] crashed ${err}`)
})

app.use(Express.json())
app.use("/pies", controllers.piecontroller)
app.use("/user", controllers.usercontroller)

