// Global variables
let currentPage = "etusivu"
let currentModuleSection = "moduuli1"
const currentQuestion = 0
let selectedVerb = ""
let currentLanguage = "fi"
const matchedWords = []
let currentVocabItem = null
let currentExercise = "A"

const questions = [
  {
    text: "Hei! Tämä on mukava kahvila. Tässä kahvilassa on itsepalvelu. Se tarkoittaa, että sinä voit ottaa kahvia tai teetä itse. Kuvassa on paljon kaikkea sellaista, mitä tarvitset kahvilassa. Etsi minulle kuvasta seuraavat tavarat:",
    item: null,
    type: "intro",
  },
  {
    text: "Ensin helppo sana. Missä on kahviautomaatti?",
    item: "kahviautomaatti",
    type: "question",
    correctFeedback:
      "Joo, se on kahviautomaatti. Sinä voit valita, millaista kahvia haluat. Otatko maitokahvia, espressoa vai jotain muuta? Minä tykkään tavallisesta mustasta kahvista.",
    incorrectFeedback: "Se ei ole kahviautomaatti. Kahviautomaatti on iso ja musta kone.",
  },
  {
    text: "Tiedätkö, missä on vedenkeitin?",
    item: "vedenkeitin",
    type: "question",
    correctFeedback:
      "Kyllä, se on valkoinen vedenkeitin. Tämän vedenkeittimen merkki on Smeg. Vedenkeitin on tosi hyödyllinen, koska voit keittää sillä kuumaa vettä nopeasti.",
    incorrectFeedback: "Se ei ole vedenkeitin. Vedenkeitin on valkoinen.",
  },
  {
    text: "Missä on kahvitermos?",
    item: "kahvitermos",
    type: "question",
    correctFeedback:
      "Juu, se on kahvitermos. Tässä kahvilassa onkin kaksi kahvitermosta. Termoksessa on kuumaa kahvia.",
    incorrectFeedback: "Ei, se ei ole kahvitermos. Kuvassa on kaksi samanlaista kahvitermosta. Löydätkö ne?",
  },
  {
    text: "Missä ovat teepussit? Löydätkö ne?",
    item: "teepussit",
    type: "question",
    correctFeedback: "Kyllä, siinä ovat teepussit. Minä juon yleensä mustaherukkateetä. Mistä teestä sinä tykkäät?",
    incorrectFeedback: "Nyt meni väärin. Teepussit ovat vedenkeittimen lähellä.",
  },
  {
    text: "Missä on hunajaa?",
    item: "hunaja",
    type: "question",
    correctFeedback: "Hyvä, löysit hunajan! Tässä on kaksi pulloa hunajaa. Minä käytän hunajaa, kun juon teetä.",
    incorrectFeedback: "Se ei ole hunajaa. Kokeile uudelleen!",
  },
  {
    text: "Ja vielä lopuksi. Kuvassa on viisi purkkia makeutusainetta. Missä ne ovat?",
    item: "makeutusaine",
    type: "question",
    correctFeedback:
      "Hienoa, ne ovat makeutusainetta. Käytän makeutusainetta joskus kahvissa. Yleensä juon kahvia ilman makeutusainetta tai sokeria.",
    incorrectFeedback: "Se ei ole makeutusainetta. Makeutusaineet ovat teen vieressä.",
  },
  {
    text: "Hienoa! Löysit kuvasta kaikki tärkeät kahvilan tavarat. Opiskele sanat hyvin, koska tarvitset niitä varmasti myöhemmin!",
    item: null,
    type: "completion",
  },
]

