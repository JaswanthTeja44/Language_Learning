const languageData = {
    es: {
      flashcards: ['Hello - Hola', 'Thank you - Gracias', 'Please - Por favor', 'Goodbye - Adiós', 'Yes - Sí', 'No - No'],
      quiz: [
        { question: "What is the Spanish word for 'Thank you'?", answer: "gracias" },
        { question: "What is the Spanish word for 'Goodbye'?", answer: "adiós" }
      ],
      langCode: 'es-ES'
    },
    fr: {
      flashcards: ['Hello - Bonjour', 'Thank you - Merci', 'Please - S’il vous plaît', 'Goodbye - Au revoir', 'Yes - Oui', 'No - Non'],
      quiz: [
        { question: "What is the French word for 'Please'?", answer: "s’il vous plaît" },
        { question: "What is the French word for 'No'?", answer: "non" }
      ],
      langCode: 'fr-FR'
    },
    de: {
      flashcards: ['Hello - Hallo', 'Thank you - Danke', 'Please - Bitte', 'Goodbye - Auf Wiedersehen', 'Yes - Ja', 'No - Nein'],
      quiz: [
        { question: "What is the German word for 'Yes'?", answer: "ja" },
        { question: "What is the German word for 'Please'?", answer: "bitte" }
      ],
      langCode: 'de-DE'
    },
    hi: {
      flashcards: ['Hello - Namaste', 'Thank you - Dhanyavaad', 'Please - Kripya', 'Goodbye - Alvida', 'Yes - Haan', 'No - Nahi'],
      quiz: [
        { question: "What is the Hindi word for 'Thank you'?", answer: "dhanyavaad" },
        { question: "What is the Hindi word for 'Yes'?", answer: "haan" }
      ],
      langCode: 'hi-IN'
    },
    te: {
      flashcards: ['Hello - Namaskaram', 'Thank you - Dhanyavaadamulu', 'Please - Dayachesi', 'Goodbye - Vellostanu', 'Yes - Avunu', 'No - Kaadu'],
      quiz: [
        { question: "What is the Telugu word for 'Thank you'?", answer: "dhanyavaadamulu" },
        { question: "What is the Telugu word for 'Hello'?", answer: "namaskaram" }
      ],
      langCode: 'te-IN'
    }
  };

  let currentLang = 'es';
  let flashcardIndex = 0;
  let quizIndex = 0;

  function changeLanguage() {
    currentLang = document.getElementById('language-select').value;
    flashcardIndex = 0;
    quizIndex = 0;
    updateFlashcard();
    updateQuiz();
    document.getElementById('quiz-answer').value = '';
    document.getElementById('quiz-feedback').textContent = '';
  }

  function updateFlashcard() {
    document.getElementById('flashcard-text').textContent = languageData[currentLang].flashcards[flashcardIndex];
  }

  function nextFlashcard() {
    const flashcards = languageData[currentLang].flashcards;
    flashcardIndex = (flashcardIndex + 1) % flashcards.length;
    updateFlashcard();
  }

  function updateQuiz() {
    const question = languageData[currentLang].quiz[quizIndex];
    document.getElementById('quiz-question').textContent = question.question;
    document.getElementById('quiz-answer').value = '';
    document.getElementById('quiz-feedback').textContent = '';
  }

  function nextQuiz() {
    quizIndex = (quizIndex + 1) % languageData[currentLang].quiz.length;
    updateQuiz();
  }

  function checkAnswer() {
    const userAnswer = document.getElementById('quiz-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('quiz-feedback');
    const correctAnswer = languageData[currentLang].quiz[quizIndex].answer;
    if (userAnswer === '') {
      feedback.textContent = 'Please enter an answer.';
      feedback.style.color = 'orange';
      return;
    }
    if (userAnswer === correctAnswer.toLowerCase()) {
      feedback.textContent = 'Correct!';
      feedback.style.color = 'lightgreen';
    } else {
      feedback.textContent = `Incorrect. The correct answer is '${correctAnswer}'.`;
      feedback.style.color = 'salmon';
    }
  }

  function speakWord() {
    const word = document.getElementById('word').value;
    if (!word.trim()) {
      alert('Please enter a word to pronounce.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = languageData[currentLang].langCode;
    speechSynthesis.speak(utterance);
  }