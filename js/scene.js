const scenes = document.querySelectorAll('.scene');
let currentSceneIndex = 1;
let prevSceneIndex = 0;

let walkbackInterval;
let sceneTransition = 'transform 0.5s ease-in-out';
let animalWalkBackTransition = 'transform 2.0s linear';

function showScene(index) {
    console.log("Show Scene: " + index);
	for (var i = 0; i < scenes.length; i++) {
		const scene = scenes[i];
        if (scene.classList.contains('ui-scene')) {
            // Handle UI scene differently
        } else {
            scene.style.transform = `translateX(${(i - index) * 100}%)`;
        }
    }
    
    prevSceneIndex = currentSceneIndex;
    currentSceneIndex = index;
    moveAnimalToPosition();
}

// Function to move the animal to the specified position
function moveAnimalToPosition() {
    // After a delay, move the animal back to the center
    if (walkbackInterval != null) {
        clearInterval(walkbackInterval);
    }
    
    // Apply the new left position to the animal
    if (!scenes[prevSceneIndex].classList.contains('ui-scene')) {
        console.log("move");
        let direction = -(currentSceneIndex - prevSceneIndex);
        let position = (200 * direction);

        animalImage.style.transition = sceneTransition;
        animalImage.style.transform = `translateX(${position}%)`;

    } else if (scenes[prevSceneIndex].classList.contains('ui-scene')) {
        animalImage.style.transition = sceneTransition;
        animalImage.style.transform = `translateX(0%)`;
    }

    if (!scenes[currentSceneIndex].classList.contains('ui-scene')) {
        walkbackInterval = setTimeout(() => {
            animalImage.style.transition = animalWalkBackTransition;

            let randomX = 0;//getRandomNumber(-25, 25)
            animalImage.style.transform = `translateX(${randomX}%)`;
        }, 750);
    }
    // After the animation duration, remove the walk animation class
    //setTimeout(() => {
    //    animalImage.classList.remove('walk-animation');
    //}, 1000);
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
showScene(currentSceneIndex);
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