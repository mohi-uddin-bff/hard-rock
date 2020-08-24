const searchSong = 'https://api.lyrics.ovh/suggest/';
        const searchLyrics = 'https://api.lyrics.ovh/v1/'
        const api = { searchSong, searchLyrics };
            
                function search() {
                    
                    const titleName = document.getElementById("search-title").value;
                    fetch(`${api.searchSong}${titleName}`)
                    .then(res => res.json())
                    .then(data => {
                        const resultContainer = document.getElementById('result');
                        resultContainer.innerHTML = '';
                        for (let i = 0; i < 10; i++) {
                            const song = data.data[i];
                            console.log(data.data);
                            const resultList = document.createElement('div');
                            
                            resultList.innerHTML = `<div class="total-result row align-items-center my-3 p-3">
                                                         <div class="col-md-5">
                                                         <h3 id="title" class="lyrics-name">${song.title}</h3>
                                                         <p id="artist" class="author lead">Album by <span>${song.artist.name}</span></p>
                                                         </div>
                                                         <div class="col-md-4">
                                                         <audio controls src = "${song.preview}"></audio>
                                                         </div>
                                                         <div class="col-md-3 text-md-right text-center">
                                                         <button onclick = "getLyrics('${song.artist.name}' , '${song.title}')" class="btn btn-success">Get Lyrics</button>
                                                         </div>
                                                         </div>`
                            resultContainer.appendChild(resultList);
                        }
                    })
                }

                

                function getLyrics(artist, title) {
                    
                    fetch(`${api.searchLyrics}${artist}/${title}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        const lyricsContainer = document.getElementById('songLyrics');
                        lyricsContainer.innerHTML = '';
                        const lyrics = document.createElement('div');
                            lyrics.innerHTML = `<h2 class="text-success mb-4">${title} - ${artist}</h2>
                                                <pre class="lyric text-white">
                                                    ${data.lyrics}
                                                </pre>`
                            lyricsContainer.appendChild(lyrics);
                    })
                }