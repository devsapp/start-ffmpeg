#  阿里云 FFmpeg 视频转码案例

> 快速部署和体验 Serverless 架构下的 FFmpeg 视频转码案例

- [阿里云 FFmpeg 视频转码案例](#阿里云-ffmpeg-视频转码案例)
  - [体验前准备](#体验前准备)
  - [代码](#代码)
  - [快速部署和体验](#快速部署和体验)
    - [在线快速体验](#在线快速体验)
    - [在本地部署体验](#在本地部署体验)
  - [应用详情](#应用详情)

## 体验前准备

该应用案例，需要您开通[阿里云函数计算](https://fcnext.console.aliyun.com/) 产品；并建议您当前的账号有权限存在`FCDefaultRole`。

## 代码

- [:octocat: 源代码](https://github.com/devsapp/start-ffmpeg/tree/master/transcode/src)

## 快速部署和体验
### 在线快速体验

- 通过阿里云 **Serverless 应用中心**： 可以点击 [【🚀 部署】](https://fcnext.console.aliyun.com/applications/create?clone_url=https://github.com/huangfushan/hfs-test-5.git) ，按照引导填入参数，快速进行部署和体验。
- 通过阿里云 **CloudShell**：可以点击 [【🏄 部署】](https://api.aliyun.com/new#/tutorial?action=git_open&git_repo=https://github.com/devsapp/devsapp-cloudshell-example.git&tutorial=tutorial/start-video-transcode.md) ，按照引导填入参数，快速进行部署和体验。

### 在本地部署体验

1. 下载安装 Serverless Devs：`npm install @serverless-devs/s` 
    > 详细文档可以参考 [Serverless Devs 安装文档](https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/install.md)
2. 配置密钥信息：`s config add`
    > 详细文档可以参考 [阿里云密钥配置文档](https://github.com/devsapp/fc/blob/main/docs/zh/config.md)
3. 初始化项目：`s init video-transcode -d video-transcode`
4. 进入项目并部署：`cd video-transcode && s deploy`

> 在本地使用该项目时，不仅可以部署，还可以进行更多的操作，例如查看日志，查看指标，进行多种模式的调试等，这些操作详情可以参考[函数计算组件命令文档](https://github.com/devsapp/fc#%E6%96%87%E6%A1%A3%E7%9B%B8%E5%85%B3) ;

## 应用详情
TODO

-----

> - Serverless Devs 项目：https://www.github.com/serverless-devs/serverless-devs   
> - Serverless Devs 文档：https://www.github.com/serverless-devs/docs   
> - Serverless Devs 钉钉交流群：33947367    