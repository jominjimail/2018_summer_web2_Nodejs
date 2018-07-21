var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template=require('./lib/template.js');

var app = http.createServer(function(request,response){
  // 요청할때 받는 정보(웹브라우저가 보낸정보)
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true ).pathname;
    //console.log(url.parse(_url, true));
    console.log(pathname);
    if(pathname === '/'){
      if(queryData.id === undefined){//짝1
        fs.readdir('./data', function(error , filelist){
          var title = 'welcome';
/*
          var list =   `<ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>`;
*/
          var description = 'Hello Node js';
          /*
          var list =templateList(filelist);
          var template = templateHTML(title, list , `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          */
          var list = template.list(filelist);
          var html = template.html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );

          response.writeHead(200);
          response.end(html);
        })
      //undefined
      }else{ // 짝1
        fs.readdir('./data', function(error , filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          //var description = data;
          var title = queryData.id;
          var list =template.list(filelist);
          var html = template.html(title, list , `<h2>${title}</h2>${description}`
          ,`
          <a href="/create">create</a>
          <a href="/update?id=${title}">update</a>
          <form action="delete_process" method="post" >
            <input type="hidden" name="id" value ="${title}">
            <input type="submit" value ="delete">
          </form>
          `);
          response.writeHead(200);
          response.end(html);
          });
        });
      }

    }else if(pathname==='/create'){
      fs.readdir('./data', function(error , filelist){
        var title = 'web-create';
        var list =template.list(filelist);
        var html = template.html(title, list , `
          <form  action="/create_process" method="post">
          <p>
          <input type="text" name ="title" placeholder="title">
          </p>
          <p>
          <textarea name = "description" placeholder="description"></textarea>
          </p>
          <p>
          <input type="submit">
          </p>
          </form>
          `, '' );
        response.writeHead(200);
        response.end(html);
      })
    }else if(pathname==='/create_process'){
        var body = '';

        request.on('data', function (data) { // post 방식으로 웹브라우저를 전송할때 너무 많은 데이터를 전송하면 , 무리데스
            body += data; // 콜백이 실행될때마다 실행됨 정보가 조각조각 들어오다가
        });

        request.on('end', function () { //더 이상 들어올 정보가 없으면 이거 호출
            var post = qs.parse(body); //post 에 post로 보낸 정보가 들어있음 {title: 'Nodejs' , description: 'Nodejs is ...'}
            var title = post.title;
            var des = post.description; // 타이틀과 본문값을 알 수 있다.
            console.log(post.title);
            console.log(post.description);
            fs.writeFile(`data/${title}`, des , 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end('sucess');
            })
        });
    }else if(pathname === '/update'){
      fs.readdir('./data', function(error , filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list =template.list(filelist);
        var html = template.html(title, list ,
          `
          <form  action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p>
          <input type="text" name ="title" placeholder="title" value="${title}">
          </p>
          <p>
          <textarea name = "description" placeholder="description">${description}</textarea>
          </p>
          <p>
          <input type="submit">
          </p>
          </form>
          `
        ,'');
        response.writeHead(200);
        response.end(html);
      });
    });
  }else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function (data) { // post 방식으로 웹브라우저를 전송할때 너무 많은 데이터를 전송하면 , 무리데스
        body += data; // 콜백이 실행될때마다 실행됨 정보가 조각조각 들어오다가
    });

    request.on('end', function () { //더 이상 들어올 정보가 없으면 이거 호출
        var post = qs.parse(body); //post 에 post로 보낸 정보가 들어있음 {title: 'Nodejs' , description: 'Nodejs is ...'}
        console.log(post);
        var title = post.title;
        var id=post.id;
        var des = post.description; // 타이틀과 본문값을 알 수 있다.

        fs.rename(`data/${id}` , `data/${title}`,function(error){
          fs.writeFile(`data/${title}`, des , 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end('sucess');
          })
        })
        //console.log(post);
        /*
        fs.writeFile(`data/${title}`, des , 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end('sucess');
        })
      */
    });
  }else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', function (data) { // post 방식으로 웹브라우저를 전송할때 너무 많은 데이터를 전송하면 , 무리데스
        body += data; // 콜백이 실행될때마다 실행됨 정보가 조각조각 들어오다가
    });

    request.on('end', function () { //더 이상 들어올 정보가 없으면 이거 호출
        var post = qs.parse(body); //post 에 post로 보낸 정보가 들어있음 {title: 'Nodejs' , description: 'Nodejs is ...'}
        console.log(post);
        var id=post.id;
        fs.unlink(`data/${id}` , function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })

    });
  }
    else{
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);
