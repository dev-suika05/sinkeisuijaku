import { createApp } from "https://unpkg.com/vue@3.2.4/dist/vue.esm-browser.prod.js";

const App = {
  state: {
    app: null,
  },
  app() {
    this.state.app = createApp({
      data() {
        return {
          page: 'start',
          timer: '',
          score: '',
          cardLengthMax: 0,
          flg: {
            clear: false,
          },
          _app: null,
          _time: null,
        }
      },
      methods:{
        initGame() {
          this._app = document.querySelector('#app');
          this._app.classList.add('is-game-count-start');

          this.cardSet();

          setTimeout(() => {
            this._app.classList.remove('is-game-count-start');
            this.timeCount();
            this.checkCorrect();
          },4000);
        },
        timeCount() {
          this._time = document.querySelector('[data-time]');

          const _this = this;
          const targetElm = _this._time;
          let startTime = Date.now();
          let timeOut;

          function displayTime () {
            const currentTime = new Date(Date.now() - startTime);
            const m = String(currentTime.getMinutes()).padStart(2, '0');
            const s = String(currentTime.getSeconds()).padStart(2, '0');
            const ms = String(currentTime.getMilliseconds()).slice(-2);
          
            targetElm.textContent = `${m}:${s}:${ms}`;
            timeOut = setTimeout(()=> {
              displayTime();
            },10);
            if(_this.flg.clear) {
              clearTimeout(timeOut);
            }
          }
          displayTime();
        },
        cardSet() {
          let randoms = [];
          this.cardLengthMax = document.querySelectorAll('[data-card-item]').length;
          
          const min = 1;
          const max = this.cardLengthMax;

          // 重複チェック
          for(let i = min; i<= max; i++) {
            while(true) {
              let temp = intRandom(min,max);
              if(!randoms.includes(temp)) {
                randoms.push(temp);
                break;
              }
            }
          }
          
          function intRandom(min,max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          for(let i = 0; i < max; i++) {
            let randomsNum = randoms[i];
            document.querySelectorAll('[data-card-item]')[i].setAttribute('id','is-position-'+ randomsNum +'');
          }
        },
        actionStart() {
          this.page = 'game';

          setTimeout(function () {
            document.querySelector('.l-wrap').scrollTo(0, 0);
          }, 0);

          this.$nextTick(() => {
            this.initGame();
          });
        },
        checkCorrect() {
          const _this = this;
          const appElm = _this._app;
          const max = this.cardLengthMax;
          let hitNum = 0;
          let elmData = [];
          let elmId = [];
          
          document.querySelectorAll('[data-card-item]').forEach(($item) => {
            $item.addEventListener('click',function() {
              hitNum ++;
              $item.classList.add('is-active');
              appElm.classList.add('is-check');
              elmData.push($item.dataset.cardItem);
              elmId.push($item.getAttribute('id'));

              if(hitNum >= 2) {
                setTimeout(() => {
                  if(!(elmData[0] === elmData[1])) {
                    document.querySelector('#' + elmId[0]).classList.remove('is-active');
                    document.querySelector('#' + elmId[1]).classList.remove('is-active');
                  }
                  hitNum = 0;
                  elmData = [];
                  elmId = [];
                },1000);
              } 
              setTimeout(()=> {
                appElm.classList.remove('is-check');
              },1000);

              if(max === document.querySelectorAll('[data-card-item].is-active').length) {
                const score = document.querySelector('[data-time]').textContent;
                _this.flg.clear = true;
                _this._app.classList.add('is-result');
                setTimeout(() => {
                  _this.result(score);
                },2000);
              }
            });
          });
        },
        result(score) {
          this.page = 'result';
          setTimeout(() => {
            document.querySelector('[data-result-score]').textContent = score;
          });
        },
      },
    });
    this.state.app.mount('#app');
  },
  init() {
    this.app();
  }
}

window.addEventListener('load',function(){
  this.document.querySelector('body').classList.add('is-load');
  App.init();
});