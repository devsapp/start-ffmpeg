'use strict';

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';
const REQUEST_ID_HEADER = 'x-fc-request-id'
const ACCESS_KEY_ID = 'x-fc-access-key-id'
const ACCESS_KEY_SECRET = 'x-fc-access-key-secret'
const SECURITY_TOKEN = 'x-fc-security-token'

var execSync = require("child_process").execSync;
const OSS = require('ali-oss');
const express = require('express');
const app = express();
app.use(express.json())

// invocation
app.post('/', (req, res) => {
  // console.log(JSON.stringify(req.headers));
  var rid = req.headers[REQUEST_ID_HEADER]
  console.log(`FC Invoke Start RequestId: ${rid}`)
  try {
    // Prior to get recording parameters from request body to do your things
    console.log(JSON.stringify(req.body));
    var recordParams = req.body
    // Make video_url parameter as the inidcator
    if (!recordParams["video_url"]) {
      console.log("Miss mandotary video recording parameters in request body, try to get the parameters from query")
      // Fallback: Try to get recording parameters from query to do your things
      console.log(JSON.stringify(req.query));
      recordParams = req.query
    }

    // Compatible with old event mode
    var evt = recordParams
    if (!evt["video_url"]) {
      res.status(400).send("Miss mandotary video recording parameters");
      console.log(`FC Invoke End RequestId: ${rid}`)
      return
    }
    var recordTime = evt["record_time"];
    var videoUrl = evt["video_url"];
    var outputFile = evt["output_file"];
    var width = evt["width"];
    var height = evt["height"];
    var scale_factor = evt["scale"] || 1;
    var frame_rate = 30;
    if (evt["frame_rate"] != null) {
      frame_rate = evt["frame_rate"]
    }
    var bit_rate = "1500k"
    if (evt["bit_rate"] != null) {
      bit_rate = evt["bit_rate"]
    }
    var output_stream = ""
    if (evt["output_stream"] != null) {
      output_stream = evt["output_stream"];
    }

    var cmdStr = `/recorder/record.sh ${recordTime} '${videoUrl}' ${width}x${height}x24 ${width},${height} ${width}x${height} ${scale_factor} ${frame_rate} ${bit_rate} ${output_stream}`;
    console.log(`cmd is ${cmdStr} \n`);
    execSync(cmdStr, { stdio: 'inherit', shell: "/bin/bash" });
    console.log("start upload video to oss ...");
    const store = new OSS({
      accessKeyId: req.headers[ACCESS_KEY_ID],
      accessKeySecret: req.headers[ACCESS_KEY_SECRET],
      stsToken: req.headers[SECURITY_TOKEN],
      bucket: process.env.OSS_BUCKET,
      endpoint: process.env.OSS_ENDPOINT,
    });
    store.put(outputFile, '/var/output/test.mp4').then((result) => {
      console.log("finish to upload video to oss");
      execSync("rm -rf /var/output/test.mp4", { stdio: 'inherit' });
      res.send('OK');
      console.log(`FC Invoke End RequestId: ${rid}`)
    }).catch(function (e) {
      res.status(404).send(e.stack || e);
      console.log(`FC Invoke End RequestId: ${rid}, Error: Unhandled function error`);
    });
  } catch (e) {
    res.status(404).send(e.stack || e);
    console.log(`FC Invoke End RequestId: ${rid}, Error: Unhandled function error`)
  }
});

// TODO: write a common recording method
function recording(recordParams, callback) {

}

// TODO: write a common uploading method
function upload(uploadParams, callback) {

}

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout
