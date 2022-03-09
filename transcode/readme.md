#  阿里云 FFmpeg 视频转码案例

> 快速部署和体验 Serverless 架构下的 FFmpeg 视频转码案例

- [阿里云 FFmpeg 视频转码案例](#阿里云-ffmpeg-视频转码案例)
  - [体验前准备](#体验前准备)
  - [代码](#代码)
  - [快速部署和体验](#快速部署和体验)
    - [在线快速体验](#在线快速体验)
    - [在本地部署体验](#在本地部署体验)
    - [调用函数](#调用函数)
  - [应用详情](#应用详情)
    - [拥有函数计算和Serverless工作流两个产品的优势](#拥有函数计算和serverless工作流两个产品的优势)
    - [相较于通用的转码处理服务的优点](#相较于通用的转码处理服务的优点)
    - [相比于其他自建服务的优点](#相比于其他自建服务的优点)

## 体验前准备

该应用案例，需要您开通[阿里云函数计算](https://fcnext.console.aliyun.com/) 产品；并建议您当前的账号有权限存在`FCDefaultRole`。

## 代码

- [:octocat: 源代码](https://github.com/devsapp/start-ffmpeg/tree/master/transcode/src)

## 快速部署和体验
### 在线快速体验

- 通过阿里云 **Serverless 应用中心**： 可以点击 [【🚀 部署】](https://fcnext.console.aliyun.com/applications/create?template=video-transcode) ，按照引导填入参数，快速进行部署和体验。

### 在本地部署体验

1. 下载安装 Serverless Devs：`npm install @serverless-devs/s` 
    > 详细文档可以参考 [Serverless Devs 安装文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/install.md)
2. 配置密钥信息：`s config add`
    > 详细文档可以参考 [阿里云密钥配置文档](https://github.com/devsapp/fc/blob/main/docs/zh/config.md)
3. 初始化项目：`s init video-transcode -d video-transcode`
4. 进入项目并部署：`cd video-transcode && s deploy`

### 调用函数
  
1. 发起 5 次异步任务函数调用

```bash
$ s VideoTranscoder invoke -e '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}' --invocation-type async   --stateful-async-invocation-id my1-480P-mp4
VideoTranscoder/transcode async invoke success.
request id: bf7d7745-886b-42fc-af21-ba87d98e1b1c

$ s VideoTranscoder invoke -e '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}' --invocation-type async   --stateful-async-invocation-id my2-480P-mp4
VideoTranscoder/transcode async invoke success.
request id: edb06071-ca26-4580-b0af-3959344cf5c3

$ s VideoTranscoder invoke -e '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"flv"}' --invocation-type async   --stateful-async-invocation-id my3-480P-mp4
VideoTranscoder/transcode async invoke success.
request id: 41101e41-3c0a-497a-b63c-35d510aef6fb

$ s VideoTranscoder invoke -e '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"avi"}' --invocation-type async   --stateful-async-invocation-id my4-480P-mp4
VideoTranscoder/transcode async invoke success.
request id: ff48cc04-c61b-4cd3-ae1b-1aaaa1f6c2b2

$ s VideoTranscoder invoke -e '{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"m3u8"}' --invocation-type async   --stateful-async-invocation-id my5-480P-mp4
VideoTranscoder/transcode async invoke success.
request id: d4b02745-420c-4c9e-bc05-75cbdd2d010f

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

-----

> - Serverless Devs 项目：https://www.github.com/serverless-devs/serverless-devs   
> - Serverless Devs 文档：https://www.github.com/serverless-devs/docs   
> - Serverless Devs 钉钉交流群：33947367    