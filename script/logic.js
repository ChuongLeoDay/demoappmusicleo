const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const icon_tym = $('.like_song_icon');
const left_control = $('.left_control');
const right_control = $('.right_control');
const center_control = $('.center_control');
const audio = $('#audio');
const img = $('.image_song').children[0];
const progress = $('#progress');
const player_music = $('.player_music');
const image_song = $('.image_song');
const shuffle = right_control.children[0];
const way_back = left_control.children[0];
const player= center_control.children[1];
const playerNext = center_control.children[2];
const playerPrev = center_control.children[0];
const playlist = $('.move_to_playlist');
const headmain_title = $('#headmain_title');
const main_playlist = $('.main_playlist');
const time_start = $('.time_start').children[0];
const time_end = $('.time_end').children[0];
const NameSong = $('.textNameSong').children[0];
const SingerSong = $('#SingerNameSong');

console.log( NameSong, SingerSong);

// Chức năng
// Render bài hát
// Dừng nhạc, phát nhạc, chuyển bài
const app = {
    currentIndex: 0,
    songs: [
        {
            name: 'nàng thơ',
            singer: 'hoàng dũng',
            path: './music/song1.mp3',
            imgAlbum: './image/song1.jpg'
        },
        {
            name: 'lời tạm biệt chưa nói',
            singer: 'Grey D - Oranges',
            path: './music/song2.mp3',
            imgAlbum: './image/song2.jfif'
        },
        {
            name: 'gặp lại nhau khi mùa hoa nở nhé',
            singer: 'nguyên hà',
            path: './music/song3.mp3',
            imgAlbum: './image/song3.jpg'
        },
        {
            name: 'bao tiền một mớ bình yên',
            singer: '14 casper - bon',
            path: './music/song4.mp3',
            imgAlbum: './image/song4.jpg'
        },
        {
            name: 'và ngày nào đó',
            singer: 'trung quân',
            path: './music/song5.mp3',
            imgAlbum: './image/song5.jpg'
        },
        {
            name: 'mặt mộc',
            singer: 'nguyên ngọc',
            path: './music/song6.mp3',
            imgAlbum: './image/song6.jpg'
        },
        {
            name: 'em là',
            singer: 'mono',
            path: './music/song7.mp3',
            imgAlbum: './image/song7.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song_info_in_playlist ${index === this.currentIndex ? 'glassmorphismB' : ''}" data = "${index}" ">
                    <div class="col_45">
                        <div class="img_song_info col_2">
                                <img src="${song.imgAlbum}" alt="" class="img_song_info">
                        </div>
                        <div class="title_song_info col_2">
                            <p>${song.name}</p>
                        </div>
                    </div>
                    <div class="col_5 love_song_playlist">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </div>
            </div>
            `;
        });

        main_playlist.innerHTML = htmls.join('');

    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    loadCurrentSong: function() {
        if(this.currentSong.name.length >= 25) {
            NameSong.classList.add('aniNameSong');
            NameSong.innerText = this.currentSong.name;
            SingerSong.innerText = this.currentSong.singer;
            audio.src = this.currentSong.path;
            img.src = this.currentSong.imgAlbum;
        }
        else {
            NameSong.classList.remove('aniNameSong');
            NameSong.innerText = this.currentSong.name;
            SingerSong.innerText = this.currentSong.singer;
            audio.src = this.currentSong.path;
            img.src = this.currentSong.imgAlbum;
        }
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
             newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    handelEvent: function() {
        const _this = this;
        const isPlaying = true;
        // animate
        const img_song = image_song.animate([
            {
                transform:'rotate(360deg)',
            }
        ],
        {
                duration: 10000,
                iterations: Infinity
        });

        img_song.pause();


        // logic icon tym
        icon_tym.addEventListener('click', () => {
            const tym_rong = icon_tym.children[0];
            const tym_dac = icon_tym.children[1];
            if(tym_rong.className.includes('none_active_icon') == false) {
                tym_rong.classList.add('none_active_icon');
                tym_dac.classList.remove('none_active_icon');
            }
            else {
                tym_rong.classList.remove('none_active_icon');
                tym_dac.classList.add('none_active_icon');
            }
        });

        // logic nút lặp lại
        left_control.addEventListener('click', () => {
            if(way_back.className.includes('main_color_font_2') == false){
                way_back.classList.add('main_color_font_2');
                if (shuffle.className.includes('main_color_font_1') == true) {
                    shuffle.classList.remove('main_color_font_1');
                }
            }
            else {  
                way_back.classList.remove('main_color_font_2');
            }
        });
        // logic nút ngẫu nhiên
        right_control.addEventListener('click', () => { 
            
            if(shuffle.className.includes('main_color_font_1') == false) {
                shuffle.classList.add('main_color_font_1'); 
                if (way_back.className.includes('main_color_font_2') == true) {
                    way_back.classList.remove('main_color_font_2');
                }
            }
            else {
                shuffle.classList.remove('main_color_font_1');
            }
        });

        // Logic nút play 
        player.onclick = function ()  {
            let icon = player.children[0];
            let i1 = document.createElement('i');
            let i2 = document.createElement('i');
            i1.classList.add('fa-solid');
            i1.classList.add('fa-pause');
            i2.classList.add('fa-solid');
            i2.classList.add('fa-play');


            if (_this.isPlaying) {
                _this.isPlaying = false;
                player.replaceChild(i1, icon);
                img_song.play();
                audio.play();
            }
            else {
                _this.isPlaying = true;
                player.replaceChild(i2, icon);
                img_song.pause();
                audio.pause();
            }
        };

        //  Xử lý tiến độ bài hát
        audio.ontimeupdate = function() {
            if(audio.duration) {
                let progress_percent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progress_percent;
                let minutes_action = Math.floor(audio.currentTime / 60) <= 9? '0' + Math.floor(audio.currentTime / 60) : Math.floor(audio.currentTime / 60);
                let seconds_action = Math.floor(audio.currentTime % 60) <= 9 ? '0' + Math.floor(audio.currentTime % 60) : Math.floor(audio.currentTime % 60);
                let minutes_all = Math.floor(audio.duration / 60) <= 9 ? '0' + Math.floor(audio.duration / 60) : Math.floor(audio.duration / 60);
                let seconds_all = Math.floor(audio.duration % 60) <= 9 ? '0' + Math.floor(audio.duration % 60) : Math.floor(audio.duration % 60);       
                time_start.innerText = `${minutes_action} : ${seconds_action}`;
                time_end.innerText = `${minutes_all} : ${seconds_all}`;
            }


        }

        // logic tua bài hát
        progress.onchange = function() {
            audio.currentTime = audio.duration / 100 * progress.value;
        }

        // logic khi bài hát ending 
        audio.onended = function() {
            if(way_back.className.includes('main_color_font_2') == true) {
                audio.play();
            }
            else {
                playerNext.click();
            }
        }

        // Logic nút Next 
        playerNext.addEventListener('click', () => {
            let icon = player.children[0];
            if(shuffle.className.includes('main_color_font_1') == true && icon.className.includes('fa-pause') == true) {
                _this.randomSong();
                audio.play();
                _this.render();
            }
            else if(icon.className.includes('fa-pause') == true) {
                _this.nextSong();
                audio.play();
                _this.render();               
            }
            else if(shuffle.className.includes('main_color_font_1') == true) {
                _this.randomSong();
                audio.pause();
                _this.render();
            }
            else {
                _this.nextSong();
                audio.pause();
                _this.render();
            }
        });

        // Logic nút Previous 
        playerPrev.addEventListener('click', () => {
            let icon = player.children[0];
            if(shuffle.className.includes('main_color_font_1') == true && icon.className.includes('fa-pause') == true) {
                _this.randomSong();
                audio.play();
                _this.render();
            }
            else if(icon.className.includes('fa-pause') == true) {
                _this.prevSong();
                audio.play();
                _this.render();               
            }
            else if(shuffle.className.includes('main_color_font_1') == true) {
                _this.randomSong();
                audio.pause();
                _this.render();
            }
            else {
                _this.prevSong();
                audio.pause();
            }
        });

        // logic chuyển sang playlist
        playlist.onclick = function() {
            let icon = playlist.children[0];
            let i1 = document.createElement('i');
            let i2 = document.createElement('i');
            i1.classList.add('fa-solid');
            i1.classList.add('fa-bars');
            i2.classList.add('fa-solid');
            i2.classList.add('fa-arrow-left-long');
            
            if (headmain_title.innerText == 'ĐANG PHÁT') {
                headmain_title.innerText = 'DANH SÁCH PHÁT';
                playlist.replaceChild(i2, icon);
                player_music.classList.add('none_active_icon');
                main_playlist.classList.remove('none_active_icon');
                main_playlist.classList.add('active_playlist');
            }
            else {
                headmain_title.innerText = 'ĐANG PHÁT';
                playlist.replaceChild(i1, icon);
                player_music.classList.remove('none_active_icon');
                main_playlist.classList.add('none_active_icon');
                main_playlist.classList.remove('active_playlist');
            }   
        };

        // logic main playlist khi click thì phát nhạc
        main_playlist.onclick = function(e) {
            let icon = player.children[0];
            let condition1 = e.target.closest('.song_info_in_playlist:not(.glassmorphismB)');
            let condition2 = e.target.closest('.love_song_playlist');
            const tym_rong = icon_tym.children[0];
            const tym_dac = icon_tym.children[1];
            if (condition1 || condition2) {
                if(condition1) {
                    // console.log(condition1.getAttribute('data'));
                    _this.currentIndex = Number(condition1.getAttribute('data'));
                    if(icon.className.includes('fa-play')) {
                        let i1 = document.createElement('i');
                        i1.classList.add('fa-solid');
                        i1.classList.add('fa-pause');
                        player.replaceChild(i1, icon);
                        _this.isPlaying = false;                    
                    }
                    if(tym_dac.className.includes('none_active_icon') == false) {
                        tym_dac.classList.add('none_active_icon');
                        tym_rong.classList.remove('none_active_icon');
                    }
                    img_song.play();
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();
                    
                }
            }
        };
    },
    start: function() {
        this.defineProperties();
        this.loadCurrentSong();
        this.handelEvent();
        this.render();
    }
}

app.start();
