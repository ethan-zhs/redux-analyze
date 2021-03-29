// redux-error-report
// export default function errorReport(store) {
//     const next = store.dispatch
        
//     return function dispatchAndReportErrors(action) {                 
//         try {                               
//             return next(action)           
//         } catch (err) {                         
//             console.error('捕获⼀个异常!', err)                         
//             throw err                 
//         }         
//     } 
// }

// 进一步柯里化
const errorReport = store => next => action => {        
    try {                               
        return next(action)           
    } catch (err) {                         
        console.error('捕获⼀个异常!', err)                         
        throw err                 
    }     
}

export default errorReport