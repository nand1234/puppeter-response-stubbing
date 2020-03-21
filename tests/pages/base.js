const puppeteer = require("puppeteer");
const interceptor = require("./interceptor")

const PORT = 8044;

async function launch_puppeter() {
   return browser = await puppeteer.launch({
    args: [`--remote-debugging-port=${PORT}`],
    // Optional, if you want to see the tests in action.
    headless: false,
    slowMo: 10
  });
}

async function launchloginURL(browser, base_url, browser_width, browser_height) {
  const page = await browser.newPage();
  browserWSEndpoint = await browser.wsEndpoint();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });

  await page.setViewport({ width: browser_width, height: browser_height });
  await page.goto(base_url + "<login endpoint>", {
    waitUntil: "networkidle2",
    timeout: 90000000
  });

  return page;
}

async function start_request_interceptor(page){
    page.removeAllListeners("request");
    await page.setRequestInterception(true);
    var requestInterceptor = interceptor.getinterceptor();
    page.on("request", requestInterceptor.intercept.bind(requestInterceptor));
    return requestInterceptor;
}

module.exports = {launch_puppeter, launchloginURL, start_request_interceptor}
