//Form selection from the DOM.
const form = document.getElementById('form')

//The input boxes for the year, month and day respectively.
const yearInp = document.getElementById('year');
const monthInp = document.getElementById('month');
const dayInp = document.getElementById('day');

//This is the output values for the year, month and day respectively.
const yearResult = document.getElementById('year-result');
const monthResult = document.getElementById('month-result');
const dayResult = document.getElementById('day-result');

//Creating a new date object below using the date constructor.

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
console.log(year)
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
    const inputs = [yearInp, monthInp, dayInp]
    let validator = false;
    inputs.forEach(item => {
            if (item.value.trim() === '') {
                setErrorFor(item, 'This field is required');
                validator = false;
            } else if (dayInp.value > months[monthInp.value -1]) {
                setErrorFor(dayInp, 'Must be a valid date');
                validator = false;               
            } else if (monthInp.value > 12) {
                setErrorFor(monthInp, 'Must be a valid month');
                validator = false;
            }  else if (yearInp.value > year) {
                setErrorFor(yearInp, 'Must be in the past');
                validator = false;
            } else {
                setSuccessFor(item);
                validator = true;
            }
    })
    return validator;
    } 

   

    


 form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(validate())
    if (validate()) {
        if (dayInp.value > day) {
            day = day + months[month -1];
            month = month - 1;
        };

        if (monthInp.value > month) {
            month = month + 12;
            year = year - 1;
        };

        const d = day - dayInp.value;
        const m = month - monthInp.value;
        const y = year - yearInp.value;

        yearResult.textContent = y;
        monthResult.textContent = m;
        dayResult.textContent = d;
    };
 });


function setErrorFor(input, message) {
    const inputControl = input.parentElement;
    const errorMessage = inputControl.querySelector('.error-message');
    errorMessage.textContent = message;
    input.classList.add('border-red-500');
    input.previousElementSibling.classList.add('text-red-500');
    yearResult.textContent = '- -';
    monthResult.textContent = '- -';
    dayResult.textContent = '- -';
}

function setSuccessFor(input) {
    const inputControl = input.parentElement;
    const errorMessage = inputControl.querySelector('.error-message');
    errorMessage.textContent = '';
    input.classList.remove('border-red-500');
    input.previousElementSibling.classList.remove('text-red-500');
}

