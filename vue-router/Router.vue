<template>
    <div>
        <!-- 
            라우팅을 해도 바뀌지 않는 공통적인 레이아웃 부분 
            a 태그로 바뀐다.
            하지만, a 태그처럼 실제로 다른 페이지로 가는게 아니라,
            다른 컴포넌트를 불러오는 특수한 기능을 한다.
        -->
        <div>
            <router-link to='/game/index'>게임 매쳐</router-link>
            <router-link to='/game/number-baseball'>숫자야구</router-link>
            <router-link to='/game/response-check'>반응속도체크</router-link>
            <router-link to='/game/rock-scissors-paper'>가위바위보</router-link>
            <router-link to='/game/lotto-generator'>로또생성기</router-link>
            <router-link to='/game/mine-sweeper'>지뢰찾기</router-link>
        </div>
        <!-- 라우팅에 따라 바뀌는 부분 -->
        <router-view></router-view>
    </div>
</template>

<script>
import router from './routes';

export default {
    router,

}
</script>

<style>

</style>