import './sass/main.scss';

const TARGET_DATE = 'Jul 17, 2021';
/*Проверка исчезновения таймера после окончания отсчета
const TARGET_DATE = new Date(Date.now()+5000);*/


class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    }

    start() {
        const targetTime = this.targetDate.getTime();

        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetTime - currentTime;
            const time = this.getTimeComponents(deltaTime);
            const selectorEl = document.querySelector(this.selector);

            if (deltaTime < 0) {
                selectorEl.classList.add('visible');
                clearInterval(intervalId);
                return;
            }

            const spansTime = Array.from(selectorEl.querySelectorAll('span.value'));

            spansTime.forEach((item) => {
                const key = item.dataset.value;
                
                if (item.textContent !== time[key]) {
                    item.classList.add('color');

                    const timeId = setTimeout(() => {
                        item.classList.remove('color');
                    },500);
                }

                item.textContent = time[key];
             });
        }, 1000);
    }

    getTimeComponents(time) {

        /*
        * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
        * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
        */
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

        /*
        * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
        * остатка % и делим его на количество миллисекунд в одном часе
        * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
        */
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

        /*
        * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
        * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
        */
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

        /*
        * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
        * миллисекунд в одной секунде (1000)
        */
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        //console.log(`${days}:${hours}:${mins}:${secs}`);
        return {days, hours, mins, secs};
    }
    
    /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
    pad(value) {
            return String(value).padStart(2, '0');
        }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(TARGET_DATE),
});

countdownTimer.start();