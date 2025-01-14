'use strict';

const apiClient = require('@alicloud/openapi-client');
const FC20230330 = require('@alicloud/fc20230330');

exports.handler = (event, context, callback) => {
  const eventObj = JSON.parse(event);
  console.log(`receive event: ${JSON.stringify(eventObj)}`);

  let body = '';
  // get http request body
  if ("body" in eventObj) {
    body = eventObj.body;
    if (eventObj.isBase64Encoded) {
      body = Buffer.from(body, 'base64').toString('utf-8');
    }
  }
  console.log(`receive http body: ${body}`);
  const bodyObj = JSON.parse(body);
  console.log(`receive http bodyObj: ${JSON.stringify(bodyObj)}`);
  const invocationId = bodyObj['invocationId'];
  console.log(`receive invocationId: ${invocationId}`);
  
  const config = new apiClient.Config({
    accessKeyId: context.credentials.accessKeyId,
    accessKeySecret: context.credentials.accessKeySecret,
    securityToken: context.credentials.securityToken,
    endpoint: `${context.accountId}.${context.region }.fc.aliyuncs.com`
  });

  let client = new FC20230330.default(config);
  let stopAsyncTaskRequest = new FC20230330.StopAsyncTaskRequest({});
  const recorder = process.env.RECORDER_FUNCTION_NAME
  client.stopAsyncTask(recorder,invocationId, stopAsyncTaskRequest).then(function (res) {
    console.log(res);
    callback(null, {
      'statusCode': 200,
      'body': res
    });
  }).catch(function (err) {
    console.error(err);
    callback(null, {
      'statusCode': 500,
      'body': err.message
    });
  });  
}