const trueFalseQuestions = [
  {
    statement: "Kahvilan seinä on vihreä.",
    correct: false,
    correctFeedback: "Oikein! Kahvilan seinä ei ole vihreä, vaan keltainen.",
    incorrectFeedback: "Väärin. Kahvilan seinä ei ole vihreä, vaan keltainen.",
  },
  {
    statement: "Pöydällä on keltaista mehua.",
    correct: true,
    correctFeedback: "Oikein! Pöydällä on keltaista mehua. Se on ehkä appelsiinimehua.",
    incorrectFeedback: "Väärin. Pöydällä on keltaista mehua. Se on ehkä appelsiinimehua.",
  },
  {
    statement: "Asiakas voi ottaa kahvia kahviautomaatista.",
    correct: false,
    correctFeedback: "Oikein! Kahvi on pöydällä kahvitermoksessa, ei automaatissa.",
    incorrectFeedback: "Väärin. Kahvi on pöydällä kahvitermoksessa, ei automaatissa.",
  },
  {
    statement: "Asiakas voi saada kakkua ja keksejä.",
    correct: true,
    correctFeedback: "Oikein! Pöydällä on vaaleita keksejä ja tummaa kakkua. Se on ehkä suklaakakkua.",
    incorrectFeedback: "Väärin. Pöydällä on vaaleita keksejä ja tummaa kakkua. Se on ehkä suklaakakkua.",
  },
  {
    statement: "Kaikki lasit ovat pöydällä.",
    correct: false,
    correctFeedback: "Oikein! Lasit ovat hyllyllä, pöydän yläpuolella.",
    incorrectFeedback: "Väärin. Lasit ovat hyllyllä, pöydän yläpuolella.",
  },
  {
    statement: "Kahvitermoksen takana on koriste-esine.",
    correct: true,
    correctFeedback: "Oikein! Kahvitermoksen takana on kaunis patsas.",
    incorrectFeedback: "Väärin. Kahvitermoksen takana on kaunis patsas.",
  },
]

const vocabularyItems = [
  "hunaja",
  "sokeri",
  "juomalasit",
  "teepussit",
  "kahvitermos",
  "kakkupalat",
  "vedenkeitin",
  "kahviautomaatti",
  "makeutusaine",
]

// Add Finnish pronunciation for each word
const finnishPronunciation = {
  hunaja: "HU-na-ja",
  sokeri: "SO-ke-ri",
  juomalasit: "JUO-ma-la-sit",
  teepussit: "TEE-pus-sit",
  kahvitermos: "KAH-vi-ter-mos",
  kakkupalat: "KAK-ku-pa-lat",
  vedenkeitin: "VE-den-kei-tin",
  kahviautomaatti: "KAH-vi-au-to-maat-ti",
  makeutusaine: "MA-keu-tus-ai-ne",
}

// Function to speak Finnish words
function speakFinnishWord(word) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "fi-FI"
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

// Module 2 variables
let currentModule2Question = 0

function playCurrentQuestion() {
  const questionText = document.getElementById("module2-question-text").textContent
  speakFinnishWord(questionText)
}

function nextModule2Question() {
  if (currentModule2Question < questions.length - 1) {
    currentModule2Question++
    updateModule2Question()
  }
}

function updateModule2Question() {
  const question = questions[currentModule2Question]
  document.getElementById("module2-question-text").textContent = question.text

  // Update progress
  const progress = ((currentModule2Question + 1) / questions.length) * 100
  document.getElementById("module2-progress-fill").style.width = progress + "%"
  document.getElementById("module2-progress-counter").textContent =
    `${currentModule2Question + 1} / ${questions.length}`

  // Hide feedback
  document.getElementById("module2-feedback").style.display = "none"
}

function handleModule2Feedback() {
  document.getElementById("module2-feedback").style.display = "none"
  nextModule2Question()
}

// Module 4 variables
let currentModule4Question = 0

function playModule4Question() {
  const questionText = document.getElementById("module4-question-text").textContent
  speakFinnishWord(questionText)
}

function answerModule4Question(answer) {
  const question = trueFalseQuestions[currentModule4Question]
  const isCorrect = (answer === "true" && question.correct) || (answer === "false" && !question.correct)

  const feedbackElement = document.getElementById("module4-feedback")
  const feedbackText = document.getElementById("module4-feedback-text")

  if (isCorrect) {
    feedbackElement.className = "module4-feedback correct"
    feedbackText.textContent = question.correctFeedback
  } else {
    feedbackElement.className = "module4-feedback incorrect"
    feedbackText.textContent = question.incorrectFeedback
  }

  feedbackElement.style.display = "block"
  speakFinnishWord(isCorrect ? question.correctFeedback : question.incorrectFeedback)
}

function handleModule4Feedback() {
  document.getElementById("module4-feedback").style.display = "none"

  if (currentModule4Question < trueFalseQuestions.length - 1) {
    currentModule4Question++
    updateModule4Question()
  } else {
    // Module 4 completed, show completion message
    setTimeout(() => {
      alert("Hienoa! Olet suorittanut kaikki moduulit!")
    }, 500)
  }
}

