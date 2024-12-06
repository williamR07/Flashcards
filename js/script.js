// Add custom JavaScript here
const cards = document.querySelectorAll(".card");
const question = document.querySelector(".question");
const cardTitle = document.querySelector(".card-title");
const cardSubtitle = document.querySelector(".card-subtitle");
const answer = document.querySelector(".answer");
const knowIt = document.querySelector(".know");
const dontKnow = document.querySelector(".dont-know");
let rotated = false;
let index = 0;
qAndA = [
    {
        question: "Whats 1 + 1",
        answer: 2,
    },
    {
        question: "Whats 2 - 1",
        answer: 1,
    },
    {
        question: "Whats 3 - 1",
        answer: 2,
    }
]
const flip = (element) => {
    if (!rotated) {
        element.classList.remove("front");
        element.classList.add("back");

    } else {
        element.classList.remove("back");
        element.classList.add("front");
    }
}


knowIt.addEventListener("click", () => {
    index++;
    cards.forEach(card => {
        card.classList.add('slide-right');
        setTimeout(() => {
            card.classList.remove('slide-right');
            question.textContent = qAndA[index].question;
            answer.textContent = qAndA[index].answer;
        }, 1000)
    })
    console.log(index)
});

dontKnow.addEventListener("click", () => {
    index--;

    cards.forEach(card => {
        card.classList.add('slide-left');
        setTimeout(() => {
            card.classList.remove('slide-left');
            question.textContent = qAndA[index].question;
            answer.textContent = qAndA[index].answer;

        }, 1000)
    })


});

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (!rotated) {
            card.style.cssText = "transition: 1s; transform: rotateY(180deg)";
            setTimeout(() => {
                flip(cardTitle);
                flip(cardSubtitle);
                answer.classList.add("active");
                question.classList.remove("active");
                flip(answer);
                rotated = true;
            }, 250)


        } else {
            card.style.cssText = "transition: 1s; transform: rotateY(360deg)";
            setTimeout(() => {
                flip(cardTitle);
                flip(cardSubtitle);
                answer.classList.remove("active");
                question.classList.add("active");
                flip(question);
                rotated = false;
            }, 250)


        }

    })
})

fetch('http://localhost:3000/question', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
