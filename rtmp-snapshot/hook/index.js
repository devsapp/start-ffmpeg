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
         
     * 关于项目的介绍，可以参考：https://github.com/devsapp/start-ffmpeg/blob/master/rtmp-snapshot/src
     * 项目初始化完成，您可以直接进入项目目录下
        1. 对s.yaml进行升级，例如填充好environmentVariables中的部分变量值（OSS存储桶相关信息）
        2. 进行构建：s build --use-docker --dockerfile ./code/Dockerfile
        3. 项目部署：s deploy --use-local -y
     * 最后您还可以验证项目的正确性： 
        https://github.com/devsapp/start-ffmpeg/tree/master/rtmp-snapshot/src#%E6%B5%8B%E8%AF%95\n`)
}

module.exports = {
    postInit,
    preInit
}
