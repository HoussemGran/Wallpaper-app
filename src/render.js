const  fetch = require("node-fetch");
const {createApi}  = require("unsplash-js");
const fs = require('fs');
const request = require('request')
const wallpaer = require('wallpaper')
require('dotenv').config()

global.fetch = fetch;


document.getElementById('form').addEventListener('submit',wall,true);
document.getElementById('progress');

const serverApi =  createApi({
    accessKey : 'wmaAs7nEM2P9etmsyPkSB29VfmSDzClEa2GF9Xu4R-k',
})

const spinner = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>"

function wall(e){
    e.preventDefault()
    const subject =  document.getElementById('subject').value
    const sp =  document.createElement('span')
    sp.classList.add('spinner-border')
    sp.classList.add('spinner-border-sm')
    sp.setAttribute('role','status')
    sp.setAttribute('aria-hidden','true')
    
    document.getElementById('btn').appendChild(sp)

    serverApi.photos.getRandom({
        query : subject,
        count : 1,
    }).then(response=>{
        const link = response.response[0].urls.full
        download(link, 'pic.jpeg', function(){
            console.log('done');
                  wallpaer.set('pic.jpeg').then(res=>{
                      console.log("set done")
                      document.getElementById('btn').removeChild(sp)
                  }).catch(err=>{
                      console.log(err)
                  })
          }); 
    }).catch(err=>{
        console.log(err)
    })   

}   



let download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };