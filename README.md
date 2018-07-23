# 2018_summer_web2_Nodejs

생활코딩 WEB2 - Node.js

 JavaScript를 이용해서 Node.js를 제어해 동적으로 HTML 코드를 생성하는 웹애플리케이션을 만들기
 
 
환경 세팅

  -Node.js 설치
  
  node -v 로 버젼 확인 가능 (v8.11.3)
  
  -npm 설치
  
  -pm2 설치
  
    
C:\workspace\nodejs\web2_nodejs

cmd 창에서 위 경로로 들어가서 

$node main.js 

명령어를 실행하면 웹서버가 구동된다. 


Node js는 웹서버 기능을 가지고 있다. 제어판>네트워크 및 인터넷 > 네트워크 및 공유 센터에서 로컬 영역 연결 > 자세히 > IPv4 확인 

192.168.xxx.xxx:[포트번호]/   하면 접근 가능 단, 서버가 start 상태여야 한다. 


pm2 는 우리가 만든 process를 감시하고 꺼지면 다시 켜준다. 파일 수정을 감지해 다시 실행시켜준다.


$pm2 start main.js // 웹서버가 구동된다. 

$pm2 monit

$pm2 list

$pm2 stop main.js

$pm2 delete main.js

$pm2 restart main.js

$pm2 log // 이것도 디버그 할 때 좋다. 

$pm2 start main.js --watch //  이거 참 좋다.

