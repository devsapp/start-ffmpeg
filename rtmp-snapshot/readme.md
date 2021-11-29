## 简介

### 初始化

```bash
$ s init rtmp-snapshot -d rtmp-snapshot
$ cd rtmp-snapshot
```

## 部署到函数计算

先将 s.yaml 中的 OSS 相关的环境变量修改成您自己的值

```
$ s deploy -y
```

## 测试

比如在 ecs 部署了一个简单的直播服务器， IP 是 101.200.48.101

```bash
docker run -it -p 1935:1935 -p 8080:80 --rm alfg/nginx-rtmp
```

#### 发起推流

比如测试视频 test.flv 大约为 10 分钟左右的视频

```
ffmpeg -re -i test.flv -vcodec copy -acodec aac -ar 44100 -f flv rtmp://101.200.48.101:1935/stream/example
```

播放器输入这个地址就可以查看了:

rtmp://101.200.48.101:1935/stream/example

![](https://img.alicdn.com/tfs/TB1hwoLpZVl614jSZKPXXaGjpXa-1040-876.png)

比如， 截一张图:

```
ffmpeg -i rtmp://101.200.48.101:1935/stream/example -frames:v 1 1.png
```

持续截图:

```
ffmpeg -i rtmp://101.200.48.101:1935/stream/example -f image2 -r 1 -strftime 1 /tmp/%Y%m%d%H%M%S.jpg
```

#### 调用函数

```bash
$ s invoke -e '{"rtmp_url" : "rtmp://101.200.48.101:1935/stream/example"}'
```

发起推流后， 函数执行是根据推流是否结束， 推流结束了， 然后函数里面的 ffmpeg 截图命令也就结束了， 最后将 /tmp 下面的图片保存回 oss， 该示例是保存回 s.yaml 中定义的 OSS_BUCKET_NAME 这个环境变量。

## 生产需要注意的点

- 建议用户使用大规格实例， 执行时长更长

- 如果有边截图， 边上传回 oss 的需求， 这个代码可以再优化下
