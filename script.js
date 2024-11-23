// Initialize Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;

// Handle the speech recognition results
recognition.onresult = async (event) => {
  let transcript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  // Display the transcribed text in the output div
  document.getElementById('output').innerText = transcript;

  // Get the selected display language
  const displayLang = document.getElementById('display-language-select').value;
  
  // Translate the transcript to the selected language
  const translatedText = await translateText(transcript, displayLang);

  // Display the translated text
  document.getElementById('output').innerText = translatedText;

  // Call the function to display sign language (for now it's just a placeholder)
  displaySignLanguage(translatedText);
};

// Stop recognition when speech ends
recognition.onspeechend = () => {
  recognition.stop();
};

// Handle recognition errors
recognition.onerror = (event) => {
  console.error(event.error);
};

// Start the recognition process
function startRecognition() {
  const selectedLang = document.getElementById('language-select').value;
  recognition.lang = selectedLang;
  recognition.start();
}

// Translation function (simulated for demo purposes)
async function translateText(text, targetLang) {
  const translations = {
    es: {
      "Hello": "Hola",
      "How are you?": "¿Cómo estás?",
      "Good morning": "Buenos días",
      "What is your name?": "¿Cómo te llamas?",
      // Add more translations as needed
    },
    en: {
      "Hola": "Hello",
      "¿Cómo estás?": "How are you?",
      "Buenos días": "Good morning",
      "¿Cómo te llamas?": "What is your name?",
      // Add more translations as needed
    },
    // Add other languages here
  };

  // Return the translated text or the original text if not found in the dictionary
  return translations[targetLang][text] || text;
}

// Function to display sign language (Placeholder for now)
function displaySignLanguage(text) {
  const signLanguageElement = document.getElementById('sign-language-output');
  
  // Example: Display a simple message for now
  signLanguageElement.innerHTML = `<p>Sign Language for: ${text}</p>`;

  // Replace this with real sign language generation in the future
}
