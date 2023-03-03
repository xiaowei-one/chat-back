module.exports = async (ctx, next) => {
  ctx.set('ContentType', 'application/json;charset=utf-8');
  ctx.set('Access-Control-Allow-Origin', "*");
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELETE")
  await next()
}