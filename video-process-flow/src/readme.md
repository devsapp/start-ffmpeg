# video-process-flow帮助文档

<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=image-compress&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=image-compress" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=image-compress&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=image-compress" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=image-compress&type=packageDownload">
  </a>
</p>

<description>

> ***图片压缩功能***

</description>

<table>

## 前期准备
使用该项目，推荐您拥有以下的产品权限 / 策略：

| 服务/业务 | 函数计算 |  硬盘挂载 |  VPC |  工作流 | 其它 |     
| --- |  --- |   --- |   --- |   --- |   --- | 
| 权限/策略 | AliyunFCFullAccess |  AliyunNASFullAccess |  AliyunVPCFullAccess |  AliyunFnFFullAccess |AliyunECSFullAccess |  


</table>

<codepre id="codepre">

# 代码 & 预览

- [:smiley_cat: 源代码](https://github.com/devsapp/start-ffmpeg/tree/master/video-process-flow)

        

</codepre>

<deploy>

## 部署 & 体验

<appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=image-compress) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=image-compress)  该应用。 

</appcenter>

- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
    - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://www.serverless-devs.com/fc/config) ；
    - 初始化项目：`s init video-process-flow -d video-process-flow`   
    - 进入项目，并进行项目部署：`cd video-process-flow&& s deploy -y`

</deploy>

<appdetail id="flushContent">

# 应用详情

如下图所示， 假设用户上传一个 mov 格式的视频到 OSS, OSS 触发器自动触发函数执行， 函数调用 FnF 执行，FnF 同时进行 1 种或者多种格式的转码(由 s.yaml 中的 DST_FORMATS 参数控制)， 本示例配置的是同时进行 mp4, flv, avi 格式的转码。

您可以实现如下需求:

- 一个视频文件可以同时被转码成各种格式以及其他各种自定义处理，比如增加水印处理或者在 after-process 更新信息到数据库等。

- 当有多个文件同时上传到 OSS，函数计算会自动伸缩， 并行处理多个文件， 同时每次文件转码成多种格式也是并行。

- 结合 NAS + 视频切片， 可以解决超大视频的转码， 对于每一个视频，先进行切片处理，然后并行转码切片，最后合成，通过设置合理的切片时间，可以大大加速较大视频的转码速度。

![image](https://img.alicdn.com/tfs/TB1A.PSzrj1gK0jSZFuXXcrHpXa-570-613.png)

**视频示例:**

[![Watch the video](https://img.alicdn.com/imgextra/i2/O1CN01XvnqJu1XLS8SAU7LT_!!6000000002907-2-tps-250-155.png)](http://devsapp.functioncompute.com/video/video-process-flow.mp4)

**P.S.**  当您想要仅在一个简单的函数中直接完成视频处理逻辑时，可以参考[音视频转码Job](https://github.com/devsapp/start-ffmpeg/tree/master/transcode)



</appdetail>

<devgroup>

## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
|--- | --- | --- |
| <center>微信公众号：`serverless`</center> | <center>微信小助手：`xiaojiangwh`</center> | <center>钉钉交流群：`33947367`</center> | 

</p>

</devgroup>