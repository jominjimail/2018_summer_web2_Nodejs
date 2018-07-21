// array , object

//function

// 자바 스크립트에서는 함수가 굉장히 독측한 특징을 가지고 있다.
// 함수를 변수에 넣을 수 있다. 아하

//var i = if(true){console.log(1)};

//var i= while(ture){console.log(1)};

var f =function(){
  console.log(1+1);
  console.log(1+2);
}

console.log('function f lg',f);
f();

var a=[f];
console.log('this ',a[0]);
a[0](); //f(); 같은거다

var o = {
  func:f
}
console.log('object print',o.func);
o.func(); // f(); 와 같은거다. 
