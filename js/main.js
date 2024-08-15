const options = {
    once: true,
}

// 1

const button = document.querySelector(`.button`)

button.addEventListener(`click`, e => alert(`Hello, Palmo`), options)

// 2

const inputButton = document.querySelector(`.firstInput__button`)
const input = document.querySelector(`.firstInput`)

inputButton.addEventListener(`click`, e => input.value = `Hello, World!`, options)

// 3

const secondInput = document.querySelector(`.secondInput`)
const secondInputButton = document.querySelector(`.secondInput__button`)

secondInputButton.addEventListener(`click`, e => console.log(secondInput.value))

// 4

const firstHeading = document.querySelector(`.firstHeading`)
const secondHeading = document.querySelector(`.secondHeading`)
const swapButton = document.querySelector(`.swapButton`)

swapButton.addEventListener(`click`, function (e) {
    const firstTempHeading = firstHeading.textContent
    const secondTempHeading = secondHeading.textContent

    firstHeading.textContent = secondTempHeading
    secondHeading.textContent = firstTempHeading
})

// 5

const textElement = document.getElementById(`text`)
const button2 = document.getElementById(`toggleColorButton`)

button2.addEventListener(`click`, () => {
    textElement.classList.toggle(`red-color`)
})

// 6

const inputElement = document.getElementById(`textInput`)
const button3 = document.getElementById(`toggleButton`)

button3.addEventListener(`click`, () => {
    if (inputElement.disabled) {
        inputElement.disabled = false
        button3.textContent = `Заблокировать инпут`
    } else {
        inputElement.disabled = true
        button3.textContent = `Разблокировать инпут`
    }
})

// 7

const greenSquare = document.getElementById('greenSquare')
const redSquare = document.getElementById('redSquare')

function toggleColors() {
    greenSquare.classList.toggle('red')
    greenSquare.classList.toggle('green')
    redSquare.classList.toggle('red')
    redSquare.classList.toggle('green')
}

greenSquare.addEventListener('click', toggleColors)
redSquare.addEventListener('click', toggleColors)

// 8

const button4 = document.getElementById('addItemButton')
const ul = document.getElementById('itemList')
let itemCount = 0;

button4.addEventListener('click', () => {
    itemCount++
    const li = document.createElement('li')
    li.textContent = `Элемент ${itemCount}`
    ul.appendChild(li)
})

// 9

const textArea = document.getElementById(`textArea`)
const button5 = document.getElementById(`outputValuesButton`)
const outputList = document.getElementById(`outputList`)

button5.addEventListener(`click`, () => {
    const items = textArea.value.split(',')
    outputList.innerHTML = ''

    items.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = item.trim()
        outputList.appendChild(li)
    })
})

// 10

function checkValidationOfField(field) {
    if (field.id === `username`) return /^[^\s._/\\|,]{4,20}$/.test(field.value)
    if (field.id === `email`) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    if (field.id === `age`) return /^\d+$/.test(field.value) && parseInt(field.value, 10) > 0
    if (field.id === `password`) return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(field.value)
    if (field.id === `confirmPassword`) {
        const passwordField = document.getElementById(`password`)

        if (/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(passwordField.value)) {
            return field.value === passwordField.value
        } else {
            return true
        }
    }
    return false
}

document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault()
    let isValid = true

    const fields = document.forms.registrationForm.input

    fields.forEach(field => {
        const errorSpan = field.nextElementSibling

        if (!checkValidationOfField(field)) {
            field.classList.add(`error-border`)
            errorSpan.style.display = `block`
            isValid = false
        } else {
            field.classList.remove('error-border')
            errorSpan.style.display = 'none'
        }
        field.addEventListener(`focus`, () => {
            field.classList.remove('error-border')
            errorSpan.style.display = 'none'
        })
    })

    if (isValid) {
        document.getElementById('successMessage').style.display = 'block'
        document.getElementById('registrationForm').reset()
    } else {
        document.getElementById('successMessage').style.display = 'none'
        document.getElementById('password').value = ''
        document.getElementById('confirmPassword').value = ''
    }
})

// 11

let display = document.getElementById('display')
let currentInput = ''

function appendNumber(number) {
    if (currentInput === 'Error') {
        currentInput = number
    } else {
        currentInput += number
    }
    updateDisplay()
}

function appendOperator(op) {
    if (currentInput !== 'Error') {
        if (currentInput === '' && op === '-') {
            currentInput = op
        } else if (currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput.trim().slice(-1))) {
            currentInput += ' ' + op + ' '
            updateDisplay()
        }
    }
}

function appendDot() {
    if (currentInput !== 'Error') {
        if (!currentInput.split(/[\+\-\*\/]/).pop().includes('.')) {
            currentInput += '.'
            updateDisplay()
        }
    }
}

function clearDisplay() {
    currentInput = ''
    updateDisplay()
}

function clearEntry() {
    if (currentInput !== 'Error') {
        if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1)
            if (currentInput.endsWith(' ')) {
                currentInput = currentInput.slice(0, -3)
            }
            updateDisplay()
        }
    }
}

function calculateResult() {
    currentInput = currentInput.replace(/\b0+(?=\d)/g, ``)

    if (currentInput !== 'Error') {
        try {
            if (!isFinite(eval(currentInput))) {
                currentInput = `Error`
            } else {
                let trimmedInput = currentInput.replace(/\s+/g, '')
                currentInput = eval(trimmedInput).toString()

            }
            console.log(typeof currentInput)
            console.log(currentInput)
        } catch {
            currentInput = 'Error'
        }

        updateDisplay()
    }
}

function updateDisplay() {
    display.value = currentInput
}

document.getElementById('clear').addEventListener('click', clearDisplay)
document.getElementById('clearEntry').addEventListener('click', clearEntry)
document.getElementById('divide').addEventListener('click', () => appendOperator('/'))
document.getElementById('multiply').addEventListener('click', () => appendOperator('*'))
document.getElementById('one').addEventListener('click', () => appendNumber('1'))
document.getElementById('two').addEventListener('click', () => appendNumber('2'))
document.getElementById('three').addEventListener('click', () => appendNumber('3'))
document.getElementById('subtract').addEventListener('click', () => appendOperator('-'))
document.getElementById('four').addEventListener('click', () => appendNumber('4'))
document.getElementById('five').addEventListener('click', () => appendNumber('5'))
document.getElementById('six').addEventListener('click', () => appendNumber('6'))
document.getElementById('add').addEventListener('click', () => appendOperator('+'))
document.getElementById('seven').addEventListener('click', () => appendNumber('7'))
document.getElementById('eight').addEventListener('click', () => appendNumber('8'))
document.getElementById('nine').addEventListener('click', () => appendNumber('9'))
document.getElementById('equals').addEventListener('click', calculateResult)
document.getElementById('dot').addEventListener('click', appendDot)
document.getElementById('zero').addEventListener('click', () => appendNumber('0'))

// 12

const cart = []

function addToCart(item) {
    if (!cart.includes(item)) {
        cart.push(item)
        updateCartUI()
    }
}

function updateCartUI() {
    const cartList = document.getElementById('cartList')
    cartList.innerHTML = ''
    cart.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        cartList.appendChild(li)
    })
}

function toggleCart() {
    const modal = document.getElementById('cartModal')
    if (modal.style.display === 'block') {
        modal.style.display = 'none'
    } else {
        modal.style.display = 'block'
    }
}

function clearCart() {
    cart.length = 0
    updateCartUI()
}
