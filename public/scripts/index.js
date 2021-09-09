function getRandomImageNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBackgroundImage(){
    const imgUrl = `images/download-${getRandomImageNumber(0, 10)}.jpg`;
    console.log(imgUrl)
    //grab the body element & set the img
    console.log(document.getElementById("main-body"))
    document.getElementById("main-body").style.backgroundImage = `url(${imgUrl})`;
}

function onPageLoad(){
    setBackgroundImage()
}

onPageLoad()