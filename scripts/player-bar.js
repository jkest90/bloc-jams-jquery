
{
    // -- Select button with ID of play-pause and add a click event.
    $('button#play-pause').on('click', function() {
        // call the playPause() method to stop or play the song
        helper.playPauseAndUpdate();
        // add an attribute called playState and set it to player.playState.
        // on each click, playPause() will set player.playState to 'paused', 'playing', or 'stopped', and add/remove the appropriate class to display the related symbol.
        $(this).attr('playState', player.playState);
    });

    // -- If playing, when the next button is clicked, take index of the current song, add 1, and play the next song in the albums array.
    // -- If the last song in the array is currently playing, do nothing.
    $('button#next').on('click', function() {
        // if playState !== 'playing', return
        if (player.playState !== 'playing') { return; }
        // get the index of the song that is currently playing and add 1
        const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
        const nextSongIndex = currentSongIndex + 1;
        // if index of current song's index is greater than or equal to the length of the albums array, return and do nothing.
        if (nextSongIndex >= album.songs.length) { return; };

        const nextSong = album.songs[nextSongIndex];
        helper.playPauseAndUpdate(nextSong);
    });

    $('button#previous').on('click', function() {
        if (player.playState !== 'playing') { return; }

        const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
        const prevSongIndex = currentSongIndex - 1;
        if (prevSongIndex < 0) { return; };

        const prevSong = album.songs[prevSongIndex];
        helper.playPauseAndUpdate(prevSong);
    });

    // -- Checkpoint 2.20
    // 1) Update the values of the range inputs to reflect the values for song position and volume.
    // 2) Respond to changes in the range inputs by the user, and update the values for song position and volume accordingly.



    // -- Create an event that responds to any changes on #time-control's input range.
    $('#time-control input').on('input', function(event) {
        // skipTo takes the input range's percentage and converts it to seconds based on the song's total duration.
        // When an input event has occured, it sets the time that is currently playing to this value.
        player.skipTo(event.target.value);
    });

    // -- While a song is playing, update the current time, .current-time, once per second to reflect the current time of the song.
    //Using setInterval, specify 1000 milliseconds as the second parameter (1000ms = 1s). The callback function will excute once every second.
    setInterval( () => {
        if (player.playState !== 'playing') { return; }
        // since input's range is 0-100, must convert current time into a % of the total time before applying to range.
        // percent = (part / whole) * 100. getTime() = part; getDuration() = whole.
        const currentTime = player.getTime();
        const currentTimePretty = player.prettyTime(player.getTime());
        const duration = player.getDuration();
        const percent = (currentTime / duration) * 100;
        $('#time-control .current-time').text(currentTimePretty);
        $('#time-control input').val(percent);
        // const roundedTime = Math.floor(currentTime)
    }, 1000);

    // -- On an input event for #volume-control set the volume equal to the input's target value.
    $('#volume-control input').on('input', function(event) {
        player.setVolume(event.target.value);
    });

    // -- Update total time, .total-time, each time we change the song.


}
