function getRandomImageNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBackgroundImage(){
    const imgUrl = `images/download-${getRandomImageNumber(0, 10)}.jpg`;
    //grab the body element & set the img
    document.getElementById("main-body").style.backgroundImage = `url(${imgUrl})`;
}

function onPageLoad(){
    setBackgroundImage()
}

onPageLoad();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.4226, lng: -122.0829 },
      zoom: 12,
    });
    new google.maps.Marker({
      position: { lat: 37.4226, lng: -122.0829 },
      map: map,
      title: "Event Location"
    });
}