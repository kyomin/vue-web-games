import Vue from 'vue';
import Vuex from 'vuex';

// Vue와 Vuex를 연결한다.
Vue.use(Vuex);

// 변수를 통해 관리해야 오타 낼 확률이 줄어든다.
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
    state: {    // Vue의 data와 비슷
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        turn: 'O',
        winner: ''
    },
    getters: {  // Vue의 computed와 비슷
        winnerMessage(state) {
            return state.winner + '님이 승리하셨습니다';
        }
    },
    mutations: {    // state를 동기적으로 수정할 때 사용. state는 얘를 통해서 update해야 한다.
        // 뮤테이션의 함수는 대문자로 명명하는게 Vue 커뮤니티의 규칙이다.
        // 첫 번째 매개변수는 state, 두 번째 매개변수는 data이다.
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            // Vuex는 $set이 없기 때문에 이를 통해 배열 인덱스로 값 수정을 해야 화면에 반영된다.
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    }, 
    actions: {  // 비동기를 사용할 때, 또는 여러 mutation을 연달아 실행할 때

    }
});