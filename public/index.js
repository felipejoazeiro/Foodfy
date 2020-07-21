const listIng = document.querySelector('#ingredients-list')
const addIngredient = document.querySelector('#newIngredient')

addIngredient.addEventListener('click', ()=>{
    console.log('Fui clicado')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'ingredients')
    listIng.appendChild(input)
})

const listPrep = document.querySelector('#preparation-list')
const addPreparation = document.querySelector('#newPreparation')

addPreparation.addEventListener('click', ()=>{
    console.log('Fui clicado')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'preparation')
    listPrep.appendChild(input)
})