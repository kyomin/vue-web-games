<template>
  <div>
    <div id="computer" v-bind:style="computedStyleObject"></div>
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

let interval = null;
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
            return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCord} 0` };
        }
    },
    methods: {
        onClickButton(choice) {

        }
    },
    /*
        Component Life Cycle
    */
    
    // 처음에 컴포넌트가 보여지는 순간!
    // 보여지긴 하지만 화면에 나타나기 전이다.
    // 데이터가 자바스크립트 상에서 다 준비되면 created가 된다 생각하자.
    beforeCreate() {
        console.log('beforeCreate !!');
    },
    created() {
        console.log('created !!');
    },

    // 렌더링에 필요한 데이터들이 계산되어 컴포넌트가 화면에 나타난 후!
    // 화면 관련된 작업을 여기서 한다. 화면에 표시되고 난 후이기 때문이다.
    beforeMount() {
        console.log('beforeMount !!');
    },
    mounted() {
        console.log('mounted !!');

        // setInterval 함수는 setTimeout과 달리 콜백 함수를 주기적으로 실행한다.
        interval = setInterval(() => {
            if (this.imgCord === rspCords.바위) {
                this.imgCord = rspCords.가위;
            } else if (this.imgCord === rspCords.가위) {
                this.imgCord = rspCords.보;
            } else if (this.imgCord === rspCords.보) {
                this.imgCord = rspCords.바위;
            }
        }, 100);
    },

    // 데이터가 변경되어 화면에 보여지는 컴포넌트가 바뀔 때
    beforeUpdate() {
        console.log('beforeUpdate !!');
    },
    updated() {
        console.log('updated !!');
    },

    // 컴포넌트가 화면 상에서 사라졌을 때이다.
    // mounted 시에 호출했던 setInterval은 컴포넌트가 사라진 후에도 계속 실행된다.
    // 메모리 누수 : 쓸 때 없는 작업이 계속해서 실행되거나 남아있는 상황.
    // 이와 같은 작업을 해제하는 작업을 destroy 시에 해준다.
    beforeDestroy() {
        console.log('beforeDestroy !!');
        clearInterval(interval);
    },
    destroyed() {
        console.log('destroyed !!');
    }
}
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>