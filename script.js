

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered successfully", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
}
requestNotificationPermission();

document.getElementById("set-goal").addEventListener("click", function () {
  const age = parseInt(document.getElementById("age").value);
  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);

  if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
    alert("Please enter valid details!");
    return;
  }

  const recommendedWater = weight * 30; 
  document.getElementById("recommended-goal").textContent = `${recommendedWater} ml`;
  setWaterGoal(recommendedWater);
});

let dailyGoal = 0;

function setWaterGoal(goal) {
  dailyGoal = goal;
  document.getElementById("progress").style.width = "0%";
  document.getElementById("progress-text").textContent = `0 / ${goal} ml`;
}

// Log water intake
document.getElementById("log-water").addEventListener("click", function () {
  const waterIntake = parseInt(document.getElementById("water-intake").value);

  if (isNaN(waterIntake) || waterIntake <= 0) {
    alert("Please enter a valid water intake amount.");
    return;
  }

  const progressElement = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");

  const currentProgress = parseInt(progressText.textContent.split(" ")[0]);
  const newProgress = currentProgress + waterIntake;

  if (newProgress > dailyGoal) {
    alert("You have already met your goal for today!");
    return;
  }

  const progressPercentage = (newProgress / dailyGoal) * 100;
  progressElement.style.width = `${progressPercentage}%`;
  progressText.textContent = `${newProgress} / ${dailyGoal} ml`;
});

let reminderInterval = null;

document.getElementById("set-reminder").addEventListener("click", function () {
  const reminderTime = parseInt(document.getElementById("reminder-time").value);

  if (isNaN(reminderTime) || reminderTime <= 0) {
    alert("Please enter a valid interval in minutes!");
    return;
  }

  if (reminderInterval) {
    clearInterval(reminderInterval);
  }

  reminderInterval = setInterval(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("💧 Time to drink water!", {
        body: "Stay hydrated for better health!",
        icon: "icon.png", 
        vibrate: [200, 100, 200],
      });
    });
  }, reminderTime * 60 * 1000);

  document.getElementById("reminder-status").textContent = `Reminder set for every ${reminderTime} minutes.`;
});
window.addEventListener("beforeunload", function () {
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }
});