function updateModule4Question() {
  const question = trueFalseQuestions[currentModule4Question]
  document.getElementById("module4-question-text").textContent = question.statement

  // Update progress
  const progress = ((currentModule4Question + 1) / trueFalseQuestions.length) * 100
  document.getElementById("module4-progress-fill").style.width = progress + "%"
  document.getElementById("module4-progress-counter").textContent =
    `${currentModule4Question + 1} / ${trueFalseQuestions.length}`
}

// Function to check Module 2 clickable answers
function checkModule2Answer(item) {
  const currentQuestion = questions[currentModule2Question]

  if (currentQuestion.type !== "question") {
    return
  }

  const feedbackElement = document.getElementById("module2-feedback")
  const feedbackText = document.getElementById("module2-feedback-text")
  const feedbackBtn = document.getElementById("module2-feedback-btn")

  if (item === currentQuestion.item) {
    feedbackElement.className = "module2-feedback correct"
    feedbackText.textContent = currentQuestion.correctFeedback
    feedbackBtn.textContent = "Seuraava kysymys"
    speakFinnishWord(currentQuestion.correctFeedback)
  } else {
    feedbackElement.className = "module2-feedback incorrect"
    feedbackText.textContent = currentQuestion.incorrectFeedback
    feedbackBtn.textContent = "Yritä uudelleen"
    speakFinnishWord(currentQuestion.incorrectFeedback)
  }

  feedbackElement.style.display = "block"
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  updateLanguage(currentLanguage)

  // Set up vocabulary matching
  setupVocabularyMatching()

  // Set up matching exercises
  setupMatchingExercises()

  // Set up fill-in exercises
  setupFillInExercise()

  // Set up Module 2 clickable image
  setupModule2ClickableImage()
})

// Function to set up Module 2 clickable image
function setupModule2ClickableImage() {
  const image = document.getElementById("module2-clickable-image")
  if (image) {
    image.addEventListener("click", function (event) {
      const rect = this.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Define clickable areas (approximate coordinates)
      const areas = {
        kahviautomaatti: { x1: 50, y1: 100, x2: 200, y2: 300 },
        vedenkeitin: { x1: 300, y1: 150, x2: 400, y2: 250 },
        kahvitermos: { x1: 500, y1: 200, x2: 600, y2: 350 },
        teepussit: { x1: 250, y1: 100, x2: 350, y2: 150 },
        hunaja: { x1: 400, y1: 100, x2: 500, y2: 200 },
        makeutusaine: { x1: 450, y1: 250, x2: 550, y2: 300 },
      }

      // Check which area was clicked
      for (const [item, area] of Object.entries(areas)) {
        if (x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2) {
          checkModule2Answer(item)
          return
        }
      }
    })
  }
}

// Function to show a specific page
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show the selected page
  const selectedPage = document.getElementById(pageId)
  if (selectedPage) {
    selectedPage.classList.add("active")
    currentPage = pageId

    // Update navigation
    const navLinks = document.querySelectorAll(".header-nav a")
    navLinks.forEach((link) => {
      link.classList.remove("active")
    })

    // Set active nav based on page
    if (pageId === "etusivu") {
      document.querySelector("[onclick=\"showPage('etusivu')\"]").classList.add("active")
    } else if (pageId === "oppimispolku" || pageId.includes("moduuli") || pageId === "learning-modules") {
      document.querySelector("[onclick=\"showPage('oppimispolku')\"]").classList.add("active")
    } else if (pageId === "palautetta") {
      document.querySelector("[onclick=\"showPage('palautetta')\"]").classList.add("active")
    }

    // Special handling for module pages
    if (pageId.includes("moduuli") && !pageId.includes("start")) {
      showPage("learning-modules")
      showModule(pageId)
    }

    // Reset module-specific state if needed
    if (pageId === "moduuli2") {
      currentModule2Question = 0
      updateModule2Question()
    }

    // Scroll to top of the page
    window.scrollTo(0, 0)
  }
}

