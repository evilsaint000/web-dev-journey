

// function waitfor3s(resolve){
//     console.log(resolve);
    
//     setTimeout(resolve,3000);
// }
// function setTimeoutPromisified(){
//     return new Promise(waitfor3s);
// }
// function main(){
//     console.log("Main is called");
// }
// setTimeoutPromisified().then(main);

// function random(resolve){
//     resolve();
    
// }
// let p= new Promise(random);
// function callback(){
//     console.log("callback is called");
// }
// console.log(p);
// p.then(callback);


// const fs = require('fs');
// function readTheFile(sendTheFinalData){
//     fs.readFile('a.txt','utf-8',function(err,data){
//         sendTheFinalData(data);
//     })   
// }
// function readFile(filename){
//     return new  Promise(readTheFile);
// }
// const p = readFile();
// function callback(contents){
//     console.log(contents);
// }

// p.then(callback);

// function doAsyncOp(resolve){
//     setTimeout(resolve,3000);
// }

// const p = new Promise(doAsyncOp);

// function callback(){
//     console.log("callback is called");
// }

// p.then(callback);/

// function setTimeoutPromisified(time){
//     return new Promise(function(resolve){
//         setTimeout(resolve,time);
//     });
// }
// // setTimeout => promisified setTimeout

// function callback(){
//     console.log("callback is called");
// }   

// const p = setTimeoutPromisified(3000);
// p.then(callback);


// // -----callback hell------
// setTimeout(function(){
//     console.log("hi");
//     setTimeout(function(){
//         console.log("hello");
//         setTimeout(function(){
//             console.log("hello there");
//         },5000);
//     },3000);
// },1000);

// // -----promise------ (then hell)
// function setTimeoutPromisified(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
  
//   setTimeoutPromisified(1000).then(function () {
//     console.log("hi");
//     setTimeoutPromisified(3000).then(function () {
//       console.log("hello");
//       setTimeoutPromisified(5000).then(function () {
//         console.log("hello there");
//       });
//     });
//   });
  

// // promise chaining
// setTimeoutPromisified(1000)
//   .then(function () {
//     console.log("hi");
//     return setTimeoutPromisified(3000);
//   })
//   .then(function () {
//     console.log("hello");
//     return setTimeoutPromisified(5000);
//   })
//   .then(function () {
//     console.log("hello there");
//   });


//----async await----- (syntactic sugar on top of promise)
function setTimeoutPromisified(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function solve(){
    await setTimeoutPromisified(1000);  
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("hello there");

}

solve();
console.log("end of script");