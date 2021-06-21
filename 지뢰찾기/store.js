import Vue from 'vue';
import Vuex from 'vuex';

// Vue와 Vuex를 연결한다.
Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0   // 0 이상이면 다 opened.
};
/*
    초기에는
    [
        ['-1', '-1', '-1'],
        ['-1', '-1', '-1'],
        ['-1', '-1', '-1']
    ]
*/

const plantMine = (row, cell, mine) => {
    console.log('row cell mine : ', row, cell, mine);

    // [0, 1, 2, ..., row*cell-1]
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];

    // 지뢰를 심을 위치를 랜덤으로 개수만큼 고른다.
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];

    // 일단 NORMAL 상태로 초기화해주고
    for(let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        
        for(let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 지뢰 심을 위치를 뽑은 shuffle로부터 실제 지뢰를 심는다(지뢰를 의미하는 코드 값을 넣는다).
    for(let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export default new Vuex.Store({
    state: {    
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0
        },
        timer: 0,
        halted: true,   // 게임 중단 여부
        result: ''
    },
    getters: {  

    },
    mutations: {    
        [START_GAME](state, { row, cell, mine }) {
            /* 
                다음과 같이 객체 안의 속성에 접근해 값을 바꿀 경우에
                배열에 인덱스로 접근해 값을 바꿀 때와 마찬가지로
                데이터는 변하는데 화면이 안 바뀌는 경우가 생겨 위와 같이 한다.
                반영하고 싶으면 Vue.set을 사용해야 하는 번거로움이 생긴다.
            */
            // state.data.row = row;
            // Vue.set(state.data, 'row', row);

            /* 사용자 input으로부터 받은 값을 state 변수들에 대입해준다.
               데이터의 속성을 변경하는 것이 아니라, 데이터를 통째로 바꾼다.
            */
            state.data = {
                row,
                cell,
                mine
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
        },
        [OPEN_CELL](state, { row, cell }) {
            function checkAround() {
                let around = [];
                if (state.tableData[row-1]) {
                    around = around.concat([
                        state.tableData[row-1][cell-1],
                        state.tableData[row-1][cell],
                        state.tableData[row-1][cell+1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell-1],
                    state.tableData[row][cell+1]
                ]);
                if (state.tableData[row+1]) {
                    around = around.concat([
                        state.tableData[row+1][cell-1],
                        state.tableData[row+1][cell],
                        state.tableData[row+1][cell+1],
                    ]);
                }
                
                const counted = around.filter(function(v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                return counted.length;
            }

            const count = checkAround();
            Vue.set(state.tableData[row], cell, count);
        },
        [CLICK_MINE](state, { row, cell }) {
            // 지뢰 밟았으니 게임 중단
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    }, 
    actions: {  

    }
});