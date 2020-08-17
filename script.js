///////event listener function///////
document.getElementById('search-music').addEventListener('click', searchMusic);

////////search song function///////////
function searchMusic(){
    document.getElementById('all-results').innerHTML = '';
    document.getElementById('lyrics').innerHTML = '';
    const inputMusic = document.getElementById('input-music');
    const keyword = inputMusic.value;
    fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
    .then(res => res.json())
    .then(data => {   
        storedData = data;
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const artistName = data.data[i].artist.name;
            const id = data.data[i].id;
            document.getElementById('all-results').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                    <div class="col-md-6">
                                                                        <h3 class="lyrics-name">${title}</h3>
                                                                        <p class="author lead">Album by <span>${artistName}</span></p>
                                                                    </div>
                                                                    <div class="col-md-6 text-md-right text-center">
                                                                        
                                                                        <a href="#lyrics"><button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button></a>
                                                                    </div>
                                                                </div>`
            if(i == 9){
                break;
            }   
        }
        
    })
}
//////get lyrics function/////////////
function getLyrics(id){
    for (let i = 0; i < 10; i++) {
        if(storedData.data[i].id == id){
            const artistName = storedData.data[i].artist.name;
            const songTitle = storedData.data[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
                if(lyrics == undefined){
                    lyrics = `Lyrics Not Found`;
                }
                
                document.getElementById('lyrics').innerHTML = `<div class="single-lyrics text-center">
                                                                            
                                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                            <h5>${lyrics}</h5>
                                                                            <button class="btn btn-success"><a class="nav-link text-white" href="#">Go Top <span class="sr-only">(current)</span></a></button>
                                                                            <button class="btn btn-success" onClick="goBack()"><a class="nav-link text-white" href="#">Go Back<span class="sr-only">(current)</span></a></button>
                                                                        </div>`
            })
    }
    } 
    document.getElementById("all-results").style.display= "none"
}
function goBack(){
    document.getElementById("all-results").style.display= "block"
    document.getElementById("lyrics").style.display= "none"

}
