const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

const fetcher = () => {
  const url = args[0];
  const filePath = args[1];
  
  request(url, (error, response, body) => {
    if (error) {
      console.log('error:', error);
    }
    let content = body;
    
    const getBinarySize = (string) =>{
      return Buffer.byteLength(string, 'utf8');
    };
    
    let contentLength = getBinarySize(content);
    fs.exists(filePath, (isExist) => {
      if (!filePath) {
        console.log("The file path is invalid, process terminated");
      }
      if (isExist) {
        console.log("File already exist, writing attempt now terminated");
        return;
      } else {
        fs.writeFile(filePath, content, err => {
          if (err) {
            console.error("The url is not valid, please check and try again. Process terminated");
            return;
          }
          //file written successfully
          console.log(`Downloaded and saved ${contentLength} bytes to ${filePath}`);
        });
        return;
      }
    });
  
  });

};
fetcher();