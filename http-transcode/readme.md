# http-video-transcode 帮助文档

<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=http-video-transcode&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=http-video-transcode" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=http-video-transcode&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=http-video-transcode" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=http-video-transcode&type=packageDownload">
  </a>
</p>

<description>

> ***快速部署音视频转码的应用到阿里云函数计算***

</description>

<table>



</table>

<codepre id="codepre">

</codepre>

<deploy>

## 部署 & 体验

<appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=http-video-transcode) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=http-video-transcode)  该应用。 

</appcenter>

- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
    - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://www.serverless-devs.com/fc/config) ；
    - 初始化项目：`s init http-video-transcode -d http-video-transcode`   
    - 进入项目，并进行项目部署：`cd http-video-transcode && s deploy -y`

</deploy>

<appdetail id="flushContent">

# 应用详情

### 调用函数
  
1. 发起 5 次异步任务函数调用

```bash
$ curl -v -H "X-Fc-Invocation-Type: Async" -H "Content-Type: application/json" -d '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}' -X POST https://http-***.cn-shenzhen.fcapp.run/

$ curl -v -H "X-Fc-Invocation-Type: Async" -H "Content-Type: application/json" -d '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}' -X POST https://http-***.cn-shenzhen.fcapp.run/

$ curl -v -H "X-Fc-Invocation-Type: Async" -H "Content-Type: application/json" -d '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"flv"}' -X POST https://http-***.cn-shenzhen.fcapp.run/

$ curl -v -H "X-Fc-Invocation-Type: Async" -H "Content-Type: application/json" -d '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"avi"}' -X POST https://http-***.cn-shenzhen.fcapp.run/

$ curl -v -H "X-Fc-Invocation-Type: Async" -H "Content-Type: application/json" -d '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"m3u8"}' -X POST https://http-***.cn-shenzhen.fcapp.run/

```

2. 登录[FC 控制台](https://fcnext.console.aliyun.com/)

![](https://img.alicdn.com/imgextra/i4/O1CN01jN5xQl1oUvle8aXFq_!!6000000005229-2-tps-1795-871.png)

可以清晰看出每一次转码任务的执行情况:

- A 视频是什么时候开始转码的, 什么时候转码结束
- B 视频转码任务不太符合预期， 我中途可以点击停止调用
- 通过调用状态过滤和时间窗口过滤，我可以知道现在有多少个任务正在执行， 历史完成情况是怎么样的
- 可以追溯每次转码任务执行日志和触发payload
- 当您的转码函数有异常时候， 会触发 dest-fail 函数的执行，您在这个函数可以添加您自定义的逻辑， 比如报警
- ...

转码完毕后， 您也可以登录 OSS 控制台到指定的输出目录查看转码后的视频。

> 在本地使用该项目时，不仅可以部署，还可以进行更多的操作，例如查看日志，查看指标，进行多种模式的调试等，这些操作详情可以参考[函数计算组件命令文档](https://github.com/devsapp/fc#%E6%96%87%E6%A1%A3%E7%9B%B8%E5%85%B3) ;

## 应用详情

本项目是基于函数计算打造一个 **Serverless架构的弹性高可用音视频处理系统**, 并且拥有以下优势:

### 拥有函数计算和Serverless工作流两个产品的优势

* 无需采购和管理服务器等基础设施，只需专注视频处理业务逻辑的开发，大幅缩短项目交付时间、减少人力成本。

* 提供日志查询、性能监控、报警等功能，可以快速排查故障。

* 以事件驱动的方式触发响应请求。

* 免运维，毫秒级别弹性伸缩，快速实现底层扩容以应对峰值压力，性能优异。

* 成本极具竞争力。


<!-- -->
### 相较于通用的转码处理服务的优点

* 超强自定义，对用户透明，基于FFmpeg或其他音视频处理工具命令快速开发相应的音视频处理逻辑。

* 一键迁移原基于FFmpeg自建的音视频处理服务。

* 弹性更强，可以保证有充足的计算资源为转码服务，例如每周五定期产生几百个4 GB以上的1080P大视频，但是需要几小时内全部处理。

* 音频格式的转换或各种采样率自定义、音频降噪等功能。例如专业音频处理工具AACgain和MP3Gain。

* 可以和Serverless工作流完成更加复杂、自定义的任务编排。例如视频转码完成后，记录转码详情到数据库，同时自动将热度很高的视频预热到CDN上，从而缓解源站压力。

* 更多方式的事件驱动，例如可以选择OSS自动触发，也可以根据业务选择MNS消息触发。

* 在大部分场景下具有很强的成本竞争力。


<!-- -->
### 相比于其他自建服务的优点

* 毫秒级弹性伸缩，弹性能力超强，支持大规模资源调用，可弹性支持几万核的计算力，例如1万节课半个小时内完成转码。

* 只需要专注业务逻辑代码即可，原生自带事件驱动模式，简化开发编程模型，同时可以达到消息，即音视频任务，处理的优先级，可大大提高开发运维效率。

* 函数计算采用3AZ部署，安全性高，计算资源也是多AZ获取，能保证每位使用者需要的算力峰值。

* 开箱即用的监控系统，可以多维度监控函数的执行情况，根据监控快速定位问题，同时给您提供分析能力。

* 在大部分场景下具有很强的成本竞争力，因为函数计算是真正的按量付费，计费粒度在百毫秒，可以理解为CPU的利用率为100%。


通过 Serverless Devs 开发者工具，您只需要几步，就可以体验 Serverless 架构，带来的降本提效的技术红利。


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