// Function to show a specific module section
function showModule(sectionId) {
  // Show the learning modules page first
  showPage("learning-modules")

  // Hide all module sections
  const sections = document.querySelectorAll(".module-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show the selected section
  const selectedSection = document.getElementById(sectionId)
  if (selectedSection) {
    selectedSection.classList.add("active")
    currentModuleSection = sectionId

    // Update sidebar
    const moduleItems = document.querySelectorAll(".module-item")
    moduleItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Find and activate the corresponding sidebar item
    const moduleIndex = Number.parseInt(sectionId.replace("moduuli", "")) - 1
    if (moduleItems[moduleIndex]) {
      moduleItems[moduleIndex].classList.add("active")
    }
  }
}

// Function to navigate between modules
function navigateModule(direction) {
  const moduleOrder = ["moduuli1", "moduuli2", "moduuli3", "moduuli4"]
  const currentIndex = moduleOrder.indexOf(currentModuleSection)

  if (direction === "next" && currentIndex < moduleOrder.length - 1) {
    showModule(moduleOrder[currentIndex + 1])
  } else if (direction === "prev" && currentIndex > 0) {
    showModule(moduleOrder[currentIndex - 1])
  } else if (direction === "next" && currentIndex === moduleOrder.length - 1) {
    // Go to feedback page after last module
    showPage("palautetta")
  } else if (direction === "prev" && currentIndex === 0) {
    // Go back to learning path from first module
    showPage("oppimispolku")
  }
}

// Function to set up vocabulary matching
function setupVocabularyMatching() {
  const wordBubbles = document.querySelectorAll(".word-bubble")
  const imageContainers = document.querySelectorAll(".vocab-image-container")

  // Add click handlers to word bubbles
  wordBubbles.forEach((bubble) => {
    bubble.addEventListener("click", function () {
      const word = this.getAttribute("data-word")
      if (!word) return

      // Play Finnish pronunciation
      speakFinnishWord(word)

      // Show the word text and hide other elements
      this.classList.add("revealed")

      // Remove previous selections
      wordBubbles.forEach((b) => b.classList.remove("selected"))

      // Select this bubble
      this.classList.add("selected")
      currentVocabItem = word
    })
  })

  // Add click handlers to images
  imageContainers.forEach((container) => {
    container.addEventListener("click", function () {
      if (currentVocabItem) {
        const imageWord = this.getAttribute("data-word")

        if (imageWord === currentVocabItem) {
          // Correct match
          this.classList.add("matched")
          if (!matchedWords.includes(currentVocabItem)) {
            matchedWords.push(currentVocabItem)
          }

          // Reset selection
          wordBubbles.forEach((b) => b.classList.remove("selected"))
          currentVocabItem = null

          // Check if all matched
          if (matchedWords.length === vocabularyItems.length) {
            setTimeout(() => {
              document.getElementById("module1-completion").style.display = "flex"
            }, 500)
          }
        } else {
          // Wrong match - show feedback
          alert("Väärin. Yritä uudelleen.")
        }
      } else {
        alert("Valitse ensin sana klikkaamalla puhekuplaa.")
      }
    })
  })
}

// Function to check vocabulary answers
function checkVocabularyAnswers() {
  const matchedCount = matchedWords.length
  const totalCount = vocabularyItems.length

  if (matchedCount === totalCount) {
    alert("Hienoa! Kaikki vastaukset ovat oikein!")
    document.getElementById("module1-completion").style.display = "flex"
  } else {
    alert(`Olet yhdistänyt ${matchedCount}/${totalCount} sanaa oikein. Jatka harjoittelua!`)
  }
}

// Function to play audio
function playAudio(audioId) {
  const audio = document.getElementById(audioId)
  if (audio) {
    audio.play()
  } else {
    // Use Finnish speech synthesis as fallback
    const word = audioId.replace("-audio", "")
    speakFinnishWord(word)
  }
}

// Function to show exercise tabs in Module 3
function showExercise(exercise) {
  currentExercise = exercise

  // Update tab buttons
  const tabButtons = document.querySelectorAll(".tab-button")
  tabButtons.forEach((button) => {
    button.classList.remove("active")
  })

  // Find and activate the clicked tab
  const activeTab = document.querySelector(`[onclick="showExercise('${exercise}')"]`)
  if (activeTab) {
    activeTab.classList.add("active")
  }

  // Hide all exercise sections
  const exerciseSections = document.querySelectorAll(".exercise-section")
  exerciseSections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show the selected exercise section
  const selectedSection = document.getElementById(`exercise-${exercise.toLowerCase()}`)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }
}

