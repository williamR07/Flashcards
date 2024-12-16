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

// flip card
const flip = (element) => {
    if (!rotated) {
        element.classList.remove("front");
        element.classList.add("back");

    } else {
        element.classList.remove("back");
        element.classList.add("front");
    }
}
const handleCards = (arg) => {
    console.log(arg)
    cards.forEach(card => {

        const updateData = {
            questionId: qAndA[index].questionId,
            status: arg
        };
        const jsonData = JSON.stringify(updateData);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        };
        if (btnMastered) {

            card.classList.add('slide-left');
        }
        if (btnLearning) {
            console.log('btnLearning', btnLearning)
            card.classList.add('slide-right');

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
        index++;
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

const handleMasteredLearning = (qAndA) => {
    let masteredCount = 0;
    let learningCount = 0;
    qAndA.forEach(item => {
        if (item.status === 'mastered') {
            masteredCount++;
        } else if (item.status === 'learning') {
            learningCount++;
        }
    })
    return {masteredCount, learningCount};
}

cards.forEach(card => {
    setTimeout(() => {
        card.classList.remove('slide-right');
        question.textContent = qAndA[index].question;
        answer.textContent = qAndA[index].answer;
        category.textContent = qAndA[index].category;
    }, 100)
})


handleKnowIt.addEventListener("click", () => {
    console.log(qAndA.length - 1, index)
    if (index === qAndA.length - 1) {
        return
    }
    if (rotated) {
        console.log(rotated)
    }
    qAndA[index].status = 'mastered';
    btnMastered = true;
    handleCards('mastered');
    btnMastered = false;
    const {masteredCount, learningCount} = handleMasteredLearning(qAndA);
    mastered.textContent = masteredCount;
    learning.textContent = learningCount;
});

handleDontKnow.addEventListener("click", () => {
    if (index === qAndA.length - 1) {
        return
    }
    qAndA[index].status = 'learning';
    console.log(qAndA[index].status)
    btnLearning = true;
    handleCards('learning');
    btnLearning = false
    const {masteredCount, learningCount} = handleMasteredLearning(qAndA);
    mastered.textContent = masteredCount;
    learning.textContent = learningCount;


});

oneCardBack.addEventListener('click', () => {
    if (index === 0) {
        return
    }
    index--;
    question.textContent = qAndA[index].question;
    answer.textContent = qAndA[index].answer;
    category.textContent = qAndA[index].category;
    reviewing.textContent = qAndA.length - index;
})
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
        const {masteredCount, learningCount} = handleMasteredLearning(qAndA);
        mastered.textContent = masteredCount;
        learning.textContent = learningCount;
        reviewing.textContent = qAndA.length;


    })
    .catch(error => console.error('Error:', error));
