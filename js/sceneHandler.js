const scenes = document.querySelectorAll('.scene');
let currentSceneIndex = 0;

function showScene(index) {
	for (var i = 0; i < scenes.length; i++) {
		const scene = scenes[i];
        //scene.style.transform = "translateX(${(i - index) * 100}%)"; // Move scenes horizontally
        scene.style.transform = `translateX(${(i - index) * 100}%)`;
    }

    console.log("Show Scene: " + index);
    currentSceneIndex = index;
}

// Swipe Right (Next Scene)
function swipeRight() {
    if (currentSceneIndex < scenes.length - 1) {
        showScene(currentSceneIndex + 1);
    }
    console.log("Swipe Right");
}

// Swipe Left (Previous Scene)
function swipeLeft() {
    if (currentSceneIndex > 0) {
        showScene(currentSceneIndex - 1);
    }

    console.log("Swipe Left");
}

// Initial setup
showScene(currentSceneIndex); // Show the initial scene

// Event listeners for swipe gestures (you can use touch events or libraries for this)
document.addEventListener('swipeRight', swipeRight);
document.addEventListener('swipeLeft', swipeLeft);

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            console.log('Left key');
            swipeLeft();
            break;
        case 38:
            console.log('Up key');
            break;
        case 39:
            console.log('Right key');
            swipeRight();
            break;
        case 40:
            console.log('Down key');
            break;
    }
};