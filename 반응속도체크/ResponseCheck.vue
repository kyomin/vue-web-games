<template>
  <div>
    <!-- v-bind를 통해 class 속성에 state 데이터를 묶는다. -->
    <div id="screen" v-bind:class="state">{{ message }}</div>
    <div>
        <div>평균 시간: {{  }}</div>
    </div>
    <button v-on:click="onReset">리셋</button>
  </div>
</template>

<script>
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