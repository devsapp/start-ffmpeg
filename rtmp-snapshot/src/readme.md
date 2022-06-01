# rtmp-snapshot 帮助文档

<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=rtmp-snapshot&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=rtmp-snapshot" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=rtmp-snapshot&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=rtmp-snapshot" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=rtmp-snapshot&type=packageDownload">
  </a>
</p>

<description>

> ***快速部署直播视频流截图的应用到阿里云函数计算***

</description>

<table>



</table>

<codepre id="codepre">

</codepre>

<deploy>

## 部署 & 体验

<appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=rtmp-snapshot) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=rtmp-snapshot)  该应用。 

</appcenter>

- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
    - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://www.serverless-devs.com/fc/config) ；
    - 初始化项目：`s init rtmp-snapshot -d rtmp-snapshot`   
    - 进入项目，并进行项目部署：`cd rtmp-snapshot && s deploy -y`

</deploy>

<appdetail id="flushContent">

# 应用详情

## 测试

比如在 ecs 部署了一个简单的直播服务器， IP 是 101.200.48.101

```bash
docker run -it -p 1935:1935 -p 8080:80 --rm alfg/nginx-rtmp
```

#### 发起推流

比如测试视频 test.flv 大约为 10 分钟左右的视频

```
ffmpeg -re -i test.flv -vcodec copy -acodec aac -ar 44100 -f flv rtmp://101.200.48.101:1935/stream/example
```

播放器输入这个地址就可以查看了:

rtmp://101.200.48.101:1935/stream/example

![](https://img.alicdn.com/tfs/TB1hwoLpZVl614jSZKPXXaGjpXa-1040-876.png)

比如， 截一张图:

```
ffmpeg -i rtmp://101.200.48.101:1935/stream/example -frames:v 1 1.png
```

持续截图:

```
ffmpeg -i rtmp://101.200.48.101:1935/stream/example -f image2 -r 1 -strftime 1 /tmp/%Y%m%d%H%M%S.jpg
```

#### 调用函数

```bash
$ s invoke -e '{"rtmp_url" : "rtmp://101.200.48.101:1935/stream/example"}'
```

发起推流后， 函数执行是根据推流是否结束， 推流结束了， 然后函数里面的 ffmpeg 截图命令也就结束了， 最后将 /tmp 下面的图片保存回 oss， 该示例是保存回 s.yaml 中定义的 OSS_BUCKET_NAME 这个环境变量。

## 生产需要注意的点

- 建议用户使用大规格实例， 执行时长更长

- 如果有边截图， 边上传回 oss 的需求， 这个代码可以再优化下


</appdetail>

<devgroup>

## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
|--- | --- | --- |
| <center>微信公众号：\`serverless\`</center> | <center>微信小助手：\`xiaojiangwh\`</center> | <center>钉钉交流群：\`33947367\`</center> | 

</p>

</devgroup>