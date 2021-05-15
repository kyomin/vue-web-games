/* 
    웹팩의 entry 파일이다.
    웹팩이 이를 통해 
    NumberBaseball.html + NumberBaseball.vue + Vue 인스턴스를 하나로 합쳐
    
    ./dist/app.js로 만들어주는 것이다.
*/
import Vue from 'vue';
import NumberBaseball from './NumberBaseball.vue';

new Vue(NumberBaseball).$mount('#root');