// Function to set up matching exercises
function setupMatchingExercises() {
  const matchingItems = document.querySelectorAll(".matching-item")
  const matchingSlots = document.querySelectorAll(".matching-slot")

  let selectedItem = null

  matchingItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove previous selections
      matchingItems.forEach((i) => i.classList.remove("selected"))

      // Select this item
      this.classList.add("selected")
      selectedItem = this
    })
  })

  matchingSlots.forEach((slot) => {
    slot.addEventListener("click", function () {
      if (selectedItem) {
        const itemId = selectedItem.getAttribute("data-id")
        const slotMatch = this.getAttribute("data-match")

        if (itemId === slotMatch) {
          // Correct match
          selectedItem.classList.add("matched")
          selectedItem.classList.remove("selected")
          this.classList.add("matched")
          selectedItem = null
        } else {
          // Wrong match
          alert("Väärin. Yritä uudelleen.")
        }
      } else {
        alert("Valitse ensin lause vasemmalta puolelta.")
      }
    })
  })
}

// Function to check matching answers
function checkMatchingAnswers(exerciseId) {
  const matchedItems = document.querySelectorAll(`.matching-item.matched`)
  const totalItems = document.querySelectorAll(`.matching-item`)

  if (matchedItems.length === totalItems.length) {
    alert("Hyvä! Olet yhdistänyt kaikki lauseet oikein.")
  } else {
    alert("Jatka harjoittelua. Kaikki lauseet eivät ole vielä oikein yhdistetty.")
  }
}

// Function to set up the fill-in exercise
function setupFillInExercise() {
  const verbOptions = document.querySelectorAll(".verb-option")
  const blanks = document.querySelectorAll(".fill-in-blank")

  verbOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectedVerb = this.textContent

      // Remove selected class from all options
      verbOptions.forEach((opt) => opt.classList.remove("selected"))

      // Add selected class to the clicked option
      this.classList.add("selected")
    })
  })

  // Make blanks clickable
  blanks.forEach((blank) => {
    blank.addEventListener("click", function () {
      if (selectedVerb) {
        this.textContent = selectedVerb
        this.classList.remove("incorrect")

        if (this.dataset.correct === selectedVerb) {
          this.classList.add("correct")
        } else {
          this.classList.add("incorrect")
        }

        selectedVerb = ""
        verbOptions.forEach((opt) => opt.classList.remove("selected"))
      }
    })
  })
}

// Function to select a verb for the fill-in exercise
function selectVerb(verb) {
  selectedVerb = verb

  // Remove selected class from all options
  const verbOptions = document.querySelectorAll(".verb-option")
  verbOptions.forEach((opt) => opt.classList.remove("selected"))

  // Add selected class to the clicked option
  const selectedOption = Array.from(verbOptions).find((opt) => opt.textContent === verb)
  if (selectedOption) {
    selectedOption.classList.add("selected")
  }
}

// Function to check fill-in answers
function checkFillInAnswers() {
  const blanks = document.querySelectorAll(".fill-in-blank")
  let allCorrect = true

  blanks.forEach((blank) => {
    if (blank.textContent === "[___________]" || blank.textContent !== blank.dataset.correct) {
      allCorrect = false
      blank.classList.add("incorrect")
    } else {
      blank.classList.add("correct")
    }
  })

  if (allCorrect) {
    alert("Hienoa! Kaikki vastaukset ovat oikein!")
  } else {
    alert("Tarkista vastaukset ja yritä uudelleen.")
  }
}

// Function to submit feedback and go to home page
function submitFeedback(event) {
  event.preventDefault()
  alert("Kiitos palautteestasi!")
  showPage("etusivu")
}

// Function to update progress bar in Module 4
function updateProgressBar(currentQuestion, totalQuestions) {
  const progressFill = document.querySelector(".progress-fill")
  const progressCounter = document.querySelector(".progress-counter")

  if (progressFill && progressCounter) {
    const percentage = (currentQuestion / totalQuestions) * 100
    progressFill.style.width = `${percentage}%`
    progressCounter.textContent = `${currentQuestion} / ${totalQuestions}`
  }
}

