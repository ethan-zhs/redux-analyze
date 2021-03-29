export function createStore(reducer, heightener) {

    if (heightener) {
        heightener(createStore)(reducer)
    }

    let state = {}
    let observers = []

    function getState() {
        return state
    }

    function dispatch(action) {
        state = reducer(state, action)
        observers.forEach(fn => fn())
    }

    function subscribe(handle) {
        observers.push(handle)
    }

    // 初始化state
    dispatch({type: '@@REDUX_INIT'})

    return {
        getState,
        dispatch,
        subscribe
    }
}

export const applyMiddleware = (middlewares) => createStore => reducer => {         
    const store = createStore(reducer)         
    let { getState, dispatch } = store         
    const params = {               
        getState,               
        dispatch: (action) => dispatch(action) 
        //解释⼀下这⾥为什么不直接 dispatch: dispatch
        //因为直接使⽤dispatch会产⽣闭包,导致所有中间件都共享同⼀个dispatch,如果有中间件修改了dispatch或者进⾏异步dispatch就可能出错         
    }
 
    const middlewareArr = middlewares.map(middleware => middleware(params))          
    dispatch = compose(...middlewareArr)(dispatch)         
    return { ...store, dispatch } 
}

//compose这⼀步对应了middlewares.reverse(),是函数式编程⼀种常⻅的组合⽅法 
function compose(...fns) {     
    if (fns.length === 0) return arg => arg         
    if (fns.length === 1) return fns[0]     
    
    return fns.reduce((res, cur) =>(...args) => res(cur(...args))) 
}