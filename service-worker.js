self.addEventListener("install", (event) => {
    console.log("Service Worker installed");
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker activated");
  });
  
  self.addEventListener("push", (event) => {
    const options = {
      body: "💧 Time to drink water!",
      icon: "icon.png",
      vibrate: [200, 100, 200],
    };
    event.waitUntil(
      self.registration.showNotification("Water Reminder", options)
    );
  });
  