// Function to check true/false answer
function checkTrueFalseAnswer(questionIndex, answer) {
  const question = trueFalseQuestions[questionIndex]

  // Update current question display
  const currentTestQuestion = document.getElementById("current-test-question")
  if (currentTestQuestion && questionIndex < trueFalseQuestions.length - 1) {
    // Move to next question
    const nextQuestion = trueFalseQuestions[questionIndex + 1]
    currentTestQuestion.textContent = nextQuestion.statement

    // Update progress
    updateProgressBar(questionIndex + 2, trueFalseQuestions.length)
  } else if (questionIndex === trueFalseQuestions.length - 1) {
    // Last question completed
    updateProgressBar(trueFalseQuestions.length, trueFalseQuestions.length)

    // Show completion message
    setTimeout(() => {
      const completionMessage = document.getElementById("module4-completion")
      if (completionMessage) {
        completionMessage.style.display = "block"
        completionMessage.textContent = "Hienoa! Olet suorittanut testin!"
      }
    }, 1000)
  }

  // Provide audio feedback
  if (window.finnishVoice) {
    const feedbackText = answer === question.correct ? question.correctFeedback : question.incorrectFeedback

    setTimeout(() => {
      window.finnishVoice.speak(feedbackText)
    }, 500)
  }
}

// Function to change language (only for feedback page)
function changeLanguage(lang) {
  // Only work on feedback page
  if (currentPage !== "palautetta") return

  currentLanguage = lang
  updateFeedbackLanguage(lang)

  // Update language toggle buttons only on feedback page
  const feedbackPage = document.getElementById("palautetta")
  if (feedbackPage) {
    const langButtons = feedbackPage.querySelectorAll(".lang-btn")
    langButtons.forEach((button) => {
      button.classList.remove("active")
    })

    const activeButton = feedbackPage.querySelector(`.lang-btn[onclick="changeLanguage('${lang}')"]`)
    if (activeButton) {
      activeButton.classList.add("active")
    }
  }
}

// Function to update only feedback page language
function updateFeedbackLanguage(lang) {
  const feedbackTranslations = {
    "feedback-title": {
      fi: "Anna palautetta",
      en: "Give Feedback",
    },
    "feedback-description": {
      fi: "Arvostamme palautettasi oppimaterialeistamme. Kerro meille kokemuksistasi ja mahdollisista parannusehdotuksista.",
      en: "We appreciate your feedback on our learning materials. Tell us about your experiences and possible improvement suggestions.",
    },
    "rating-question": {
      fi: "Miten arvioisit kokemuksesi oppimaterialeistamme? *",
      en: "How would you rate your experience with our learning materials? *",
    },
    excellent: {
      fi: "Erinomainen",
      en: "Excellent",
    },
    good: {
      fi: "Hyvä",
      en: "Good",
    },
    average: {
      fi: "Keskinkertainen",
      en: "Average",
    },
    poor: {
      fi: "Huono",
      en: "Poor",
    },
    "suggestions-question": {
      fi: "Mitä voisimme parantaa?",
      en: "What could we improve?",
    },
    "suggestions-placeholder": {
      fi: "Kirjoita ehdotuksesi tähän...",
      en: "Write your suggestions here...",
    },
    "submit-feedback": {
      fi: "Lähetä palaute",
      en: "Submit Feedback",
    },
  }

  // Only update feedback page elements
  const feedbackPage = document.getElementById("palautetta")
  if (feedbackPage) {
    const elements = feedbackPage.querySelectorAll("[data-translate]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (feedbackTranslations[key] && feedbackTranslations[key][lang]) {
        element.textContent = feedbackTranslations[key][lang]
      }
    })

    const placeholderElements = feedbackPage.querySelectorAll("[data-translate-placeholder]")
    placeholderElements.forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder")
      if (feedbackTranslations[key] && feedbackTranslations[key][lang]) {
        element.placeholder = feedbackTranslations[key][lang]
      }
    })
  }
}

// Function to update all text elements based on language (only for non-feedback pages)
function updateLanguage(lang) {
  // Don't update language for other pages, keep them in Finnish
  if (currentPage === "palautetta") {
    updateFeedbackLanguage(lang)
  }
  // All other pages remain in Finnish
}
