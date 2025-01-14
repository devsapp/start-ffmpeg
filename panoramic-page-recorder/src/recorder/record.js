const puppeteer = require('puppeteer-core');
const fs = require('fs');

var args = process.argv.splice(2)
console.log(args);

const scale_factor = parseFloat(args[3], 10)
const li = args[2].split(',');
console.log(li)
const w = parseInt(li[0], 10)
const h = parseInt(li[1], 10)

async function record() {

  var win_size = `${Math.floor(w / scale_factor)},${Math.floor(h / scale_factor)}`
  const browser = await puppeteer.launch(
    {
      headless: false,
      executablePath: "/usr/bin/google-chrome-stable",
      args: [
        '--no-sandbox',
        '--autoplay-policy=no-user-gesture-required',
        '--enable-usermedia-screen-capturing',
        '--allow-http-screen-capture',
        '--disable-gpu',
        '--start-fullscreen',
        '--window-size=' + win_size,
        '--force-device-scale-factor=' + `${scale_factor}`
      ],
      ignoreDefaultArgs: ['--mute-audio', '--enable-automation']
    });
  console.log("try new page .....");
  const page = await browser.newPage();

  await page.setViewport({
    width: Math.floor(w / scale_factor),
    height: Math.floor(h / scale_factor),
    deviceScaleFactor: scale_factor
  });
  console.log("try goto .....");
  url = args[1] || "http://dy-vedio.oss-cn-hangzhou.aliyuncs.com/video/a.mp4";
  //await page.goto(url, { waitUntil: 'networkidle0' });
  await goto(page, url)
  var timeout = parseInt(args[0], 10) * 1000;
  console.log("waitFor begin .....");
  // const session = await page.target().createCDPSession();
  // await session.send('Emulation.setPageScaleFactor', {
  //   pageScaleFactor: 0.75, // 75%
  // });
  await page.waitForTimeout(timeout);
  // console.log("screenshot .....");
  // await page.screenshot({ path: '/var/output/test.png' });
  await browser.close();
  console.log("browser closed ...........");
}

async function sleep(seconds) {
  console.log(`sleeping ${seconds} seconds`);
  await new Promise(r => setTimeout(r, seconds * 1000));
}

function isRecoverableNetworkErrorMessage(message) {
  const re = /net::(ERR_NETWORK_CHANGED|ERR_CONNECTION_CLOSED)/;
  return re.test(message);
}

async function goto(page, url) {
  let interval = 1;
  const rate = 2;
  const count = 3

  for (let i = 0; i < count; i++) {
    try {
      console.log(`attempting ${i+1} to open ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle0' }).then(()=>{
        const w_data= Buffer.from('success\n');
        fs.writeFile('load.log', w_data, {flag: 'w+'}, function (err) {
            if(err) {
                console.error(err);
            } else {
                console.log('写入成功');
            }
        });
       });

      console.log(`opened ${url}`);
      return;
    } catch (obj) {
        if (i < count - 1 && obj instanceof Error){
        if (isRecoverableNetworkErrorMessage(obj.message)) {
          await sleep(interval);
          interval = rate * interval;
          continue;
        }
      }
      throw obj;
    }
  }
}

record();