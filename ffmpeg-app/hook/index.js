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
         
     * 关于项目的介绍，可以参考：https://github.com/devsapp/start-ffmpeg/tree/master/ffmpeg-app/src
     * 项目初始化完成，您可以直接进入项目目录下，并使用 s deploy 进行项目部署\n`)
}

module.exports = {
    postInit,
    preInit
}
