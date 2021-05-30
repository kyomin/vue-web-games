<template>
  <div>
    <div 
        id="computer" 
        v-bind:class="{ state: true, hello: false }" 
        v-bind:style="computedStyleObject"
    >
    </div>
    <div>
        <button v-on:click="onClickButton('바위')">바위</button>
        <button v-on:click="onClickButton('가위')">가위</button>
        <button v-on:click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>

<script>
// 가위 바위 보가 그려진 이미지를 
// 각 종류에 맞게 나타낼 수 있도록 기준 좌표를 정리한다.
const rspCords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

export default {
    data() {
        return {
            imgCord: rspCords.바위,
            result: '',
            score: 0
        }
    },
    computed: {
        computedStyleObject() {
            return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCord} 0`, fontSize: '14px', width: '150px', height: '210px' };
        }
    },
    methods: {
        onClickButton(choice) {

        }
    }
}
</script>

<style>

</style>