async function preInit(inputObj) {
    console.log(`\n     _______  _______  __   __  _______  _______  _______ 
    |       ||       ||  |_|  ||       ||       ||       |
    |    ___||    ___||       ||    _  ||    ___||    ___|
    |   |___ |   |___ |       ||   |_| ||   |___ |   | __ 
    |    ___||    ___||       ||    ___||    ___||   ||  |
    |   |    |   |    | ||_|| ||   |    |   |___ |   |_| |
    |___|    |___|    |_|   |_||___|    |_______||_______|
                                        `)
}

async function postInit(inputObj) {
    console.log(`\n    Welcome to the ffmpeg-app application
     This application requires to open these services: 
         FC : https://fc.console.aliyun.com/
         OSS: https://oss.console.aliyun.com/
         
     * 关于项目的介绍，可以参考：https://github.com/devsapp/start-ffmpeg/blob/master/headless-ffmpeg/src
     * 项目初始化完成，您可以直接进入项目目录下
        1. 进行构建：s build --use-docker --dockerfile ./code/Dockerfile
        2. 项目部署：s deploy --use-local -y
     * 最后您还可以验证项目的正确性，例如通过invoke调用（这里video_url等，可以考虑换成自己的测试mp4）：
       s invoke -e '{"record_time":"35","video_url":"https://dy-vedio.oss-cn-hangzhou.aliyuncs.com/video/a.mp4","output_file":"record/test.mp4"}'
       \n`)
}

module.exports = {
    postInit,
    preInit
}
