'use strict';

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';
const REQUEST_ID_HEADER = 'x-fc-request-id'

var execSync = require("child_process").execSync;
const OSS = require('ali-oss');

const buffDeltaTime = 30000;
var env = Object.assign({}, process.env);
// env.stdio = 'inherit'
function myExecSync(cmd, t) {
  var start = new Date().getTime(); // 开始时间
  // console.log(JSON.stringify(env, null, 2))
  try{
    var output = execSync(cmd, {
      cwd: process.cwd(),
      env: env,
      shell: "/bin/bash",
      timeout: t
    });
    console.log(output.toString());
  } catch (e) {
    var end = new Date().getTime(); // 结束时间
    var totalTime = end - start;
    if(totalTime >= t - buffDeltaTime){
      // 这个时候，录屏 shell 脚本执行完毕，可以忽视退出的 15 错误
      console.log("******** myExecSync success **********");
    } else {
      console.log(e.toString());
      throw new Error(e.toString());
    }
  }
}

const express = require('express');
const app = express();
app.use(express.raw());

// app.post('/initialize', (req, res) => {
//   // console.log(JSON.stringify(req.headers));
//   var rid = req.headers[REQUEST_ID_HEADER]
//   console.log(`FC Initialize Start RequestId: ${rid}`)
//   // do your things
//   res.send('Hello FunctionCompute, initialize \n');
//   console.log(`FC Initialize End RequestId: ${rid}`)
// });

// invocation
app.post('/invoke', (req, res) => {
  // console.log(JSON.stringify(req.headers));
  var rid = req.headers[REQUEST_ID_HEADER]
  console.log(`FC Invoke Start RequestId: ${rid}`)
  try {
    // get body to do your things
    var bodyStr = req.body.toString();
    console.log(bodyStr);
    var evt = JSON.parse(bodyStr);
    var recordTime = evt["record_time"];
    var videoUrl = evt["video_url"];
    var outputFile = evt["output_file"];
    var cmdStr = "bash record.sh " + recordTime + " " + videoUrl;
    console.log(cmdStr);
    myExecSync(cmdStr, parseInt(recordTime, 10)*1000+buffDeltaTime);
    console.log("start upload video to oss ...");
    const store = new OSS({
      accessKeyId: process.env.OSS_AK_ID,
      accessKeySecret: process.env.OSS_AK_SECRET,
      bucket: process.env.OSS_BUCKET,
      endpoint: process.env.OSS_ENDPOINT ,
    });
    store.put(outputFile, '/var/output/test.mp4').then((result) => {
      console.log("finish to upload video to oss");
      myExecSync("rm -rf /var/output/test.mp4", 5000);
      // myExecSync("ps aux", 5000);
      res.send('OK');
      console.log(`FC Invoke End RequestId: ${rid}`)
    }).catch(function (e) {
      console.log("fail to upload video to oss: " + e.toString())
      res.status(404).send(e.stack || e);
      console.log(`FC Invoke End RequestId: ${rid}`);
    });
  } catch (e) {
    console.error(e.stack || e);
    res.status(404).send(e.stack || e);
    console.log(`FC Invoke End RequestId: ${rid}`)
  }
});

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout
