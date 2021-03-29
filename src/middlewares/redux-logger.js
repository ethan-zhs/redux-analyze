// redux-logger
// export default function logger(store) {
//     const next = store.dispatch

//     // 高阶函数，直接返回新的action
//     return function dispatchAndLog(action) {
//         const result = next(action)
//         console.log('next state:', {
//             action,
//             state: store.getState()
//         })
//         return result
//     }
// }

// 进一步柯里化
const logger = store => next => action => {
    const result = next(action)
    console.log('next state:', {
        action,
        state: store.getState()
    })
    return result
}

export default logger