const lighthouse = require("lighthouse");
const reportGenerator = require("lighthouse/lighthouse-core/report/report-generator");
const fs = require("fs");

 async function lighthouseCheck(url, port, reportname){
    const opts = {
        port: port,
        disableStorageReset: false,
        emulatedFormFactor: 'none'
      };
      //The local server is running on port 10632.
      // // Direct Lighthouse to use the same port.
      const result = await lighthouse(url,opts)
      const lhr = result.lhr;
      //console.log(lhr)
  
      // Direct Puppeteer to close the browser - we're done with it.
      const html = reportGenerator.generateReport(lhr, "html");
  
      //Write report html to the file
      fs.writeFile(reportname, html, err => {
        if (err) {
          console.error(err);
        }
      });

}
module.exports = {lighthouseCheck}