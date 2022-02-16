# FFmpeg案例

基于函数计算 FC + FFmpeg 实现 Serverless 架构的弹性高可用的高度自定义音视频处理主题。

本主题一共包括三个部分：

- [Ffmpeg的基本操作案例](./ffmpeg-app/src): `s init ffmpeg-app`
    - AudioConvert: 音频格式转换器 ([案例代码](./ffmpeg-app/src/functions/audio_convert))
    - GetMediaMeta: 获取音视频 meta ([案例代码](./ffmpeg-app/src/functions/get_multimedia_meta))
    - GetDuration: 获取音视频时长 ([案例代码](./ffmpeg-app/src/functions/get_duration))
    - VideoGif: 功能强大的 video 提取为 gif 函数 ([案例代码](./ffmpeg-app/src/functions/video_gif))
    - GetSprites: 功能强大雪碧图制作函数 ([案例代码](./ffmpeg-app/src/functions/get_sprites))
    - VideoWatermark: 功能强大的视频添加水印功能 ([案例代码](./ffmpeg-app/src/functions/video_watermark))
- [对直播视频流截图的应用](./rtmp-snapshot/src): `s init rtmp-snapshot`
- [一个对浏览器全景录制](./headless-ffmpeg/src): `s init headless-ffmpeg`