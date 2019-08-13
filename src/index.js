'use strict'
//<----checkbox---->
const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(function(element){
    element.addEventListener('change', function(){
        if (this.checked){
            this.nextElementSibling.classList.add('checked'); //добавим класс следующему соседнему элементу
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});
//<---end checkbox---->
//корзина 
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', ()=>{
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden'; //отключили скроллинг окна!
})
closeBtn.addEventListener('click', ()=>{
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
})
//коррзина end

//добавление товара в корзину
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');

cards.forEach((card)=>{
    const btn = card.querySelector('.btn-primary');
    btn.addEventListener('click', ()=>{
        const cardClone = card.cloneNode(true);       //метод клонирования блока (карточки) со вложенностями (true)
        cartWrapper.appendChild(cardClone);
        cartEmpty.style.display = 'none';
        showData();
    })
})

function showData(){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;     //вставка текста внутри блока(elem)

}
//конец добавления товара в корзину