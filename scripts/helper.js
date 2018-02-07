class Helper {

    playPauseAndUpdate(song = player.currentlyPlaying) {
        player.playPause(song);
        // const totalTime = player.getDuration();
        $('#time-control .total-time').text(player.prettyTime(song.duration));
    }


}

const helper = new Helper();
