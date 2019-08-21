export default function toggleCheckbox() {
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