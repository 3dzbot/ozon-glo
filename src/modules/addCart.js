export default function addCart() {
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
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cardTotal = document.querySelector('.cart-total span'); //общая сумма в корзине
        countGoods.textContent = cardsCart.length; //вставка текста внутри блока(elem)

        let sum = 0;
        cardsPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent);
            sum += price;
        });

        cardTotal.textContent = sum;

        if (cardsCart.length != 0) {
            cartEmpty.style.display = 'none';
        } else {
            cartEmpty.style.display = '';
        }
    }
}