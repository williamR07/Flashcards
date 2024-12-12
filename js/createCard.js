const dropDownBtn = document.querySelector('#dropDownBtn');
const categories = document.querySelectorAll('.dropdown-item');


categories.forEach(category => {
    category.addEventListener('click', () => {
        dropDownBtn.textContent = category.textContent;
    })
})