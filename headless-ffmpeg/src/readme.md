## 简介

### 原理

Chrome 渲染到虚拟 X-server，并通过 FFmpeg 抓取系统桌⾯，通过启动 xvfb 启动虚拟 X-server，Chrome 进⾏全屏显示渲染到到虚拟 X-server 上，并通过 FFmpeg 抓取系统屏幕以及采集系统声⾳并进⾏编码写⽂件。这种⽅式的适配性⾮常好， 不仅可以录制 Chrome，理论上也可以录制其他的应⽤。缺点是占⽤的内存和 CPU 较多。

### 初始化

```bash
$ s init headless-ffmpeg -d headless-ffmpeg
$ cd headless-ffmpeg
```

## 部署到函数计算

安装好 s 工具后，将 s.yaml 中镜像名字和环境变量修改：

![](https://img.alicdn.com/imgextra/i4/O1CN01XBWdcb1K9SguCD6N1_!!6000000001121-2-tps-1057-617.png)

然后:

```bash
$ s build --use-docker --dockerfile ./code/Dockerfile
$ s deploy --use-local -y

# 测试调用
$ s invoke -e '{"record_time":"35","video_url":"https://dy-vedio.oss-cn-hangzhou.aliyuncs.com/video/a.mp4","output_file":"record/test.mp4"}'
```

调用成功后， 会在对应的 bucket 下， 产生 record/test.mp4 这个视频

## 注意事项

1. 如果需要更大的执行时间：

- 后台调整
- 使用性能型实例

2. 如果您 s deploy 失败的原因， 是由于镜像过大超过 1G, 请提工单，提供主账号 uid 和 region, 申请更大的镜像限制
