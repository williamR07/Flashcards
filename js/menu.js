const learning = document.getElementById("learning");
const mastered = document.getElementById("mastered");
const categories = document.querySelectorAll(".categories");
let qAndA = [];
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
