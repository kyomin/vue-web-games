<template>
  <div>
      <div>당첨 숫자</div>
      <div id="결과창">
          <lotto-ball 
            v-for="ball in winBalls" 
            v-bind:key="ball" 
            v-bind:number="ball"
          />
      </div>
      <div>보너스</div>
      <lotto-ball 
        v-if="bonus" 
        v-bind:number="bonus"
      />
      <button v-if="redo" v-on:click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
    components: {
        'lotto-ball': LottoBall
    },
    data() {
        return {
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false
        }
    },
    computed: {

    },
    methods: {
        onClickRedo() {
            // 초기화
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;
        },
        showBalls() {
            for (let i=0; i<this.winNumbers.length-1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                }, (i+1)*1000);
            }

            timeouts[6] = setTimeout(() =>{
                this.bonus = this.winNumbers[6];
                this.redo = true;
            }, 7000);
        }
    },

    // mounted에서 setTimeout, setInterval 함수를 사용하게 되면,
    // 화면이 중간에 사라지면 메모리 누수가 될 수 있다.
    mounted() {
        this.showBalls();
    },

    // 그래서 방어코드로 이 부분에서 해제를 해야 한다.
    beforeDestroy() {
        timeouts.forEach((t) => {
            clearTimeout(t);
        });
    },

    // 어떤 값이 바뀌었는지, 안 바뀌었는지 감시하는 역할을 한다.
    // computed는 새로운 값을 리턴하고,
    // watch는 특정 동작을 수행한다고 생각하면 된다.
    watch: {
        // winBalls 데이터의 값을 관찰하고 싶다!
        // 변화가 생기면 아래 함수가 실행이 된다.
        // 하지만 너무 watch를 남용하면 코드가 꼬이게 된다.
        winBalls(value, oldValue) {
            console.log(value, oldValue);
            if (value.length === 0) {
                this.showBalls();
            }
        }
    }
}
</script>

<style>

</style>