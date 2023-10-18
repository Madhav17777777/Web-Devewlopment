console.log("welcome to spotify");
let songIndex=0;
let audioElement= new Audio("music.mp3");
let masterPlay=document.getElementById('masterPlay');
let myprogressbar =document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songsItems =Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Kina we kiss forever", filePath: "music.mp3",coverPath: "cover.jpg"},
    {songName: "tum hi ho", filePath: "music2.mp3",coverPath: "cover.jpg"}
]
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }

})

function loadSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.load();
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongInfo();
}


function playNextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();
}


function playPreviousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong();
}


document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('prev').addEventListener('click', playPreviousSong);

function updateSongInfo() {
    const songInfo = `${songs[songIndex].songName}`;
    document.getElementById('songinfo').textContent = songInfo;
}

audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressbar.value = progress;
});


myprogressbar.addEventListener('input', () => {
    const seekTime = (myprogressbar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});