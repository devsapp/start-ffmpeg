#  阿里云 FFmpeg 音视频处理主题案例

> 快速部署和体验Serverless架构下的FFmpeg 音视频处理主题项目

- [体验前准备](#体验前准备)
- [代码与预览](#代码与预览)
- [快速部署和体验](#快速部署和体验)
    - [在线快速体验](#在线快速体验)
    - [在本地部署体验](#在本地部署体验)
- [应用详情](#应用详情)
    - [方案成本优势](#方案成本优势)
    - [函数使用详情](#函数使用详情)

## 体验前准备

该应用案例，需要您开通[阿里云函数计算](https://fcnext.console.aliyun.com/) 产品；并建议您当前的账号有权限存在`FCDefaultRole`。

## 代码与预览

- [:octocat: 源代码](https://github.com/devsapp/start-ffmpeg/tree/master/ffmpeg-app/src)
- [:earth_africa: 效果预览](https://images.devsapp.cn/application/ffmpeg-app/fc-oss-ffmpeg.gif)

## 快速部署和体验
### 在线快速体验

- 通过阿里云 **Serverless 应用中心**： 可以点击 [【🚀 部署】](https://fcnext.console.aliyun.com/applications/create?template=ffmpeg-app) ，按照引导填入参数，快速进行部署和体验。

### 在本地部署体验

1. 下载安装 Serverless Devs：`npm install @serverless-devs/s` 
    > 详细文档可以参考 [Serverless Devs 安装文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/install.md)
2. 配置密钥信息：`s config add`
    > 详细文档可以参考 [阿里云密钥配置文档](https://github.com/devsapp/fc/blob/main/docs/zh/config.md)
3. 初始化项目：`s init ffmpeg-app -d ffmpeg-app`
4. 进入项目并部署：`cd ffmpeg-app && s deploy`
  - 部署全部：`s deploy`
  - 部署单个功能：`s <projectName> deploy`，单个功能对应：
    - AudioConvert: 音频格式转换器
    - GetMediaMeta: 获取音视频 meta
    - GetDuration: 获取音视频时长
    - VideoGif: 功能强大的 video 提取为 gif 函数
    - GetSprites: 功能强大雪碧图制作函数
    - VideoWatermark: 功能强大的视频添加水印功能

> 在本地使用该项目时，不仅可以部署，还可以进行更多的操作，例如查看日志，查看指标，进行多种模式的调试等，这些操作详情可以参考[函数计算组件命令文档](https://github.com/devsapp/fc#%E6%96%87%E6%A1%A3%E7%9B%B8%E5%85%B3) ;

## 应用详情

本应用实现的是: 基于函数计算 FC + FFmpeg + OSS 实现 Serverless 架构的弹性高可用的高度自定义音视频处理主题
本项目中只是展现了这 6 个示例， FC + FFmpeg 可以实现对 OSS 上的音视频进行任意的自定义处理。

### 方案成本优势

实验对象：

- 视频是 89s 的 mov 标清短视频: [480P.mov](https://images.devsapp.cn/application/ffmpeg-app/480P.mov)

- 音频为 89s 的 mp3 音频: [480P.mp3](https://images.devsapp.cn/application/ffmpeg-app/480P.mp3)

| 函数            | 内存规格 | 执行时间 | 一次计费(元) | 备注                                                  |
| --------------- | -------- | -------- | ------------ | ----------------------------------------------------- |
| get_meta        | 128M     | <100ms   | 0.0000013885 | 获取音视频元信息                                      |
| get_duration    | 128M     | <200ms   | 0.000002777  | 获取音视频时长                                        |
| audio_convert   | 128M     | <400ms   | 0.000005554  | 音频转换， 比如 mp3 转 wav                            |
| get_sprites     | 256M     | <3200ms  | 0.000088864  | 雪碧图生成，比如每 10 秒截图一次， 生成 3\*3 的雪碧图 |
| video_gif       | 128M     | <1000ms  | 0.000013885  | 生成 GIF, 比如截取 30-32 秒的视频生成 GIF             |
| video_watermark | 256M     | <4100ms  | 0.000113857  | 打水印，比如 png 水印                                 |

函数计算每月有很大的免费额度：

- 调用次数：每月前 100 万次函数调用免费。

- 执行时间：每月前 400000(CU-秒) 费用免费。

详情：[函数计算计费](https://help.aliyun.com/document_detail/54301.html)


### 函数使用详情

<a name="get_media_meta"></a>

## get_media_meta 获取音视频 meta

函数 get_get_media_meta 以 json 格式返回音视频的完整 meta 信息, 音视频大小不限

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mov"
}
```

**response:**

```json
{
   "format": {
      "bit_rate": "488281",
      "duration": "179.955000",
      "filename": "http://fc-hz-demo.oss-cn-hangzhou-internal.aliyuncs.com/a.mov",
      "format_long_name": "QuickTime / MOV",
      "format_name": "mov,mp4,m4a,3gp,3g2,mj2",
      ...
   },
   "streams": []
   ...
}
```

**S 工具调用示例:**

```bash
$ s GetMediaMeta invoke -e '{"bucket_name": "test-bucket","object_key": "a.mp4"}'
```

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "GetMediaMeta", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp4"
})).data

print(resp)

```

<a name="get_duration"></a>

## get_duration 获取音视频时长

音视频大小不限, 相对于 get_media_meta 这个函数更加简化，单纯返回音视频的时间长度

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mp4"
}
```

**response:**

`20.45`

**S 工具调用示例:**

```bash
$ s GetDuration invoke -e '{"bucket_name": "test-bucket","object_key": "a.mp4"}'
```

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "GetDuration", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp4"
})).data

print(resp)

```

<a name="get_sprites"></a>

## get_sprites 功能强大雪碧图制作函数

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mp4",
  "output_dir": "output/",
  "tile": "3*4",
  "start": 0,
  "duration": 2,
  "itsoffset": 0,
  "scale": "-1:-1",
  "interval": 5,
  "padding": 1,
  "color": "black",
  "dst_type": "jpg"
}
```

- tile: 必填， 雪碧图的 rows \* cols
- start: 可选， 默认是为 0
- duration: 可选，表示基于 start 之后的多长时间的视频内进行截图，

  > 比如 start 为 10， duration 为 20，表示基于视频的 10s-30s 内进行截图

- interval: 可选，每隔多少秒截图一次， 默认为 1
- scale: 可选，截图的大小, 默认为 -1:-1， 默认为原视频大小, 320:240, iw/2:ih/2
- itsoffset: 可选，默认为 0, delay 多少秒，配合 start、interval 使用

  - 假设 start 为 0， interval 为 10，itsoffset 为 0， 那么截图的秒数为 5， 15， 25 ...

  - 假设 start 为 0， interval 为 10，itsoffset 为 1， 那么截图的秒数为 4， 14， 24 ...

  - 假设 start 为 0， interval 为 10，itsoffset 为 4.999(不要写成 5，不然会丢失 0 秒的那一帧图)， 那么截图的秒数为 0， 10， 20 ...

  - 假设 start 为 0， interval 为 10，itsoffset 为 -1， 那么截图的秒数为 6， 16，26 ...

- padding: 可选，图片之间的间隔, 默认为 0
- color: 可选，雪碧图背景颜色，默认黑色， https://ffmpeg.org/ffmpeg-utils.html#color-syntax
- dst_type: 可选，生成的雪碧图图片格式，默认为 jpg，主要为 jpg 或者 png，[image2](https://ffmpeg.org/ffmpeg-all.html#image2-1)

**response:**

`ok`

生成 1 张或者多张雪碧图保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中，假设截图的数量小于等于 tile 指定的 rows \* cols， 生成一张雪碧图， 否则生成多张雪碧图

**S 工具调用示例:**

```bash
$ s GetSprites invoke -e '{"bucket_name": "qd-style2paints","object_key": "video/480P.mp4", "output_dir" : "output/", "tile": "3*4"}'
```

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "GetSprites", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp4",
    "output_dir" : "output/"
})).data

print(resp)

```

<a name="video_watermark"></a>

## video_watermark 功能强大的视频添加水印功能

实现对视频添加 文字水印、 静态图片水印和动态 gif 水印

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mp4",
  "output_dir": "output/",
  "vf_args": "drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello函数计算':x=100:y=50:fontsize=24:fontcolor=red",
  "filter_complex_args": "overlay=0:0:1"
}
```

其中优先级: filter_complex_args > vf_args，即有 filter_complex_args 参数的时候，忽视 vf_args 参数

**vf_args:**

- 文字水印

  vf_args = "drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello 函数计算':x=50:y=50:fontsize=24:fontcolor=red:shadowy=1"

- 图片水印, 静态图片

  vf_args = "movie=/code/logo.png[watermark];[in][watermark]overlay=10:10[out]"

**filter_complex_args:**

- 图片水印, 动态图片 gif

  filter_complex_args = "overlay=0:0:1"

**response:**

`ok`

生成具有水印的视频，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中

**S 工具调用示例:**

```bash
$ s VideoWatermark invoke -e '{"bucket_name": "test-bucket","object_key": "a.mp4", "output_dir" : "output/", "vf_args" : "drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello函数计算':x=100:y=50:fontsize=24:fontcolor=red"}'
```

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "VideoWatermark", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp4",
     "output_dir" : "output/",
    "vf_args" : "drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello函数计算':x=100:y=50:fontsize=24:fontcolor=red"
})).data

print(resp)

```

<a name="video_gif"></a>

## video_gif 功能强大的 video 提取为 gif 函数

- video 转为 gif

- 支持某段时间内视频转为 gif

- 支持从某段时间开始后的指定帧数转为 gif

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mp4",
  "output_dir": "output/",
  "vframes": 20,
  "start": 0,
  "duration": 2
}
```

- start 可选， 默认是为 0

- vframes 和 duration 可选， 当同时填写的时候， 以 duration 为准，当都没有填写的时候， 默认整个视频转为 gif

**response:**

`ok`

生成 gif 图片，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中

**S 工具调用示例:**

```bash
$ s VideoGif invoke -e '{"bucket_name": "test-bucket","object_key": "a.mp4", "output_dir" : "output/"}'
```

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "VideoGif", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp4",
    "output_dir" : "output/",
})).data

print(resp)

```

<a name="audio_convert"></a>

## audio_convert: 音频格式转换器

**event format:**

```json
{
  "bucket_name": "test-bucket",
  "object_key": "a.mp3",
  "output_dir": "output/",
  "dst_type": ".wav",
  "ac": 1,
  "ar": 4000
}
```

- ac 可选，声道数

- ar 可选，采样率

**response:**

`ok`

生成目标格式的音频文件，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中

**python sdk 调用函数示例:**

```python
# -*- coding: utf-8 -*-
import fc2
import json

client = fc2.Client(endpoint="http://1123456.cn-hangzhou.fc.aliyuncs.com",accessKeyID="xxxxxxxx",accessKeySecret="yyyyyy")

resp = client.invoke_function("FcOssFFmpeg", "audio_convert", payload=json.dumps(
{
    "bucket_name" : "test-bucket",
    "object_key" : "a.mp3",
    "output_dir" : "output/",
    "dst_type": ".wav",
    "ac": 1,
    "ar": 8000,
})).data

print(resp)

```

-----

> - Serverless Devs 项目：https://www.github.com/serverless-devs/serverless-devs   
> - Serverless Devs 文档：https://www.github.com/serverless-devs/docs   
> - Serverless Devs 钉钉交流群：33947367    