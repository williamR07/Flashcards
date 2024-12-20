const cards = document.querySelectorAll(".card");
const question = document.querySelector(".question");
const cardTitle = document.querySelector(".card-title");
const cardSubtitle = document.querySelector(".card-subtitle");
const answer = document.querySelector(".answer");
const handleKnowIt = document.querySelector(".know");
const handleDontKnow = document.querySelector(".dont-know");
const category = document.getElementById("category");
const reviewing = document.getElementById("reviewing");
const oneCardBack = document.getElementById("oneCardBack");
const learning = document.getElementById("learning");
const mastered = document.getElementById("mastered");

let rotated = false;
let btnLearning = false;
let btnMastered = false;
let index = 0;
let qAndA = [];

// Function to flip the card content (front/back)
const flipCard = (element) => {
    if (!rotated) {
        element.classList.remove("front");
        element.classList.add("back");
    } else {
        element.classList.remove("back");
        element.classList.add("front");
    }
};

// Function to update the question, answer, and category on the screen
const updateQuestionAndAnswer = () => {
    if (index < qAndA.length) {
        question.textContent = qAndA[index].question;
        answer.textContent = qAndA[index].answer;
        category.textContent = qAndA[index].category;
        reviewing.textContent = qAndA.length - index;
    }
};

// Function to send updated status to the server and update the local data
const updateStatus = (status) => {
    const updateData = {
        questionId: qAndA[index].questionId,
        status: status
    };
    const jsonData = JSON.stringify(updateData);
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: jsonData
    };

    fetch('http://localhost:3000/question', options)
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });

    qAndA[index].status = status;
    index++;
    updateQuestionAndAnswer();
};

// Function to get counts of mastered and learning
const getStatusCounts = () => {
    const masteredCount = qAndA.filter(item => item.status === 'mastered').length;
    const learningCount = qAndA.filter(item => item.status === 'learning').length;
    return {masteredCount, learningCount};
};

// Handle the flipping of cards when clicked
cards.forEach(card => {
    card.addEventListener("click", () => {
        const rotation = rotated ? 0 : 180; // Flip between 0 and 180 degrees
        card.style.cssText = `transition: 1s; transform: rotateY(${rotation}deg)`; // Flip the card

        setTimeout(() => {
            // Flip the content of the card
            flipCard(cardTitle);
            flipCard(cardSubtitle);
            flipCard(rotated ? question : answer);
            question.classList.toggle("active");
            answer.classList.toggle("active");
            rotated = !rotated; // Track if the card is flipped or not
        }, 250);
    });
});

// Handle the "Know it" button click (for mastering a card)
handleKnowIt.addEventListener("click", () => {
    if (index < qAndA.length - 1) {
        qAndA[index].status = 'mastered';
        btnMastered = true; // Set the mastered flag to true
        handleCards('mastered'); // Apply the slide effect for mastered cards
        btnMastered = false; // Reset the mastered flag
        const {masteredCount, learningCount} = getStatusCounts();
        mastered.textContent = masteredCount;
        learning.textContent = learningCount;
    }
});

// Handle the "Don't know" button click (for learning a card)
handleDontKnow.addEventListener("click", () => {
    if (index < qAndA.length - 1) {
        qAndA[index].status = 'learning';
        btnLearning = true; // Set the learning flag to true
        handleCards('learning'); // Apply the slide effect for learning cards
        btnLearning = false; // Reset the learning flag
        const {masteredCount, learningCount} = getStatusCounts();
        mastered.textContent = masteredCount;
        learning.textContent = learningCount;
    }
});

// Function to handle the sliding effects for cards (mastered/learning)
const handleCards = (status) => {
    cards.forEach(card => {
        if (btnMastered) {
            card.classList.add('slide-left'); // Slide left for mastered cards
        }
        if (btnLearning) {
            card.classList.add('slide-right'); // Slide right for learning cards
        }

        const updateData = {
            questionId: qAndA[index].questionId,
            status: status
        };
        const jsonData = JSON.stringify(updateData);
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: jsonData
        };

        fetch('http://localhost:3000/question', options)
            .then(response => response.json())
            .then(data => {

            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });

        index++;
        setTimeout(() => {
            card.classList.remove('slide-right');
            card.classList.remove('slide-left');
            updateQuestionAndAnswer();
        }, 1000);
    });
};

// Handle going back to the previous card
oneCardBack.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateQuestionAndAnswer();
    }
});

// Fetch the data from the server and initialize the page
fetch('http://localhost:3000/question', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
    .then(response => response.json())
    .then(data => {
        qAndA = data;
        updateQuestionAndAnswer();

        const {masteredCount, learningCount} = getStatusCounts();
        mastered.textContent = masteredCount;
        learning.textContent = learningCount;
        reviewing.textContent = qAndA.length;
    })
    .catch(error => console.error('Error:', error));

