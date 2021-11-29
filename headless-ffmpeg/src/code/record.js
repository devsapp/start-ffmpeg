const puppeteer = require('puppeteer-core');

var args = process.argv.splice(2)
console.log(args);

async function test(){
  const browser = await puppeteer.launch(
    {
      headless: false,
      executablePath: "/usr/bin/google-chrome-stable",
      args: [
        '--no-sandbox',
        '--autoplay-policy=no-user-gesture-required',
        '--enable-usermedia-screen-capturing',
        '--allow-http-screen-capture',
        "--disable-gpu"
      ],
      ignoreDefaultArgs: ['--mute-audio']
    });
  console.log("try new page .....");
  const page = await browser.newPage();
  console.log("try goto .....");
  url = args[1] || "http://dy-vedio.oss-cn-hangzhou.aliyuncs.com/video/a.mp4";
  await page.goto(url);
  var timeout = parseInt(args[0], 10)*1000;
  console.log("waitFor begin .....");
  await page.waitFor(timeout);
  // console.log("screenshot .....");
  // await page.screenshot({ path: '/var/output/test.png' });
  await browser.close();
  console.log("browser closed ...........");
}

test();

console.log("************");