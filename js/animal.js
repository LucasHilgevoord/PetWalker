//## Animal ##
const animalImage = document.getElementById('animal-img');
var animalInitialLeft = 50;

var isJumping = false;
var happynessLevel = 100;
var happynessTapCount = 0;
var happynessTapGoal = 0;
var happynessTapMin = 1;
var happynessTapMax = 2;

function initializeAnimal() {
    happynessTapGoal = getRandomNumber(happynessTapMin, happynessTapMax);
    startIdle();
    
}

animalImage.addEventListener('click', onAnimalTap);
function onAnimalTap() {
    happynessTapCount++;
    stepCount.textContent = happynessTapCount;

    console.log("Tap animal");

    if (happynessTapCount === happynessTapGoal) {
        happynessTapGoal = getRandomNumber(happynessTapMin, happynessTapMax);
        happynessTapCount = 0;
        //startHearts();
    } else {
        jumpAnimal();
    }
}

function startHearts() {
	const intervalId = setInterval(createHeart, 200);
	setTimeout(() => {
	    clearInterval(intervalId);
	}, 5000);
}

function createHeart() {
//    const heart = document.createElement("div");
//    heart.classList.add("heart");
//    heart.style.left = "50%"; // Center the heart horizontally
//    heart.style.top = "12%"; // Center the heart vertically
//    heart.style.transform = "translate(-50%, -50%)";
//    heart.style.left = Math.random() * 25 + "%";
//    document.getElementById("heart-container").appendChild(heart);
//
//    // Remove the heart from the DOM after the animation is complete
//    heart.addEventListener("animationend", () => {
//        heart.remove();
//    });
	
    var heart = document.createElement("div");
    heart.classList.add("heart");
    
    var containerWidth = document.getElementById("animal-container").offsetWidth;
    const maxOffset = containerWidth * 0.30; // 25% of the container's width

    const randomOffset = Math.random() * maxOffset * 2 - maxOffset; // Generate a random value between -25% and +25%
    const offsetX = 50 + (randomOffset / containerWidth) * 50;

    heart.style.left = offsetX + "%"; // Set the left position with the calculated offsetX value
    heart.style.top = "12%"; // Center the heart vertically
    heart.style.transform = "translate(-50%, -50%)"; // Center the heart absolutely
    
    document.getElementById("heart-container").appendChild(heart);

    // Remove the heart from the DOM after the animation is complete
    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}

//Function to make the animal jump
function jumpAnimal() {
	if (isJumping) { return; }
	isJumping = true;
    animalImage.style.transform = 'scaleY(0.9)';
    setTimeout(() => {
        animalImage.style.transform = 'translateY(-30px) scaleY(1.1)';
        setTimeout(() => {
            animalImage.style.transform = 'translateY(0px) scaleY(1)';
            setTimeout(() => { isJumping = false; }, 200);
        }, 200);
    }, 200);
}

function walkAnimal(xPos) {
    setAnimation('walkAnimation', '1s', 'steps(8)', 'infinite');
    animalImage.style.transform = `translateX(${xPos}%)`;
}

function startIdle() {
    setAnimation('idleAnimation', '1s', 'steps(10)', 'infinite');
}

function setAnimation(animationName, duration, timingFunction, iterationCount) {
    animalImage.style.animationName = animationName;
    animalImage.style.animationDuration = duration;
    animalImage.style.animationTimingFunction = timingFunction;
    animalImage.style.animationIterationCount = iterationCount;
}