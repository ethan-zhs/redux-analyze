import React from 'react'
import { connect } from './react-redux'

class Example extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div>{this.props.count}</div>
                <button onClick={this.props.add}>add</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => dispatch({type: 'plus'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)