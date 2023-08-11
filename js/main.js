const DEBUG = false;
const stepCount = document.getElementById('step-count');

//## Animal ##
const animalImage = document.getElementById('animal-img');
var isJumping = false;
var happynessLevel = 100;
var happynessTapCount = 0;
var happynessTapGoal = 0;
var happynessTapMin = 1;
var happynessTapMax = 2;


window.onload = function () {
    // TODO:: Do your initialization job
	start();

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back") {
        	try {
        		tizen.application.getCurrentApplication().exit();
        	} catch (ignore) { /* Do Something */ }
        }
	});
    
    getStepCountToday();
};

function start() {
	happynessTapGoal = getRandomNumber(happynessTapMin, happynessTapMax);
}

animalImage.addEventListener('click', onAnimalTap);
function onAnimalTap() {
    happynessTapCount++;
    stepCount.textContent = happynessTapCount;

    if (happynessTapCount === happynessTapGoal) {
        happynessTapGoal = getRandomNumber(happynessTapMin, happynessTapMax);
        happynessTapCount = 0;
        startHearts();
       
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



function getStepCountToday() {
    var stepCount = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day (midnight)

    // Request step count data
    tizen.humanactivitymonitor.getHumanActivityData(
        "PEDOMETER",
        {
            startTime: today,
            endTime: new Date(),
            interval: "DAILY"
        },
        onStepCountSuccess,
        onStepCountError
    );
}

function onStepCountSuccess(stepData) {
    if (stepData.length > 0) {
        // Retrieve the step count for today
        var todayStepData = stepData[0];
        var stepCount = todayStepData.accumulativeTotalStepCount;
        console.log("Step Count Today: " + stepCount);
    } else {
        console.log("Step count data not available for today.");
    }
}

function onStepCountError(error) {
    console.error("Error occurred while retrieving step count: " + error.message);
}

// Call the function to get the step count when needed (e.g., on app load)

