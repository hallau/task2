/**
 * Created by galov on 05.05.2016.
 */
var player;
var videoList;
var source;


function initPlayer(config) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            videoList = JSON.parse(xmlhttp.responseText);
            player = document.getElementById(config.playerId);
            source = document.createElement('source');
            player.appendChild(source);
            metaInfo = document.createElement("div");
            setVideo(0);
            if (config.playlistId) {
                initPlaylist(config.playlistId);
            }
        }
    };
    xmlhttp.open("GET", config.url, true);
    xmlhttp.send();
}


function setVideo(index) {
    player.pause();
    player.setAttribute("poster", videoList[index].images.placeholder);
    source.setAttribute('src', videoList[index].streams[0].url);
    metaInfo.innerHTML = geneterateMetaInfo(index);
    player.parentNode.insertBefore(metaInfo, player.nextSibling);
    player.load();
}

function initPlaylist(id) {
    var playlist = document.createElement('ul');
    document.getElementById(id).appendChild(playlist);
    var covers = [];
    videoList.forEach(function (video, i, videoList) {
        covers[i] = document.createElement("li");
        covers[i].setAttribute("onClick", "setVideo(" + i + ")");
        playlist.appendChild(covers[i]);
        var img = document.createElement('img');
        img.setAttribute("src", videoList[i].images.cover)
        var linkInfo = document.createElement("a");
        linkInfo.innerHTML = videoList[i].title + "<br>(" + videoList[i].meta.releaseYear + ")";
        var br = document.createElement("br");
        covers[i].appendChild(img);
        covers[i].appendChild(br);
        covers[i].appendChild(linkInfo);
    });

}

function geneterateMetaInfo(index){
    var directors ="";
    var arr = videoList[index].meta.directors;
    arr.forEach(function (director, i, arr){
        directors += director.name + "&nbsp"
    })
    return "<div class = 'meta-info'>" +
        "<h2>" + videoList[index].title+"("+videoList[index].meta.releaseYear+")</h2>" +
        "<p>Directors: <span>"+directors+"</span> </p>" +
        "</div>";
}