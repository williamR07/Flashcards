const dropDownBtn = document.getElementById('dropDownBtn');
const categories = document.querySelectorAll('.dropdown-item');
let success = false;
const alertDiv = document.getElementById('alert');

categories.forEach(category => {
    category.addEventListener('click', () => {
        dropDownBtn.textContent = category.textContent;
    })
})


// Get the form element
const flashcardForm = document.getElementById('flashcardForm');

// Get the dropdown button


// Add a submit event listener to the form
flashcardForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the selected category from the dropdown button text
    const selectedCategory = dropDownBtn.textContent.trim();

    // Get the question and answer values
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    // Log the values (or send them to a server)
    console.log('Selected Category:', selectedCategory);
    console.log('Question:', question);
    console.log('Answer:', answer);

    // Additional handling, such as form validation or submission via AJAX
    fetch('http://localhost:3000/question', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question, answer, selectedCategory})
    }).then(response => response.json()).then(data => {
            success = true
            if (!success) {
                alertDiv.classList.add('d-none');
            } else {
                alertDiv.classList.remove('d-none');
                alertDiv.textContent = data.message;
                setTimeout(() => {
                    success = false
                    alertDiv.classList.add('d-none');
                }, 1000)
            }

        }
    )
});
console.log(success)





