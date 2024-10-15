(function(s,t){typeof exports=="object"&&typeof module<"u"?module.exports=t(require("rss-to-json")):typeof define=="function"&&define.amd?define(["rss-to-json"],t):(s=typeof globalThis<"u"?globalThis:s||self,s["podcast-from-rss"]=t(s["rss-to-json"]))})(this,function(s){"use strict";var c=Object.defineProperty;var a=(s,t,o)=>t in s?c(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o;var i=(s,t,o)=>a(s,typeof t!="symbol"?t+"":t,o);class t{constructor(e){i(this,"id");i(this,"title");i(this,"summary");i(this,"content");i(this,"link");i(this,"audio");i(this,"author");i(this,"published");i(this,"created");i(this,"duration");i(this,"episodeType");i(this,"categories");i(this,"playing",!1);this.id=e.id,this.title=e.title,this.summary=o(e.description),this.content=e.content,this.link=e.link,this.audio=e.enclosures.find(r=>r.type==="audio/mpeg").url,this.author=e.author,this.published=l(e.published),this.created=l(e.created),this.duration=parseInt(e.duration),this.episodeType=e.episodeType,this.categories=e.category||[]}get audioPlayer(){let e=document.querySelector("#podcast-from-rss-player");return e||(e=document.createElement("audio"),e.id="podcast-from-rss-player",e.controls=!1,document.body.appendChild(e)),e}play(){this.audioPlayer.src!=this.audio&&(this.audioPlayer.src=this.audio),this.audioPlayer.play().then(()=>this.playing=!0)}pause(){this.audioPlayer.src!=this.audio&&(this.audioPlayer.src=this.audio),this.playing&&(this.audioPlayer.pause(),this.playing=!1)}}const o=(n,e)=>{const r=document.createElement("div");return r.innerHTML=n.replaceAll("</p>",`</p>
`).replaceAll(/<br\s*\/?>/g,`
`),n=String(r.textContent).split(`
`)[0],n.substring(0,e)+""},l=n=>new Date(n).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});class u{constructor(e){i(this,"title");i(this,"description");i(this,"image");i(this,"link");i(this,"categories");i(this,"items");this.title=e.title,this.description=e.description,this.image=e.image,this.link=e.link,this.categories=e.category||[],this.items=e.items.map(r=>new t(r))}find(e){return this.items.find(r=>r.id===e)||null}}return async n=>await s.parse(n).then(e=>new u(e))});