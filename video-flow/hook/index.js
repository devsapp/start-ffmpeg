async function preInit(inputObj) {

}

async function postInit(inputObj) {
    console.log(`\n     _______  _______  __   __  _______  _______  _______
    |       ||       ||  |_|  ||       ||       ||       |
    |    ___||    ___||       ||    _  ||    ___||    ___|
    |   |___ |   |___ |       ||   |_| ||   |___ |   | __
    |    ___||    ___||       ||    ___||    ___||   ||  |
    |   |    |   |    | ||_|| ||   |    |   |___ |   |_| |
    |___|    |___|    |_|   |_||___|    |_______||_______|
                                        `)
    console.log(`\n    Welcome to the multimedia-process-flow-v3 application
     This application requires to open these services:
         FC : https://fc.console.aliyun.com/
     This application can help you quickly deploy the ffmpeg project.
     The application uses FC component：https://docs.serverless-devs.com/user-guide/aliyun/#fc3\n`)

}

module.exports = {
    postInit,
    preInit
}
