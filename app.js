const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
    {
       id: 0,
       text: "Pick an aesthetic:",
       answers: [
           {
               text: "Cottagecore",
             image: "https://s7d9.scene7.com/is/image/Aritzia/fa22-08-16-hp-slot4-a?wid=600"
               
           },
           {
               text: "Timeless/Classic",                   
             image: "https://s7d9.scene7.com/is/image/Aritzia/w22-wk10-12-14-hp-slot4-b?wid=600"
               
           },
           {
               text: "Light Academia",
               image: "https://s7d9.scene7.com/is/image/Aritzia/fa22-stories-70s-office?wid=600"
           },
           {
               text: "Edgy",
               image: "https://s7d9.scene7.com/is/image/Aritzia/fa22-wk1-nlp-thefalling-pt1-k?wid=900"
           }
       ]
    },
  {
        id: 1,
        text: "Pick a colour pallette:",
        answers: [
            {
                text: "Neutral",
                image: "https://interiordesigntips.com/wp-content/uploads/AdobeStock_227568789.jpeg"
            },
            {
                text: "Pastel",
                image: "https://i.pinimg.com/originals/e8/e0/8a/e8e08a97a7af6b34690c1308e03a4b82.jpg"
            },
            {
                text: "Bright Colours",
                image: "https://www.color-hex.com/palettes/8618.png"
            },
            {
                text: "Black and White",
                image: "https://www.color-hex.com/palettes/37706.png"
            }
        ]
    },
    {
        id: 2,
        text: "What's the occasion?:",
        answers: [
            {
                text: "Cozy",
                image: "https://s7d9.scene7.com/is/image/Aritzia/wi22-wk8-new-story-pt0-r?wid=900"
            },
            {
                text: "Casual",
                image: "https://s7d9.scene7.com/is/image/Aritzia/wi22-spxec-story-page-slot2-b?wid=900"
            },
            {
                text: "Formal",
                image: "https://aritzia.scene7.com/is/image/Aritzia/f22_04_a06_96000_23928_on_a?wid=600"
            },
            {
                text: "Going Out",
                image: "https://s7d9.scene7.com/is/image/Aritzia/wi22-wk10-winteroutfits-story-pt0-p?wid=900",
            }
        ]
    }    
]


const answers = [
    {
        combination: ["Light Academia", "Casual", "Neutral"],
        text: "Your results!",
        image: "Our outfit picks for you.png",
        alt: "outfit",
        
    }
 
]
// need to have a default answer to compensate for lack of combination data

const unansweredQuestions = []
const chosenAnswers = []

const populateQuestions = () => {
    questions.forEach(question => {
        const titleBlock = document.createElement('div')
        titleBlock.id = question.id
        titleBlock.classList.add('title-block')
        const titleHeading = document.createElement('h2')
        titleHeading.textContent = question.text
        titleBlock.append(titleHeading)
        questionDisplay.append(titleBlock)

        const answersBlock = document.createElement('div')
        answersBlock.id = question.id + "-questions"
        answersBlock.classList.add('answer-options')

        unansweredQuestions.push(question.id)

        question.answers.forEach(answer => {
            const answerBlock = document.createElement('div')
            answerBlock.classList.add('answer-block')
            answerBlock.addEventListener('click', () => handleClick(question.id, answer.text))
            const answerImage = document.createElement('img')
            answerImage.setAttribute('src', answer.image)
            answerImage.setAttribute('alt', answer.alt)

            const answerTitle = document.createElement('h3')
            answerTitle.textContent = answer.text

            const answerInfo = document.createElement('p')
            const imageLink = document.createElement('a')
            imageLink.setAttribute('href', answer.image)
            imageLink.textContent = answer.credit
            const sourceLink = document.createElement('a')
            sourceLink.textContent = ' '
            sourceLink.setAttribute('src', 'https://www.unsplash.com')
            answerInfo.append(imageLink, ' ', sourceLink)

            answerBlock.append(answerTitle, answerImage, answerInfo)

            answersBlock.append(answerBlock)
        })

        questionDisplay.append(answersBlock)

    })
}
populateQuestions()

const handleClick = (questionId, chosenAnswer) => {
    if (unansweredQuestions.includes(questionId))
    chosenAnswers.push(chosenAnswer)
    const itemToRemove = unansweredQuestions.indexOf(questionId)

    if (itemToRemove > -1) {
        unansweredQuestions.splice(itemToRemove, 1)
    }
    console.log(chosenAnswers)
    console.log(unansweredQuestions)

    disableQuestionBlock(questionId, chosenAnswer)
    const lowestQuestionId = Math.min(...unansweredQuestions)
    location.href = '#' + lowestQuestionId

    if (!unansweredQuestions.length) {
        location.href = '#answer'
        showAnswer()
    }
}

const showAnswer = () => {
    let result
    answers.forEach(answer => {
        if (
            chosenAnswers.includes(answer.combination[0])
        ) {
            result = answer
            return
        } else if (!result) {
            //first answer object is default
            result = answers[0]
        }
    })

    const answerBlock = document.createElement('div')
    answerBlock.classList.add('result-block')
    const answerTitle = document.createElement('h3')
    answerTitle.textContent = result.text
    const answerImage = document.createElement('img')
    answerImage.setAttribute('src', result.image)
    answerImage.setAttribute('alt', result.alt)
    
    answerBlock.append(answerTitle, answerImage,)

    answerDisplay.append(answerBlock)

    const allAnswerBlocks = document.querySelectorAll('.answer-block')
    Array.from(allAnswerBlocks).forEach(answerBlock => answerBlock.replaceWith(answerBlock.cloneNode(true)))

}

const disableQuestionBlock = (questionId, chosenAnswer) => {
    const currentQuestionBlock = document.getElementById(questionId + "-questions")

    Array.from(currentQuestionBlock.children).forEach(block => {
        if (block.children.item(1).innerText !== chosenAnswer) {
            block.style.opacity = "50%"
        }
    })
}