
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# video-transcode-cap 帮助文档

<description>

快速部署音视频转码的应用到阿里云函数计算

</description>


## 前期准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| 日志服务 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/sls) [计费文档](https://help.aliyun.com/zh/sls/product-overview/billing) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://devs.console.aliyun.com/applications/create?template=video-transcode-cap) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://devs.console.aliyun.com/applications/create?template=video-transcode-cap) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

本案例将FFmpeg包装为一款音视频转码应用, 能够便捷地实现各种格式的音视频转码需求。

FFmpeg 是音视频处理领域的一款强大工具，它可以被用于格式转换、编解码、录制和流处理等多种音视频相关任务。该技术因其高效性和多功能性，在视频处理、直播流媒体、数字媒体播放和编辑等多个领域中得到广泛应用。截至2023年4月，FFmpeg 在 GitHub 上的 star 数接近30,000，这反映了其在开源社区的受欢迎程度和影响力。被Netflix、YouTube、Facebook等多家知名企业采用，这些公司依赖 FFmpeg 处理其庞大的视频数据，以提供流畅的媒体播放体验、视频内容编辑和优化视频传输效率等服务。

使用本案例，云原生应用开发平台将为您一键部署一个“弹性高可用音视频转码Job系统”应用。


**拥有函数计算的Serverless优势:**

* 无需采购和管理服务器等基础设施，只需专注视频处理业务逻辑的开发，大幅缩短项目交付时间、减少人力成本。
* 提供日志查询、性能监控、报警等功能，可以快速排查故障。
* 以事件驱动的方式触发响应请求。
* 免运维，毫秒级别弹性伸缩，快速实现底层扩容以应对峰值压力，性能优异。
* 100% 按量发布

**相较于通用的转码处理SaaS服务的优点:**

* 超强自定义，对用户透明，基于FFmpeg或其他音视频处理工具命令快速开发相应的音视频处理逻辑。
* 一键迁移原基于FFmpeg自建的音视频处理服务。
* 弹性更强，可以保证有充足的计算资源为转码服务，例如每周五定期产生几百个4 GB以上的1080P大视频，但是需要几小时内全部处理。
* 音频格式的转换或各种采样率自定义、音频降噪等功能。例如专业音频处理工具AACgain和MP3Gain。
* 可以和Serverless工作流完成更加复杂、自定义的任务编排。例如视频转码完成后，记录转码详情到数据库，同时自动将热度很高的视频预热到CDN上，从而缓解源站压力。
* 更多方式的事件驱动，例如可以选择OSS自动触发，也可以根据业务选择MNS消息触发。
* 在大部分场景下具有很强的成本竞争力。

**相比于其他自建服务的优点:**

* 毫秒级弹性伸缩，弹性能力超强，支持大规模资源调用，可弹性支持几万核的计算力，例如1万节课半个小时内完成转码。
* 只需要专注业务逻辑代码即可，原生自带事件驱动模式，简化开发编程模型，同时可以达到消息，即音视频任务，处理的优先级，可大大提高开发运维效率。
* 函数计算采用3AZ部署，安全性高，计算资源也是多AZ获取，能保证每位使用者需要的算力峰值。
* 开箱即用的监控系统，可以多维度监控函数的执行情况，根据监控快速定位问题，同时给您提供分析能力。
* 在大部分场景下具有很强的成本竞争力，因为函数计算是真正的按量付费，计费粒度在百毫秒，可以理解为CPU的利用率为100%。

</appdetail>

## 使用流程

<usedetail id="flushContent">

**1. 发起 5 次异步任务函数调用**

* 登录[函数计算控制台](https://fcnext.console.aliyun.com/)，在左侧导航栏，单击**函数**。
* 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 VideoTranscoder(具体看您部署后的函数)。
* 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，选择异步调用，并输入如下示例测试参数，然后单击**确定**。
    ```json
    {
      "bucket": "my-bucket",
      "object": "480P.mp4",
      "output_dir": "a",
      "dst_format": "mov"
    }
    ```
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
    | output_dir  | 必填， 生成的音频在 OSS 存储桶上存储目录      | output/ |
    | dst_format  |  生成的音视频的格式  |  wav |
* 单击**测试函数**，函数执行成功后，查看返回异步任务 request id
    `request id: bf7d7745-886b-42fc-af21-ba87d98e1b1c`

五次调用的测试参数分别是：
```text
{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}
{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"mov"}
{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"flv"}
{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"avi"}
{"bucket":"my-bucket", "object":"480P.mp4", "output_dir":"a", "dst_format":"m3u8"}
```

**2. 登录[FC 控制台](https://fcnext.console.aliyun.com/) 查看异步调用详情**

可以清晰看出每一次转码任务的执行情况:

- 视频是什么时候开始转码的, 什么时候转码结束
- 通过调用状态过滤和时间窗口过滤，我可以知道现在有多少个任务正在执行， 历史完成情况是怎么样的
- 可以追溯每次转码任务执行日志和触发payload
- 当您的转码函数有异常时候， 会触发 dest-fail 函数的执行，您在这个函数可以添加您自定义的逻辑， 比如报警
- ...

转码完毕后， 您也可以登录 OSS 控制台到指定的输出目录查看转码后的视频。

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>
