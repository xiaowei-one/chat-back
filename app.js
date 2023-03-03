const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const middleware_head = require('./middlewares/middleware_head')

const index = require('./routes/index')
const users = require('./routes/users')
const contacts = require('./routes/contacts')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

const cors = require('koa2-cors');
app.use(cors({
  origin: function(ctx) {
    return ctx.header.origin
  },
  allowMethods: [ "GET", "POST", "PUT", "DELETE", "OPTIONS" ], 
  credentials: true, 
}));
app.use(middleware_head)

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(contacts.routes(), contacts.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
