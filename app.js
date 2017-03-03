var express = require('express');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 var https = require('https');
const fs = require('fs')
  var options = {
      ca: [fs.readFileSync('./ca.crt')],
      cert: fs.readFileSync('./cert.crt'),
      key: fs.readFileSync('./private.key')
    };
var imagemagick = require('imagemagick-native');

const request = require('request')
const md5 = require('md5')
var https = require('https');
var app = express();
var paths = {}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


paths['139.59.109.143:3000']='https://static.livaza.com/magemedia'
paths['catalog']='https://static.livaza.com/magemedia'
paths['product']='https://static.livaza.com/product'
paths['v2assets']='https://10.130.46.33/assets'
paths['backend']='http://10.130.40.28/image'


function img(req,res,pathx){
	let DEST = '/cache/'+md5(req.originalUrl)+'.png'
	if(fs.existsSync(DEST)){
		res.setHeader('Cache-Control', 'public, max-age=31557600');
		res.sendFile(DEST)
		return false
	}
	const PATH = paths[pathx]
	if(!PATH) { res.status(404).end(); return false;}
	var TO = PATH+req.originalUrl
	for(var k in paths){
		TO=TO.replace(k+'/','')
	}

	console.log('download..',TO)
	download(TO, DEST, function(){
		var opt = {
		    srcData: fs.readFileSync(DEST)
		}
		if(req.query.w) opt.width=req.query.w
		if(req.query.h) opt.height=req.query.h
		if(req.query.q) opt.quality=req.query.q
		imagemagick.identify(opt,function(err,result){
			if(err) { res.status(404).end(); return false}
			let wr = result.width/result.height
			let hr = result.height/result.width
			if(!opt.width) { opt.width = opt.height * wr }
			if(!opt.height) { opt.height = opt.width * hr }
			opt.resizeStyle= 'aspectfill'
    	opt.gravity= 'Center'
      for(var n in req.query){
        if (req.query.hasOwnProperty(propName)) {
          opt[n] = req.query[n]
        }
      }
    		console.log(opt)
			fs.writeFileSync(DEST, imagemagick.convert(opt));
			res.setHeader('Cache-Control', 'public, max-age=31557600');
			res.sendFile(DEST)
		})

	})


}

app.get('/:host/*', function(req, res){
  if(req.originalUrl=='/favicon.ico') {res.status(404).end(); return false}
  img(req,res,req.params.host)
});

 var server = https.createServer(options, app);

    server.listen(443, function(){
        console.log("server running at https://IP_ADDRESS/")
    });
