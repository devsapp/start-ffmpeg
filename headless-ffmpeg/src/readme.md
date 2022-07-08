# headless-ffmpeg 帮助文档

<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=headless-ffmpeg&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=headless-ffmpeg" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=headless-ffmpeg&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=headless-ffmpeg" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=headless-ffmpeg&type=packageDownload">
  </a>
</p>

<description>

> ***快速部署一个全景录制的应用到阿里云函数计算***

</description>

<table>

</table>

<codepre id="codepre">

</codepre>

<deploy>

## 部署 & 体验

<appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=headless-ffmpeg) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=headless-ffmpeg)  该应用。 

</appcenter>

- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
    - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://www.serverless-devs.com/fc/config) ；
    - 初始化项目：`s init headless-ffmpeg -d headless-ffmpeg`   
    - 进入项目，并进行项目部署：`cd headless-ffmpeg && s deploy -y`

</deploy>

<appdetail id="flushContent">

# 应用详情

安装好 s 工具后，将 s.yaml 中镜像名字和环境变量修改：

![](https://img.alicdn.com/imgextra/i4/O1CN01kcXBSD1xbe8ktNtld_!!6000000006462-2-tps-1806-454.png)

然后:

```bash
$ s build --use-docker --dockerfile ./code/Dockerfile
$ s deploy --use-local -y

# 测试调用
$ s invoke -e '{"record_time":"35","video_url":"http://devsapp.functioncompute.com/video/a.mp4","output_file":"record/test.mp4"}'
```

调用成功后， 会在对应的 bucket 下， 产生 record/test.mp4 这个 35 秒的视频。

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