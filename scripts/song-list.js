/*-------------CHECKPOINT 217------------------>
----------------------------------------------->

------ Pseudocode Example -------->
forEach album.song as song
    songElement =
    <tr>
        <td> index+1 </td>
        <td> song.title </td>
        <td> song.duration </td>
    </tr>
    append song_element to #song-list
end forEach
----------------------------------->

---> ACCEPTANCE CRITERIA #1:
   #1) I see a list of the album's songs.
     a) Iterate over each song in the album.songs array.
     b) For each song, create a new jQuery object and assign it to song.element so Player object can access it.
     c) Pass it a template literal so we can insert data directly into the string. Tell JS to parse <td> inputs as JS using ${ }.
     d) Append each song.element to #song-list.

---> ACCEPTANCE CRITERIA #2 & #3:
   #2) When I click a song, it plays
   #3) When I click on a playing song, it pauses.
     a) Add a click event on each song element and call the .playPause() method on it, passing in the song object.

---> ACCEPTANCE CRITERIA #4, #5, & #6:
   #4) When I hover over a song, it displays a "play" button in place of the song number.
   #5) The currently playing song displays a "pause" button in place of the song number.
   #6) A paused song displays a "play" button in palce of the song number.
     a) Use CSS to hide and unhide classes. Avoid DOM manipulation whenever feasible, due to issues of scalability & performance.
     b) Add ionicon play and pause icons to table row, wrapped in button.*/

{

    album.songs.forEach((song, index) => {
        song.element = $(`
            <tr>
                <td>
                    <button>
                        <span class="song-number">${index+1}</span>
                        <span class="ion-play"></span>
                        <span class="ion-pause"></span>
                    </button>
                </td>
                <td>${song.title}</td>
                <td>${song.duration}</td>
            </tr>
        `);

        song.element.on('click', event => {
            player.playPause(song);
        });

        $('#song-list').append(song.element);
    });
}
