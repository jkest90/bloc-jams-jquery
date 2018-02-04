
{
    // select button with ID of play-pause and add a click event.
    $('button#play-pause').on('click', function() {
        // call the playPause() method to stop or play the song
        player.playPause();
        // add an attribute called playState and set it to player.playState.
        // on each click, playPause() will set player.playState to 'paused', 'playing', or 'stopped', and add/remove the appropriate class to display the related symbol.
        $(this).attr('playState', player.playState);
    });

    $('button#next').on('click', function() {
        if (player.playState !== 'playing') { return; }

        const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
        const nextSongIndex = currentSongIndex + 1;
        if (nextSongIndex >= album.songs.length) { return; };

        const nextSong = album.songs[nextSongIndex];
        player.playPause(nextSong);
    });

    $('button#previous').on('click', function() {
        if (player.playState !== 'playing') { return; }

        const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
        const prevSongIndex = currentSongIndex - 1;
        if (prevSongIndex < 0) { return; };

        const prevSong = album.songs[prevSongIndex];
        player.playPause(prevSong);
    })

}
