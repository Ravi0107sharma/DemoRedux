import { createStore } from 'redux'

function fun1(state: string, action: any) {
    switch (action.type) {
        case 'Contact':
            state = action.text;
            return state;
        default:
            return state
    }
}

export const store = createStore(fun1, "Store");

store.dispatch({
    type: 'Contact',
    text: 'Contact From Container'
});
// store.dispatch({
//     type: 'ADD_TODO',
//     text: 'Read the docs1'
// });

console.log(store.getState())



export default store;