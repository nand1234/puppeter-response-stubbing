const ResponseFaker = require("puppeteer-request-spy").ResponseFaker;


async function incorrect_username(page, requestInterceptor) {
  page.on("response", async response => {
    const request = response.request();
    if (request.url().includes("<request endpoint to spy>")) {
      const text = await request;
      salesforceid = decodeURIComponent(text._postData).substring(27, 32);
    }
  })
  console.log("salesforceid2" +salesforceid)
  var fake = new ResponseFaker("<request endpoint to spy>", {
    status: 200,
    //contentType: "application/json;charset=UTF-8",
    body: JSON.stringify({
      actions: [
        {
          id: 123,
          state: "SUCCESS",
          returnValue: {
            Error:
              "Your password is incorrect. You have 10 login attempts remaining before your account is locked"
          },
          error: []
        }
      ]
      
    })
  });
  requestInterceptor.addFaker(fake);
}

module.exports = { incorrect_username };
