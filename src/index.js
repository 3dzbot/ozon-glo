'use strict'
//<----checkbox---->

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(function (element) {
        element.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked'); //добавим класс следующему соседнему элементу
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}


//<---end checkbox---->

//корзина 
function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');


    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden'; //отключили скроллинг окна!
    })
    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    })
}


//коррзина end

//добавление товара в корзину
function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('.btn-primary');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true); //метод клонирования блока (карточки) со вложенностями (true)
            cartWrapper.appendChild(cardClone);
            // cartEmpty.style.display = 'none';
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            })
        })
    })

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cardTotal = document.querySelector('.cart-total span') //общая сумма в корзине
        countGoods.textContent = cardsCart.length; //вставка текста внутри блока(elem)

        let sum = 0;
        cardsPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent)
            sum += price;
        })

        cardTotal.textContent = sum;

        if (cardsCart.length != 0) {
            cartEmpty.style.display = 'none';
        } else {
            cartEmpty.style.display = '';
        }
    }
}


//конец добавления товара в корзину

//фильтра акции

function actionPage(){
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.querySelector('#discount-checkbox');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    //фильтр по акции
    discountCheckbox.addEventListener('click', ()=>{
        cards.forEach((card)=>{
            if(discountCheckbox.checked){
                if(!card.querySelector('.card-sale')){
                    // card.parentNode.style.display = 'none';
                    card.parentNode.remove();
                }
            } else {
                // card.parentNode.style.display = '';
                goods.appendChild(card.parentNode);
            }
        })
    })
//фильтр по ценен

    min.addEventListener('change', filterPrice)
    max.addEventListener('change', filterPrice)

    function filterPrice(){
        cards.forEach((card)=>{
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            
            if((min.value && price < min.value) || (max.value && price > max.value)){
                card.parentNode.remove();
            } else {
                goods.appendChild(card.parentNode);
            }
        })
    }

//поиск

    searchBtn.addEventListener('click', ()=>{
        const searchText = new RegExp(search.value.trim(), 'i');        //search.value  //trim - обрезка пробелов в начале и конце
        console.log(searchText)
        cards.forEach((card)=>{
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)){                     //test - return true or false
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        })
        search.value = '';
    })

}

//конец фильтр акции

toggleCheckbox()
toggleCart()
addCart()
actionPage() 