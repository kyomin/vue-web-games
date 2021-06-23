import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from '../숫자야구/NumberBaseball';
import ResponseCheck from '../반응속도체크/ResponseCheck';
import RockScissorsPaper from '../가위바위보/RockScissorsPaper';
import LottoGenerator from '../로또/LottoGenerator';

// 뷰와 외부 라이브러리를 연결한다.
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/number-baseball', component: NumberBaseball },
        { path: '/response-check', component: ResponseCheck },
        { path: '/rock-scissors-paper', component: RockScissorsPaper },
        { path: '/lotto-generator', component: LottoGenerator },
    ]
});