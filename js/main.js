const DEBUG = false;
const stepCount = document.getElementById('step-count');

window.onload = function () {
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
	// Initialize the animal
	initializeAnimal();
	
}

function getStepCountToday() {
    var stepCount = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day (midnight)

    // Request step count data
    //tizen.humanactivitymonitor.getHumanActivityData(
    //    "PEDOMETER",
    //    {
    //        startTime: today,
    //        endTime: new Date(),
    //        interval: "DAILY"
    //    },
    //    onStepCountSuccess,
    //    onStepCountError
    //);
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

