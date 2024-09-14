
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# ffmpeg-app-cap 帮助文档

<description>

基于FFmpeg的音视频处理应用, 包括获取音视频元信息、获取音视频时长、音频转换、雪碧图生成、生成 GIF、打水印等多个模块。

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://devs.console.aliyun.com/applications/create?template=ffmpeg-app-cap) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://devs.console.aliyun.com/applications/create?template=ffmpeg-app-cap) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

本案例将FFmpeg包装为一款音视频处理应用, 能够便捷地提供获取音视频元信息、获取音视频时长、音频转换、雪碧图生成、生成 GIF、打水印等一系列能力。

FFmpeg 是音视频处理领域的一款强大工具，它可以被用于格式转换、编解码、录制和流处理等多种音视频相关任务。该技术因其高效性和多功能性，在视频处理、直播流媒体、数字媒体播放和编辑等多个领域中得到广泛应用。截至2023年4月，FFmpeg 在 GitHub 上的 star 数接近30,000，这反映了其在开源社区的受欢迎程度和影响力。被Netflix、YouTube、Facebook等多家知名企业采用，这些公司依赖 FFmpeg 处理其庞大的视频数据，以提供流畅的媒体播放体验、视频内容编辑和优化视频传输效率等服务。

使用本案例，serverless开发平台将为您一键部署一个”Serverless 架构的弹性高可用的高度自定义音视频处理“应用。 

具有的能力如下：

-  AudioConvert: 音频格式转换器
-  GetMediaMeta: 获取音视频 meta
- GetDuration: 获取音视频时长
-  VideoGif: 功能强大的 video 提取为 gif 函数
- GetSprites: 功能强大雪碧图制作函数
- VideoWatermark: 功能强大的视频添加水印功能

本示例中仅展现了这 6 个示例， FC + FFmpeg 可以实现对 OSS 上的音视频进行任意的自定义处理， 相比音视频 SaaS 类服务，具有十分明显的成本优势。

</appdetail>

## 使用流程

<usedetail id="flushContent">

### get_media_meta 获取音视频 meta

函数 get_media_meta 以 json 格式返回音视频的完整 meta 信息, 音视频大小不限

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 get_media_meta。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
    ```json
    {
      "bucket_name": "test-bucket",
      "object_key": "a.mov"
    }
    ```
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
4. 单击**测试函数**，函数执行成功后，查看返回结果
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

### get_duration 获取音视频时长

音视频大小不限, 相对于 get_media_meta 这个函数更加简化，单纯返回音视频的时间长度

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 get_duration。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
    ```json
    {
      "bucket_name": "test-bucket",
      "object_key": "a.mp4"
    }
    ```
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |

4. 单击**测试函数**，函数执行成功后，查看返回结果

    `20.45`

