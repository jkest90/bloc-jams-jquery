// This file declares a class, Player, instantiates it, and assigns it to a global player variable.

class Player {

    //-- Set initial values for the currentlyPlaying, playState, volume, and soundObject properties.
    constructor() {
        this.currentlyPlaying = album.songs[0];
        this.playState = 'stopped';
        this.volume = 80;
        //soundObject instantiates a new buzz.sound object using the soundFileUrl property of this.currentlyPlaying.
        // buzz.sound is a from the Buzz! library.
        this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }

    getDuration() {
        // get total duration of audio file (in seconds)
        return this.soundObject.getDuration();
    }

    getTime() {
        // get current time of audio file (in seconds)
        return this.soundObject.getTime();
    }

    // 1) If we click on the #play-pause button alone, this.currentlyPlaying, by default, is the first song in the album array.
    // 2) Since we are just clicking on the play button, and not actually passing in a song into playPause(), we have not altered playState yet. It is defaulted to 'stopped' and triggers the second if statement - which will play album.songs[0] and set its playState to 'playing'.
    // 3) album.songs[0] is still set to this.currentlyPlaying. If we click on album.songs[2], the song we're passing into playPause is not equal to this.currentlyPlaying, so it triggers the first if statement: First, stopping album.songs[0] from playing. Second, it sets this.currentlyPlaying to the song we clicked on, album.songs[2], and sets this.playState to 'stopped'. Finally it instantiates a new soundObject based off of soundFileUrl of album.songs[2].
    // 4) Now that this.playState is set to stopped when we choose a different song, it triggers the second if statement: First playing the soundObject, and then setting the playState to 'playing'.
    // 5) Since this.playState is now set to 'playing', if we click on the song again or click on the play-pause button, it will trigger the else statement, pausing the current song, and setting this.playState to paused.

    // --- TL;DR
    // If we load the page and first click the play-button, or on the first song (album.songs[0]), the default value of this.playState = 'stopped' triggers the SECOND if statement,  playing the song and setting the playState to playing.
    // If we load the page and click any of the other songs, the song passed into playPause via our click handler differs from our default value where this.currentlyPlaying = album.songs[0]. Even if nothing is playing, it will stop the current song, set this.playState to 'stopped', and set this.currentlyPlaying to whichever song was chosen. A playState of 'stopped' triggers the second if statement that plays the current song and sets the playState to playing.
    //  If a song has a playState of 'playing', and the same element, or the play-button is clicked, it will pause that song, and set the playState to paused. If clicked again, it will trigger the second if statement, setting this.playState to 'playing', etc.

    playPause(song = this.currentlyPlaying) {
        // 'element' is the HTML string property we defined in our forEach statement to represent each item in the songs array.

        if (this.currentlyPlaying !== song) {
        // If this.currentlyPlaying (default: album.songs[0]) !== the song being clicked on/passed into playPause:
        // Stop the currently playing sound file (even if nothing is playing)
            this.soundObject.stop();
        // Clear classes on the song that's currently playing.
            this.currentlyPlaying.element.removeClass('playing paused');

        // Update our currentlyPlaying and playState properties:
            this.currentlyPlaying = song;
            this.playState = 'stopped';
            this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
        }
        if (this.playState === 'paused' || this.playState === 'stopped') {
        // if called & playState is paused or stopped, play the sound object, set the playState to 'playing', and add the 'playing' class
            this.soundObject.setVolume(this.volume);
            this.soundObject.play();
            this.playState = 'playing';
            this.currentlyPlaying.element.removeClass('paused').addClass('playing');
        } else {
        // if called & a song is playing, with a playState of 'playing', pause it, set the playState to 'pause', and add a class of 'paused'
            this.soundObject.pause();
            this.playState = 'paused';
            this.currentlyPlaying.element.removeClass('playing').addClass('paused');
        }
    }

    skipTo(percent) {
        if (this.playState !== 'playing') { return; }
        this.soundObject.setTime((percent / 100) * this.soundObject.getDuration());
    }

    setVolume(percent) {
        this.volume = percent;
        this.soundObject.setVolume(percent);
    }
}

const player = new Player();
