# FFmpeg案例

基于函数计算 FC + FFmpeg 实现 Serverless 架构的弹性高可用的高度自定义音视频处理主题。

本主题一共包括三个部分：

- [FFmpeg的基本操作案例](./ffmpeg-app/src)
    - AudioConvert: 音频格式转换器 ([案例代码](./ffmpeg-app/src/functions/audio_convert))
    - GetMediaMeta: 获取音视频 meta ([案例代码](./ffmpeg-app/src/functions/get_multimedia_meta))
    - GetDuration: 获取音视频时长 ([案例代码](./ffmpeg-app/src/functions/get_duration))
    - VideoGif: 功能强大的 video 提取为 gif 函数 ([案例代码](./ffmpeg-app/src/functions/video_gif))
    - GetSprites: 功能强大雪碧图制作函数 ([案例代码](./ffmpeg-app/src/functions/get_sprites))
    - VideoWatermark: 功能强大的视频添加水印功能 ([案例代码](./ffmpeg-app/src/functions/video_watermark))
- [基于 FFmpeg 实现音视频转码](./transcode/src)
- [基于 FC + Serverless Workflow + OSS + NAS + FFmpeg 实现的弹性高可用、并行处理的视频转码服务](./video-flow/src)
