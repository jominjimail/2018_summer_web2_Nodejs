
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})
// web2_nodejs 에서 $ node nodejs/readdir.js 명령어를 쳤음
// 결과는 testFolder 가 현재 디렉토리에서 data 접근해서 그 리스트를 보여줬음
