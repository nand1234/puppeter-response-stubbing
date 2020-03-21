
const login_username = "<username>";
const login_password = "<password>";

async function performLogin(page) {
  //let requestInterceptor = interceptor.getinterceptor();
  //page.on("request", requestInterceptor.intercept.bind(requestInterceptor));
  const username = await page.$x('//input[@id="input-1"]');
  await username[0].type(login_username);

  const password = await page.$x('//input[@id="input-2"]');
  await password[0].type(login_password);
  const tC = await page.$x(
    '//span[@class="slds-checkbox--faux terms_and_conditions_checkbox"]'
  );
  await tC[0].click();
  const login = await page.$x(
    '//button[@class="slds-button slds-button_brand pmp_login_button"]'
  );
  await login[0].click();
}

module.exports = { performLogin };
