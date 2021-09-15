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

// onPageLoad();  ADD BACK IF BACKGROUND SVG FAILS