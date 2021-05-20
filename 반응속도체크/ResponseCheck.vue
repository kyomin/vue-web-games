<template>
  <div>
    <!-- 
        v-bind를 통해 class 속성에 state 데이터를 묶는다. 
        이로인해 class가 state 값에 따라 동적으로 바뀐다.
    -->
    <div id="screen" v-bind:class="state" v-on:click="onClickScreen">{{ message }}</div>
    <div>
        <div>평균 시간: {{ result.reduce((a, c) => a+c, 0) / result.length || 0 }}ms</div>
    </div>
    <button v-on:click="onReset">리셋</button>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
    data() {
        return {
            result: [],
            state: 'waiting',
            message: '클릭해서 시작하세요'
        }
    },
    methods: {
        onReset() {
            this.result = [];
        },
        onClickScreen() {
            if (this.state === 'waiting') {
                this.state = 'ready';
                this.message = '초록색이 되면 클릭하세요';

                // 임의의 시간을 주어 now로 변화시킨다.
                timeout = setTimeout(() => {
                    this.state = 'now';
                    this.message = '지금 클릭!';

                    startTime = new Date();
                }, Math.floor(Math.random() *1000) + 2000);    // 2 ~ 3초
            } else if (this.state === 'ready') {
                // setTimeout 취소의 역할
                clearTimeout(timeout);

                this.state = 'waiting';
                this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요';
            } else if (this.state === 'now') {
                endTime = new Date();

                this.state = 'waiting';
                this.message = '클릭해서 시작하세요';

                this.result.push(endTime - startTime);
            }
        }
    }
}
</script>

// scoped : 다른 컴포넌트에서는 아래 스타일이 적용되지 않고, 현 컴포넌트에만 스타일을 적용하고 싶을 때
<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }

    #screen.waiting {
        background-color: aqua;
    }

    #screen.ready {
        background-color: red;
        color: white;
    }

    #screen.now {
        background-color: greenyellow;
    }
</style>