const $ = (id) => document.getElementById(id);
const audio = $("audio");
let tracks = [];
let current = -1;
let favorites = new Set();
let shuffle = false;
let toastTimer;
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function timeLabel(seconds){if(!Number.isFinite(seconds))return "0:00";return Math.floor(seconds/60)+":"+String(Math.floor(seconds%60)).padStart(2,"0")}
function updatePlayer(){const t=tracks[current];$("nowTitle").textContent=t?t.name:"Your next favorite";$("nowArtist").textContent=t?(t.artist||"Your library"):"Add a track to begin";$("playBtn").textContent=audio.paused?"▶":"Ⅱ";$("favoriteBtn").textContent=t&&favorites.has(t.id)?"♥":"♡";$("favoriteBtn").classList.toggle("active",!!t&&favorites.has(t.id));$("favoriteCount").textContent="♡ "+favorites.size}
function renderTracks(){const list=$("trackList");if(!tracks.length){list.innerHTML='<p class="empty-state">Your music collection will appear here after you add audio files.</p>';return}list.innerHTML="";tracks.forEach((t,i)=>{const row=document.createElement("div");row.className="track-row";const n=document.createElement("span");n.className="track-number";n.textContent=String(i+1).padStart(2,"0");const meta=document.createElement("div");meta.className="track-meta";const title=document.createElement("strong");title.textContent=t.name;const sub=document.createElement("small");sub.textContent=t.artist||"Local audio file";meta.append(title,sub);const play=document.createElement("button");play.textContent=current===i&&!audio.paused?"Ⅱ":"▶";play.setAttribute("aria-label","Play "+t.name);play.onclick=()=>playTrack(i);const fav=document.createElement("button");fav.textContent=favorites.has(t.id)?"♥":"♡";fav.onclick=()=>toggleFavorite(i);row.append(n,meta,play,fav);list.append(row)})}
function playTrack(index){if(index<0||index>=tracks.length){toast("Add your own audio file first.");return}if(current===index){if(audio.paused)audio.play().catch(()=>toast("Tap play again to start audio."));else audio.pause();updatePlayer();renderTracks();return}current=index;audio.src=tracks[index].url;audio.play().then(()=>toast("Now playing: "+tracks[index].name)).catch(()=>toast("Track ready — tap play to start."));updatePlayer();renderTracks()}
function toggleFavorite(index=current){if(index<0||!tracks[index]){toast("Add a track before favoriting it.");return}const id=tracks[index].id;if(favorites.has(id))favorites.delete(id);else favorites.add(id);try{localStorage.setItem("jfa-favorites",JSON.stringify([...favorites]))}catch(e){}updatePlayer();renderTracks();toast(favorites.has(id)?"Added to favorites":"Removed from favorites")}
try{favorites=new Set(JSON.parse(localStorage.getItem("jfa-favorites")||"[]"))}catch(e){}
$("audioUpload").addEventListener("change",e=>{const selected=[...e.target.files];selected.forEach(file=>{if(!file.type.startsWith("audio/"))return;tracks.push({id:Date.now()+"-"+Math.random().toString(16).slice(2),name:file.name.replace(/\.[^.]+$/,""),artist:"Your device",url:URL.createObjectURL(file),file})});renderTracks();if(tracks.length&&current===-1){current=0;updatePlayer()}if(selected.length)toast(selected.length+" file(s) added to your local library.");e.target.value=""});
$("playBtn").onclick=()=>{if(current===-1){playTrack(0);return}playTrack(current)};
$("prevBtn").onclick=()=>{if(!tracks.length)return toast("Add tracks first.");playTrack((current-1+tracks.length)%tracks.length)};
$("nextBtn").onclick=()=>{if(!tracks.length)return toast("Add tracks first.");playTrack(shuffle?Math.floor(Math.random()*tracks.length):(current+1)%tracks.length)};
$("shuffleBtn").onclick=()=>{shuffle=!shuffle;$("shuffleBtn").classList.toggle("active",shuffle);toast(shuffle?"Shuffle on":"Shuffle off")};
$("favoriteBtn").onclick=()=>toggleFavorite();
$("volume").oninput=e=>audio.volume=Number(e.target.value);
$("seek").oninput=e=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=audio.duration*Number(e.target.value)/100};
audio.ontimeupdate=()=>{if(Number.isFinite(audio.duration)&&audio.duration>0){$("seek").value=audio.currentTime/audio.duration*100;$("currentTime").textContent=timeLabel(audio.currentTime);$("duration").textContent=timeLabel(audio.duration)}};
audio.onended=()=>{if(tracks.length)playTrack(shuffle?Math.floor(Math.random()*tracks.length):(current+1)%tracks.length)};
$("themeToggle").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("jfa-theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("jfa-theme")==="light")document.body.classList.add("light");
$("enterMusic").onclick=()=>{document.querySelector("#playlists").scrollIntoView({behavior:"smooth"});toast("Welcome to Just feel with Ahnaf 💜")};
document.querySelectorAll(".play-card").forEach(btn=>btn.onclick=()=>{toast(btn.dataset.playlist+" playlist selected. Add audio files to play your own songs.");document.querySelector("#library").scrollIntoView({behavior:"smooth"})});
$("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll(".playlist-card").forEach(card=>card.style.display=card.dataset.title.toLowerCase().includes(q)?"":"none");document.querySelectorAll(".track-row").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?"":"none")});
$("searchInput").addEventListener("focus",()=>{if(innerWidth<=760)$("searchInput").parentElement.classList.add("expanded")});
$("searchInput").addEventListener("blur",()=>{if(!$("searchInput").value)$("searchInput").parentElement.classList.remove("expanded")});
$("menuToggle").onclick=()=> $("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=> $("nav").classList.remove("open"));
$("loginBtn").onclick=()=> $("loginDialog").showModal();
$("loginInfo").onclick=()=>{$("loginDialog").close();toast("Login needs secure backend setup.")};
$("saveLyrics").onclick=()=>{const value=$("lyricsInput").value.trim();try{localStorage.setItem("jfa-lyrics",value)}catch(e){}$("savedLyrics").textContent=value||"No lyrics saved yet.";toast("Lyrics saved on this device.")};
$("savedLyrics").textContent=localStorage.getItem("jfa-lyrics")||"";
audio.volume=.8;updatePlayer();
