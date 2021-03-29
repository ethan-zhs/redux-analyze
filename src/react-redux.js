import React from 'react'
import PropTypes from 'prop-types'

export class Provider extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.store
    }

    // 必须设置childContext类型
    static childContextTypes = {
        store: PropTypes.object
    }

    // 设置全局context的固定写法
    getChildContext() {
        return { store: this.store }
    }

    render() {
        return this.props.children
    }
}

export function connect(mapStateToProps, mapDispatchToProps) {
    return function(WrapperComponent) {
        return class extends React.Component { 
            // 获得全局context的固定写法
            static contextTypes = { 
                store: PropTypes.object,
            }

            componentDidMount() {
                // 订阅事件，当store更新了触发handleStoreChange
                this.context.store.subscribe(this.handleStoreChange.bind(this))               
            }

            handleStoreChange() {                           
                // 触发更新 
                // 触发的⽅法有多种,这⾥为了简洁起⻅,直接forceUpdate强制更新,读者也可以通过setState来触发⼦组件更新                           
                this.forceUpdate()                 
            }  

            render() {
                return (
                    <WrapperComponent
                        {...this.props}
                        {...mapStateToProps(this.context.store.getState())}
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
                )
            }
        }
    }
}