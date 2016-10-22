// modals
export default function () {
    let target = document.querySelectorAll('.modal');
    let btns = document.querySelectorAll('.js-modal-btn');
    let closeBtns = document.querySelectorAll('.js-modal-close');
    let overlay = document.querySelectorAll('.modal');
    let self = this;

    this.open = (link) => {
        let target = document.querySelector(`[data-name=${link}]`);
        let targetIn = target.querySelector('.modal__in');
        target.classList.add('open');
        setTimeout(() => {
            targetIn.classList.add('open');
        }, 300);
    };

    this.close = () => {
        target.forEach((modal) => {
            let targetIn = modal.querySelector('.modal__in');

            targetIn.classList.remove('open');
            setTimeout(() => {
                modal.classList.remove('open');
            }, 300);
        });
    };

    btns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            let link = this.getAttribute('data-target');
            self.open(link);
        });
    });
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            self.close();
        });
    });

};



