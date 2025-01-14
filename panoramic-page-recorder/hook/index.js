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
    console.log(`\n    Welcome to the HttpPanoramicPageRecording ...`)
}

module.exports = {
    postInit,
    preInit
}
