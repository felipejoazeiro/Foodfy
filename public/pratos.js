const openSection1 = document.querySelector('#open-close1')
const openSection2 = document.querySelector('#open-close2')
const openSection3 = document.querySelector('#open-close3')

const showIngridient = document.querySelector('.ingredientes')
const showMostra = document.querySelector('.show1')
const showEsc = document.querySelector('.hide1')

const showIngridient2 = document.querySelector('.preparo')
const showMostra2 = document.querySelector('.show2')
const showEsc2 = document.querySelector('.hide2')

const showIngridient3 = document.querySelector('.information')
const showMostra3 = document.querySelector('.show3')
const showEsc3 = document.querySelector('.hide3')

function toClick(linha,lista,mos,esc){
    linha.classList.toggle(lista)
    mos.classList.toggle('visible')
    esc.classList.toggle('visible')
}

openSection1.addEventListener('click',() =>{toClick(showIngridient,'hidden',showMostra,showEsc)})
openSection2.addEventListener('click',() =>{toClick(showIngridient2,'visible',showMostra2,showEsc2)})
openSection3.addEventListener('click',() =>{toClick(showIngridient3,'visible',showMostra3,showEsc3)})

