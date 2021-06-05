<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
    name: 'LottoBall',  // 컴포넌트의 이름 지정. 지정하지 않으면 파일명이 디폴트로 컴포넌트명이 된다.
    props: {
        number: Number
    },
    // 기존 값을 이용해서 새로운 것을 계산할 때는 computed를 이용한다!
    computed: {
        styleObject() {
            let background;
            if (this.number < 10) {
                background = 'red';
            } else if (this.number < 20) {
                background = 'orange';
            } else if (this.number < 30) {
                background = 'yellow';
            } else if (this.number < 40) {
                background = 'blue';
            } else {
                background = 'green';
            }

            return {
                background
            };
        }
    }
}
</script>

<style>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>