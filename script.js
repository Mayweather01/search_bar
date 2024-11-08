// Get time elements
const nigeriaTime = document.getElementById('nigeria-time');
const usaTime = document.getElementById('usa-time');
const londonTime = document.getElementById('london-time');

// Get weather elements
const nigeriaWeather = document.getElementById('nigeria-weather');
const usaWeather = document.getElementById('usa-weather');
const londonWeather = document.getElementById('london-weather');

// Fetch weather data
const getWeather = async (city, element) => {
  const apiKey = 'c4eff885e050bc079f6d76eeb4c84f08'; // Replace with your weather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      element.textContent = `🌡️ ${data.main.temp}°C | ${data.weather[0].description}`;
    } else {
      element.textContent = 'Weather unavailable';
    }
  } catch (error) {
    element.textContent = 'Unable to fetch weather';
  }
};

// Update clocks
const updateClocks = () => {
  const now = new Date();

  // Nigeria Time
  const nigeriaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
  nigeriaTime.textContent = nigeriaDate.toLocaleTimeString();

  // USA Time (New York)
  const usaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  usaTime.textContent = usaDate.toLocaleTimeString();

  // London Time
  const londonDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  londonTime.textContent = londonDate.toLocaleTimeString();
};

// Hourly Voice Announcements
const hourlyAnnouncement = () => {
  const now = new Date();
  if (now.getMinutes() === 0 && now.getSeconds() === 0) {
    const nigeriaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
    const usaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const londonDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));

    const nigeriaMessage = `The time in Nigeria is ${nigeriaDate.toLocaleTimeString()}`;
    const usaMessage = `The time in the USA is ${usaDate.toLocaleTimeString()}`;
    const londonMessage = `The time in London is ${londonDate.toLocaleTimeString()}`;

    const speak = (message) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Female'));
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    };

    speak(nigeriaMessage);
    setTimeout(() => speak(usaMessage), 3000); // Wait 3 seconds
    setTimeout(() => speak(londonMessage), 6000); // Wait 6 seconds
  }
};

// Initialize
setInterval(updateClocks, 1000); // Update every second
setInterval(hourlyAnnouncement, 1000); // Check every second for hourly announcement

// Fetch Weather
getWeather('Lagos', nigeriaWeather);
getWeather('New York', usaWeather);
getWeather('London', londonWeather);
