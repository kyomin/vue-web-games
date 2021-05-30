<template>
  <div>
    <!-- 
        v-bind를 통해 class 속성에 state 데이터를 묶는다. 
        이로인해 class가 state 값에 따라 동적으로 바뀐다.
    -->
    <div id="screen" v-bind:class="state" v-on:click="onClickScreen">{{ message }}</div>
    <!--  
        template 태그는 없는 태그로 취급한다.
        따라서, 위의 screen div와 평균시간 div, 리셋 button은 형제로 취급된다.
        이는 그냥 묶어주기 위한 용도의 div를 대체할 때 사용한다.
        
        리액트의 Fragment와 유사하다.
        다만 주의할 점은 가장 상위를 template으로 감싸지 못한다.
        가장 바깥은 div로 감싸야 한다.
    -->
    <template v-if="result.length">
        <div>평균 시간: {{ average }}ms</div>
        <button v-on:click="onReset">리셋</button>
    </template>
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
    // 일반 데이터를 가공해서 쓸 때에는 보통 computed를 쓴다.
    // 이 값이 캐싱이 돼서 만일 레이아웃의 어떤 데이터가 변경 되어도
    // 다시 재 계산하는 것이 아니라 캐싱된 데이터를 가져오므로 최적화에 좋다. 
    computed: {
        average() {
            return this.result.reduce((a, c) => a+c, 0) / this.result.length || 0;
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