### get_sprites 功能强大雪碧图制作函数

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 get_sprites。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
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
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
    | output_dir  | 必填， 生成的雪碧图在 OSS 存储桶上存储目录      | output/ |
    | tile  | 必填， 雪碧图的 rows \* cols      |  3*4 |
    | start  | 可选， 默认是为 0     |  0 |
    | duration  | 可选，表示基于 start 之后的多长时间的视频内进行截图; 比如 start 为 10， duration 为 20，表示基于视频的 10s-30s 内进行截图   |  10 |
    | itsoffset  | 可选，默认为 0, delay 多少秒，配合 start、interval 使用 <br/>  1. 假设 start 为 0， interval 为 10，itsoffset 为 0， 那么截图的秒数为 5， 15， 25 ... <br/> 2.假设 start 为 0， interval 为 10，itsoffset 为 1， 那么截图的秒数为 4， 14， 24 ... <br/> 3. 假设 start 为 0， interval 为 10，itsoffset 为 4.999(不要写成 5，不然会丢失 0 秒的那一帧图)， 那么截图的秒数为 0， 10， 20 ...  <br/> 4. 假设 start 为 0， interval 为 10，itsoffset 为 -1， 那么截图的秒数为 6， 16，26 ... |  0 |
    | padding  | 可选，图片之间的间隔, 默认为 0   |  0 |
    | color  | 可选，雪碧图背景颜色，默认黑色, <https://ffmpeg.org/ffmpeg-utils.html#color-syntax>  |  black |
    | dst_type  | 可选，生成的雪碧图图片格式，默认为 jpg，主要为 jpg 或者 png，[image2](https://ffmpeg.org/ffmpeg-all.html#image2-1)  |  jpg |

4. 单击**测试函数**，函数执行成功后，查看返回结果

    `ok`

生成 1 张或者多张雪碧图保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中，假设截图的数量小于等于 tile 指定的 rows \* cols， 生成一张雪碧图， 否则生成多张雪碧图

### video_watermark 功能强大的视频添加水印功能

实现对视频添加 文字水印、 静态图片水印和动态 gif 水印

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 video_watermark。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
    ```json
    {
      "bucket_name": "test-bucket",
      "object_key": "a.mp4",
      "output_dir": "output/",
      "vf_args": "drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello函数计算':x=100:y=50:fontsize=24:fontcolor=red",
      "filter_complex_args": "overlay=0:0:1"
    }
    ```
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
    | output_dir  | 必填， 生成的加水印的视频在 OSS 存储桶上存储目录      | output/ |
    | vf_args  |  文字水印: `"drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello 函数计算':x=50:y=50:fontsize=24:fontcolor=red:shadowy=1"` <br/><br/>静态图片水印:  `"movie=/code/logo.png[watermark];[in][watermark]overlay=10:10[out]"`  | `"drawtext=fontfile=/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc:text='hello FC':fontcolor=red:shadowy=1"` |
    | filter_complex_args  |  动态gif图片水印   |  `"overlay=0:0:1"` |
    > 优先级: filter_complex_args > vf_args，即有 filter_complex_args 参数的时候，忽视 vf_args 参数

4. 单击**测试函数**，函数执行成功后，查看返回结果

    `ok`

生成具有水印的视频，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中


### video_gif 功能强大的 video 提取为 gif 函数

video 转为 gif

- 支持某段时间内视频转为 gif

- 支持从某段时间开始后的指定帧数转为 gif

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 video_gif。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
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
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
    | output_dir  | 必填， 生成的音频在 OSS 存储桶上存储目录      | output/ |
    | start  |  可选， 默认值为 0  |  0 |
    | vframes  |  可选，帧数  |  20 |
    | duration  |  可选， 时长  |  5 |

    > vframes 和 duration 可选， 当同时填写的时候， 以 duration 为准，当都没有填写的时候， 默认整个视频转为 gif

4. 单击**测试函数**，函数执行成功后，查看返回结果

    `ok`

生成 gif 图片，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中

### audio_convert: 音频格式转换器

1. 登录函数计算控制台，在左侧导航栏，单击**函数**。
2. 在顶部菜单栏，选择地域，然后在**函数**页面，单击目标函数 audio_convert。
3. 在**代码**页签，单击**测试函数**右侧的图标，从下拉列表中选择配置测试参数，输入如下示例测试参数，然后单击**确定**。
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
    | Key         |  描述       | 示例值       |
    |-------------|--------------|--------------|
    | bucket_name |  OSS 存储桶名字  | test-bucket  |
    | object_key  | 音视频文件 OSS object key        | a.mov 或者 video/a.mp4  |
    | output_dir  | 必填， 生成的音频在 OSS 存储桶上存储目录      | output/ |
    | dst_type  |  生成的音频的格式  |  wav |
    | ac  |  可选，声道数  |  1 |
    | ar  |  可选，采样率  |  4000 |

4. 单击**测试函数**，函数执行成功后，查看返回结果

    `20.45`

生成目标格式的音频文件，保存到 bucket 的该目录( `output_dir + "/" + dir(object_key)` )中

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>
