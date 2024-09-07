
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# multimedia-process-flow-dipper 帮助文档

<description>

基于 FC + Serverless Workflow + OSS + NAS + FFmpeg 实现的弹性高可用、并行处理的视频转码服务

</description>

<codeUrl>



</codeUrl>
<preview>



</preview>


## 前期准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| 硬盘挂载 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/nas) [计费文档](https://help.aliyun.com/zh/nas/product-overview/billing) |
| 专有网络 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/vpc) [计费文档](https://help.aliyun.com/zh/vpc/product-overview/billing) |
| 对象存储 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/oss) [计费文档](https://help.aliyun.com/zh/oss/product-overview/billing) |
| 云工作流 |  AliyunFnFFullAccess | [帮助文档](undefined) [计费文档](undefined) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Dipper 应用中心](https://devs.console.aliyun.com/applications/create?template=multimedia-process-flow-dipper) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://devs.console.aliyun.com/applications/create?template=multimedia-process-flow-dipper) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

本案例将FFmpeg包装为一款音视频处理工作流，十分适用于加快视频转码处理速度的场景， 基本原理是对每一个视频，先进行切片处理，然后并行转码切片，最后合成，通过设置合理的切片时间，可以大大加速较大视频的转码速度。

FFmpeg 是音视频处理领域的一款强大工具，它可以被用于格式转换、编解码、录制和流处理等多种音视频相关任务。该技术因其高效性和多功能性，在视频处理、直播流媒体、数字媒体播放和编辑等多个领域中得到广泛应用。截至2023年4月，FFmpeg 在 GitHub 上的 star 数接近30,000，这反映了其在开源社区的受欢迎程度和影响力。被Netflix、YouTube、Facebook等多家知名企业采用，这些公司依赖 FFmpeg 处理其庞大的视频数据，以提供流畅的媒体播放体验、视频内容编辑和优化视频传输效率等服务。

</appdetail>

## 使用流程

<usedetail id="flushContent">

上传一个 mov 格式的视频到对象存储 bucket, OSS 触发器自动触发函数执行，函数调用工作流执行，工作流会同时进行 1 种或者多种格式的转码(由 s.yaml 中的 DST_FORMATS 参数控制)， 本示例默认配置的是同时进行 mp4, flv, avi 格式的转码。

基于该工作流，您可以实现如下需求:

1 一个视频文件可以同时被转码成各种格式以及其他各种自定义处理，比如增加水印处理或者在 after-process 更新信息到数据库等。

2 当有多个文件同时上传到 OSS，函数计算会自动伸缩， 并行处理多个文件， 同时每次文件转码成多种格式也是并行。

3 结合 NAS + 视频切片， 可以解决超大视频的转码， 对于每一个视频，先进行切片处理，然后并行转码切片，最后合成，通过设置合理的切片时间，可以大大加速较大视频的转码速度。

![image](https://img.alicdn.com/tfs/TB1A.PSzrj1gK0jSZFuXXcrHpXa-570-613.png)


**操作视频教程:**

[![Watch the video](https://img.alicdn.com/imgextra/i2/O1CN01XvnqJu1XLS8SAU7LT_!!6000000002907-2-tps-250-155.png)](http://devsapp.functioncompute.com/video/multimedia-process-flow.mp4)

**P.S.** 当您想要仅在一个简单的函数中直接完成视频处理逻辑时，可以参考[音视频转码 Job](https://github.com/devsapp/start-ffmpeg/tree/dipper/transcode/src)

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>


<devgroup>


## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解最新动态，您可以通过以下渠道进行：

<p align="center">  

| <img src="https://img.alicdn.com/imgextra/i2/O1CN010Sk7sv1Xl6WuOb6uU_!!6000000002963-0-tps-666-662.jpg" width="130px" > | <img src="https://img.alicdn.com/imgextra/i2/O1CN01ATrYb8283GOwhAQzZ_!!6000000007876-0-tps-574-560.jpg" width="130px" > | <img src="https://img.alicdn.com/imgextra/i4/O1CN010Vt5aw27VN5rJIguB_!!6000000007802-0-tps-668-630.jpg" width="130px" > |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <center>微信公众号：`serverless`</center>                                                                                         | <center>微信小助手：`xiaojiangwh`</center>                                                                                        | <center>钉钉交流群：`33947367`</center>                                                                                           |
</p>
</devgroup>
