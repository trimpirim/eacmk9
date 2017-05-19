const app = require('./app'),
  http = require('http')

const port = process.env.PORT || 5023

// Fire it up (start our server)
const server = http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port)
})