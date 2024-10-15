var o = Object.defineProperty;
var n = (t, i, s) => i in t ? o(t, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[i] = s;
var e = (t, i, s) => n(t, typeof i != "symbol" ? i + "" : i, s);
import { parse as l } from "rss-to-json";
class a {
  constructor(i) {
    e(this, "id");
    e(this, "title");
    e(this, "summary");
    e(this, "content");
    e(this, "link");
    e(this, "audio");
    e(this, "author");
    e(this, "published");
    e(this, "created");
    e(this, "duration");
    e(this, "episodeType");
    e(this, "categories");
    e(this, "playing", !1);
    this.id = i.id, this.title = i.title, this.summary = u(i.description), this.content = i.content, this.link = i.link, this.audio = i.enclosures.find((s) => s.type === "audio/mpeg").url, this.author = i.author, this.published = r(i.published), this.created = r(i.created), this.duration = parseInt(i.duration), this.episodeType = i.episodeType, this.categories = i.category || [];
  }
  get audioPlayer() {
    let i = document.querySelector("#podcast-from-rss-player");
    return i || (i = document.createElement("audio"), i.id = "podcast-from-rss-player", i.controls = !1, document.body.appendChild(i)), i;
  }
  play() {
    this.audioPlayer.src != this.audio && (this.audioPlayer.src = this.audio), this.audioPlayer.play().then(() => this.playing = !0);
  }
  pause() {
    this.audioPlayer.src != this.audio && (this.audioPlayer.src = this.audio), this.playing && (this.audioPlayer.pause(), this.playing = !1);
  }
}
const u = (t, i) => {
  const s = document.createElement("div");
  return s.innerHTML = t.replaceAll("</p>", `</p>
`).replaceAll(/<br\s*\/?>/g, `
`), t = String(s.textContent).split(`
`)[0], t.substring(0, i) + "";
}, r = (t) => new Date(t).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});
class c {
  constructor(i) {
    e(this, "title");
    e(this, "description");
    e(this, "image");
    e(this, "link");
    e(this, "categories");
    e(this, "items");
    this.title = i.title, this.description = i.description, this.image = i.image, this.link = i.link, this.categories = i.category || [], this.items = i.items.map((s) => new a(s));
  }
  find(i) {
    return this.items.find((s) => s.id === i) || null;
  }
}
const d = async (t) => await l(t).then((i) => new c(i));
export {
  d as default
};
