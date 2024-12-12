// Add custom JavaScript here
const cards = document.querySelectorAll(".card");
const question = document.querySelector(".question");
const cardTitle = document.querySelector(".card-title");
const cardSubtitle = document.querySelector(".card-subtitle");
const answer = document.querySelector(".answer");
const knowIt = document.querySelector(".know");
const dontKnow = document.querySelector(".dont-know");
const category = document.getElementById("category");
const reviewing = document.getElementById("reviewing");
const oneCardBack = document.getElementById("#oneCardBack");
let rotated = false;
let index = 0;
qAndA = [];


const flip = (element) => {
    if (!rotated) {
        element.classList.remove("front");
        element.classList.add("back");

    } else {
        element.classList.remove("back");
        element.classList.add("front");
    }
}
let leftBtn = false;
let rightBtn = false;
const handleCards = () => {

    cards.forEach(card => {
        index++;
        const updateData = {
            questionId: qAndA[index].questionId
        };
        const jsonData = JSON.stringify(updateData);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        };
        if (leftBtn) {
            card.classList.add('slide-right');

        }
        if (rightBtn) {
            card.classList.add('slide-left');
        }
        fetch('http://localhost:3000/question', options).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Resource updated successfully:', data);
        }).catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
        console.log(updateData)
        setTimeout(() => {
            card.classList.remove('slide-right');
            card.classList.remove('slide-left');
            question.textContent = qAndA[index].question;
            answer.textContent = qAndA[index].answer;
            category.textContent = qAndA[index].category;
            reviewing.textContent = qAndA.length - index;
        }, 1000);
    });
};
cards.forEach(card => {
    setTimeout(() => {
        card.classList.remove('slide-right');
        question.textContent = qAndA[index].question;
        answer.textContent = qAndA[index].answer;
        category.textContent = qAndA[index].category;
    }, 100)
})
knowIt.addEventListener("click", () => {
    leftBtn = true;
    handleCards();
    leftBtn = false;

});

dontKnow.addEventListener("click", () => {
    rightBtn = true;
    handleCards();
    rightBtn = false

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
    headers: {'Content-Type': 'application/json'}
})
    .then(response => response.json())
    .then(data => {
        data.forEach((question) => {
            qAndA.push(question);
        })
        reviewing.textContent = qAndA.length;
        console.log(qAndA.length - index)
    })
    .catch(error => console.error('Error:', error));

