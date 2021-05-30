<template>
  <div class="ball" :style="{ background }">{{ number }}</div>
</template>

<script>
export default {
    name: 'LottoBall',  // 컴포넌트의 이름 지정. 지정하지 않으면 파일명이 디폴트로 컴포넌트명이 된다.
    props: ['number'],
    data() {
        let background;

        return {
            background
        };
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