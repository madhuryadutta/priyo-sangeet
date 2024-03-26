# -----------------------------------------------requirements------------------------------------------------
# pip install eyed3

# -----------------------------------------------import Section------------------------------------------------

import os
import sys
import eyed3
eyed3.log.setLevel("ERROR")

# -----------------------------------------------static data section------------------------------------------------

# Get the list of all files and directories
path = "./music"
dir_list = os.listdir(path)
dir_list.sort()
# prints all files
# print(dir_list)
final_data=''
dynamic_data=''
first='''
const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

var playlist;
const shufflePlaylist = document.querySelector("#shufflePlaylist");
const ResetPlaylist = document.querySelector("#ResetPlaylist");

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}



const songDataBase = [
'''

second='''
];

playlist = songDataBase;

shufflePlaylist.addEventListener("click", () => {
    shuffle(playlist);
    console.log(playlist);
});


ResetPlaylist.addEventListener("click", () => {
    playlist = songDataBase;
    console.log(playlist);
});




const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
'''

if len(dir_list)>=1 :
    for i in dir_list :
        url_construct="./music/"+i
        audio=eyed3.load(url_construct)
        if audio.tag is not None:
            final_title=(audio.tag.title or 'NA').replace('"', '').replace('?', '').replace('#', '')
            final_artist=(audio.tag.artist or 'NA').replace('/', ',').replace('?', '').replace('#', '')
            final_album=audio.tag.album
            image_name=''.join(letter for letter in final_title if letter.isalnum()or letter in ".")
            final_image_name= "./img/"+image_name+".jpg"
            image_name_with_extension =image_name+".jpg"
            for image in audio.tag.images:
                image_file = open(final_image_name.format(final_title), "wb")
                image_file.write(image.image_data)
                image_file.close()
        else:
            final_title = i.replace('"', "")
            final_artist = i.replace("/", ",")
            final_album = i
            image_name_with_extension = "sbg.jpg"

            # for fetcing data from server
        dynamic_data=dynamic_data+ '''{
                            songSrc:"'''+ '''./music/'''+ i +'''",
                            title: "''' + final_title+'''",
                            artist: "'''+final_artist+'''",
                            imgSrc: "'''+'''./img/'''+image_name_with_extension+'''",
                        },'''

    final_data=first+dynamic_data+second

    # -----------------------------------------------generate script js file------------------------------------------------

    js_file = open("script.js", "w")
    js_file.write(final_data)
    js_file.close()
