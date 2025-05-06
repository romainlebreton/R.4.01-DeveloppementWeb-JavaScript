const loadingAnimation = document.querySelector("#loading");
let oldTime = getTime();

/// for convenience later
function getTime() {
    return (new Date()).getTime();
}

function rotateLoadingAnimation() {
    let newTime = getTime(); /// get new time
    let diff = newTime - oldTime; /// calc diff between old and new time
    // oldTime = newTime;

    let turn = diff / 5000;
    loadingAnimation.style.transform = `rotate(${turn}turn)`;
    requestAnimationFrame(rotateLoadingAnimation);
}

requestAnimationFrame(rotateLoadingAnimation);