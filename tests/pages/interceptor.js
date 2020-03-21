const RequestInterceptor = require("puppeteer-request-spy").RequestInterceptor;
const RequestSpy = require("puppeteer-request-spy").RequestSpy;
const ResponseFaker = require("puppeteer-request-spy").ResponseFaker;


function KeywordMatcher(testee, keyword) {
    return testee.indexOf(keyword) > -1;
  }

  
function getinterceptor() {
  let requestInterceptor = new RequestInterceptor(KeywordMatcher, console);
  let login_spy = new RequestSpy("<request endpoint to spy>");
  requestInterceptor.addSpy(login_spy);
  return requestInterceptor;
}

module.exports = { getinterceptor };
