"use strict";var precacheConfig=[["/tangPoet/index.html","c5b98f31e1e97394f2a81143a0dd286a"],["/tangPoet/static/css/main.ba79d610.css","0f6948ccef7a78baa7828a96afea02c9"],["/tangPoet/static/media/1.193199a8.jpg","193199a8e3931799701a9f3e498be03a"],["/tangPoet/static/media/1.a5b6dbd8.png","a5b6dbd8b1ac228cd146d7d42b5ff673"],["/tangPoet/static/media/2.8fdebe15.png","8fdebe15c21026dd9c8497815652645f"],["/tangPoet/static/media/background.351db4fc.jpg","351db4fcf148bd200d298b5890f65a5b"],["/tangPoet/static/media/bg.2176459c.png","2176459c235d8a10afe76bfbb8157c8e"],["/tangPoet/static/media/bg.2bffe2df.png","2bffe2df2c6fd76bc209b4b712be883c"],["/tangPoet/static/media/bg.8e701d8c.png","8e701d8ce9ab3235b77270fabb8e4c8f"],["/tangPoet/static/media/bg.c8cda536.png","c8cda5363ce3f06c925ba3ffc0c16b94"],["/tangPoet/static/media/bird.c890c06e.png","c890c06e5f08755238998237ae62a998"],["/tangPoet/static/media/bjy.d0b91348.jpg","d0b913481d591cecc72e5a5f7ddfc90e"],["/tangPoet/static/media/flower.649b3d76.png","649b3d76e18304a2eac758150ad16831"],["/tangPoet/static/media/frame.7c284d3f.png","7c284d3f14d568203d2bb140e42e7d9c"],["/tangPoet/static/media/frame.b0501293.png","b05012937481d1377047c1716aa4d6a0"],["/tangPoet/static/media/ink.632c6469.png","632c6469538213e689f7f5113eb866ff"],["/tangPoet/static/media/ink.e77de5bc.png","e77de5bc111e0c096d110d03bae5ca57"],["/tangPoet/static/media/ink.f95a8b94.png","f95a8b947526677bd91698f01ee3191d"],["/tangPoet/static/media/redTree.ea7dc439.png","ea7dc4393a4df4a49275f9791d472896"],["/tangPoet/static/media/shape.2ab98f38.png","2ab98f380bc187b0fdd2985cdfaeacbf"],["/tangPoet/static/media/wzh.71cbb373.jpg","71cbb37333a78a0ba546975a140a7451"],["/tangPoet/static/media/xt.19deb6d9.jpg","19deb6d9a16cc287bcc1858d69089d18"],["/tangPoet/static/media/yz.4491463b.jpg","4491463bf201f9c786f3ccb6c98a6ab3"],["/tangPoet/static/media/zju.c4f4c5b0.png","c4f4c5b0af98b04d1775c4564462c887"],["/tangPoet/static/media/zrx.ca59c195.jpg","ca59c195accc85a551a8ce14d0fd441b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/tangPoet/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});