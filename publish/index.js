const http = require('http');
const spawn = require('child_process').spawn;
const createHandler = require('github-webhook-handler');
const conf = require('./config');

var handler = createHandler({ path: '/', secret: conf.secret })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location: ' + err)
  })
}).listen(conf.port)
handler.on('error', function (err) {
  console.error('Error:', err)
})
// 监听到push事件的时候执行我们的自动化脚本
handler.on('push', function (event) {
  if(event.payload.ref === 'refs/heads/master'){
    console.log('执行脚本，自动同步最新程序构建代码');
    runCommand('sh', ['./auto_build.sh'], function (txt) {
      console.log(txt)
    })
  }
})
function runCommand (cmd, args, callback) {
  var child = spawn(cmd, args)
  var response = ''
  child.stdout.on('data', function (buffer) { response += buffer.toString() })
  child.stdout.on('end', function () { callback(response) })
}