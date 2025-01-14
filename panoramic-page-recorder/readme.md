
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# HttpPanoramicPageRecording-v3 帮助文档

<description>

快速部署一个Http触发的全景web页面录制-高级版应用到阿里云函数计算

</description>


## 资源准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess,AliyunContainerRegistryFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=HttpPanoramicPageRecording-v3) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=HttpPanoramicPageRecording-v3) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

当前市场上复杂的录制需求，如多人参与、界面动态调整、实时音视频捕获、直播编码及流媒体播放，连同辅助功能如电子白板、消息弹幕和视频展示等内容的同步录制，都对传统的录制解决方案构成了挑战。传统方法通过增加额外的录制流并利用信号同步来重现场景，并常伴随着插入SEI时间戳等技术手段来同步各类媒体元素。这不仅对设备的硬件和网络连接提出了更高要求，而且增加了开发难度和成本，由于涉及到后期复杂的内容合成，也不能即时产出录制文件，从而影响业务的快速迭代和发展。 

本方案采取 Chrome 进行页面渲染录制+ffmepg 转码实现全景录制：

Chrome 渲染到虚拟 X-server，并通过 FFmpeg 抓取系统桌⾯，通过启动 xvfb 启动虚拟 X-server，Chrome 进⾏全屏显示渲染到到虚拟 X-server 上，并通过 FFmpeg 抓取系统屏幕以及采集系统声⾳并进⾏编码写⽂件。这种⽅式的适配性⾮常好， 不仅可以录制 Chrome，理论上也可以录制其他的应⽤。缺点是占⽤的内存和 CPU 较多。


</appdetail>

## 架构图

<framework id="flushContent">

 ![](https://img.alicdn.com/imgextra/i2/O1CN01v6nXa41JYMw8pHIqe_!!6000000001040-0-tps-1604-854.jpg)

</framework>

## 部署流程

<usedetail id="flushContent">

部署完毕以后，  您可以获取recorder 函数的 http url， 比如为  `https://xxx.cn-hangzhou.fcapp.run`

### 同步调用

调用直到录制完成，返回调用结果

``` bash
$ curl -H "Content-Type: application/json" -X POST -d '{"record_time":"60","video_url":"https://tv.cctv.com/live/cctv1/","output_file":"record/test.mp4", "width":"1280", "height":"720", "scale": 0.75, "frame_rate":25,"bit_rate":"2000k"}'  https://xxx.cn-hangzhou.fcapp.run
```

### 异步调用

发送录制请求，理解返回，录制任务完成函数自动退出，中间过程可以查询函数运行状态

``` bash
$ curl -v -H "Content-Type: application/json" -H "X-Fc-Invocation-Type: Async"  -X POST -d '{"record_time":"60","video_url":"https://tv.cctv.com/live/cctv1/","output_file":"record/test.mp4", "width":"1280", "height":"720", "scale": 0.75, "frame_rate":25,"bit_rate":"2000k"}'  https://xxx.cn-hangzhou.fcapp.run
```

调用成功后， 会在对应的 bucket 下， 产生 record/test.mp4 大约 60 秒 1280x720 的全景录制视频。

### 调用参数说明

**1.record_time:** 录制时长

**2.video_url:** 录制视频的 url

**3.width:** 录制视频的宽度

**4.height:** 录制视频的高度

**5.scale:** 浏览器缩放比例

**6.output_file:** 最后录制视频保存的 OSS 目录

**7.frame_rate:** 录制视频的帧率(可不传递，默认帧率为30fps)

**8.bit_rate:** 录制视频的码率(可不传递，默认码率为1500k)

**9.output_stream:** 推流地址(可选参数,eg: rtmp://demo.aliyundoc.com/app/stream?xxxx)

其中 scale 是对浏览器进行 75% 的缩放，使视频能录制更多的网页内容

**注意:** 如果您录制的视频存在一些卡顿或者快进， 可能是因为您录制的视频分辨率大并且复杂， 消耗的 CPU 很大， 您可以通过调大函数的规格， 提高 CPU 的能力。

比如上面的示例参数得到下图:

![](https://img.alicdn.com/imgextra/i3/O1CN01fbUSSP1umgrF0cfFr_!!6000000006080-2-tps-3048-1706.png)


###  停止录制任务

您可以获取controller 函数的 http 触发器的 url， 比如为  `https://yyy.cn-hangzhou.fcapp.run`


``` bash
# 其中 xxxx 表示发起异步调用  recorder 任务时候的 task id
$ curl -H "Content-Type: application/json" -X POST -d '{"invocationId":"xxxx"}'  https://yyy.cn-hangzhou.fcapp.run
```


</usedetail>

## 二次开发指南

<development id="flushContent">

### 如何本地调试

直接本地运行， 命令执行完毕后， 会在当前目录生成一个 test.mp4 的视频

```bash
# 直接本地执行docker命令， 会在当前目录生成一个 test.mp4 的视频
$ docker run --rm --entrypoint="" -v $(pwd):/var/output my-panoramic-page-recording   /recorder/record.sh 60 https://tv.cctv.com/live/cctv1 1280x720x24 1280,720 1280x720 1 25 2000k
```

调试

```bash
# 如果有镜像有代码更新, 重新build 镜像
$ docker build -t my-panoramic-page-recording -f ./recorder/Dockerfile ./recorder
# 测试全屏录制核心脚本 record.sh, 执行完毕后， 会在当前目录有一个 test.mp4 的视频
$ docker run --rm --entrypoint="" -v $(pwd):/var/output my-panoramic-page-recording  /recorder/record.sh 60 https://tv.cctv.com/live/cctv1 1280x720x24 1280,720 1280x720 1 25 2000k
```

> 其中 record.sh 的参数意义:
>
> 1. 录制时长
> 2. 视频 url
> 3. $widthx$heightx24
> 4. $width,$height
> 5. $widthx$height
> 6. chrome 浏览器缩放比例
> 7. 帧率
> 8. 码率
> 9. 推流地址


**`server.js`**

custom container http server 逻辑

**`record.sh`**

核心录屏逻辑， 启动 xvfb， 在虚拟 X-server 中使用 `record.js` 中的 puppeteer 启动浏览器， 最后 FFmpeg 完成 X-server 屏幕的视频和音频抓取工作， 生成全屏录制后的视频 


调试完毕， 您可以将镜像 tag 成您的 ACR 镜像， docker push 上去， 然后使用这个新的镜像更新您的 recorder 函数中 customContainerConfig 中的 image 即可。


### 更多
如果您想将生成的视频直接预热的 CDN， 以阿里云 CDN 为例， 只需要在 server.js 上传完 OSS bucket 后的逻辑中增加如下代码：

[PushObjectCache](https://next.api.aliyun.com/api/Cdn/2018-05-10/PushObjectCache?lang=NODEJS&sdkStyle=old&params={})

> Tips 前提需要配置好 CDN 

</development>






