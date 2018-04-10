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
  console.log('event.ref--', event.ref);
  if(event.ref === 'refs/heads/master'){
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