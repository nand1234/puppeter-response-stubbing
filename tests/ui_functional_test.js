const login = require("./pages/login");
const stub = require("./stubs/login_s");
const base = require("./pages/base");

const base_url = "<Test URL>";
var browser = null;
var page = null;
var requestInterceptor = null;

describe("Login to PMP Portal", function() {
  this.beforeEach(async function() {
    browser = await base.launch_puppeter();
    page = await base.launchloginURL(browser, base_url, 1200, 800);
    requestInterceptor = await base.start_request_interceptor(page);
  });

  it("Should be able to Login to PMP portal", async function() {
    await login.performLogin(page);
    await stub.incorrect_username(page, requestInterceptor);
    await page.waitFor(10000);
  });

  this.afterEach(async function() {
    page.removeAllListeners("request");
    browser.close();
  });
});
