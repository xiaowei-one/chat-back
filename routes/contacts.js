const router = require('koa-router')()

router.prefix('/contacts')

router.post('/getAllContactsMessage', function (ctx, next) {
  const origin = {
    name: '笑看红尘',
    date: '2-21',
    lastMessage: '时间从不会倒退',
    contactImg: '/static/image/head.png',
  }

  ctx.body = {
    list: new Array(20).fill(origin).map((e) => {
      const ran = Math.ceil(Math.random() * 10)
      return {
        ...e,
        name: '笑看红尘' + ran,
        date: '2-2' + ran,
      }
    })
  }
})

module.exports = router
