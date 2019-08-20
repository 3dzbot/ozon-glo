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

    discountCheckbox.addEventListener('click', filter )
    min.addEventListener('change', filter)
    max.addEventListener('change', filter)

    // function filterPrice(){
    //     cards.forEach((card)=>{
    //         const cardPrice = card.querySelector('.card-price');
    //         const price = parseFloat(cardPrice.textContent);
            
    //         if((min.value && price < min.value) || (max.value && price > max.value)){
    //             card.parentNode.remove();
    //         } else {
    //             goods.appendChild(card.parentNode);
    //         }
    //     })
    // }

    function filter(){
        cards.forEach((card)=>{
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');

            if((min.value && price < min.value) || (max.value && price > max.value)){
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount){
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';

            }
        });
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

//получение данных с сервера

function getData(){
    const goodsWrapper = document.querySelector('.goods');
//fetch API - запрос на сервер 
    return fetch('../db/db.json')   //add return for .then on getData()
    .then((response)=>{         //callback with objData (response)
        if(response.ok){            //.ok true/false
            return response.json();
        } else {
            throw new Error ('Данные не были получены, ошибка: ' + response.status);  //перехват ошибки
        }
    })
    .then((data)=> {
            return data;        //add return for .then on getData()
        }
    )
    .catch((err)=>{
        console.warn(err)
        goodsWrapper.innerHTML = '<div style="color: red;">Упс, что-то пошло не так!</div>';
    }); //перехват ошибок
}

//выводим карточки товара
function renderCards(data){
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good)=>{
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3'
        card.innerHTML = `							
        <div class="card" data-category="${good.category}">
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${good.sale ? 'color: red' : ''}">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(card);
    })
}
//конец получения данных

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const categories = new Set();
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    cards.forEach((card)=>{
        categories.add(card.dataset.category)
    });

    categories.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });
    catalogBtn.addEventListener('click', (event)=>{
        if(catalogWrapper.style.display){
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        if(event.target.tagName ==='LI'){
            cards.forEach((card)=>{
                if(card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            })
        }
    })
}


getData().then((data)=>{
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog()
});
