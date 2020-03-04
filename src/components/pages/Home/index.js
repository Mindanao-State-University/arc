import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resourceDetailReadRequest } from 'store/actions'
import { fromEntities } from 'store/selectors'

class Home extends Component {

  loadPage = () => {
    const { resourceDetailReadRequest } = this.props
    resourceDetailReadRequest('barangays', 38534)
  }

  componentDidMount() {
    this.loadPage()
  }

  render() {
    const { detail } = this.props
    return (
      <React.Fragment>
        <h4>Hello World</h4>
        <pre>
          { detail && JSON.stringify(detail, null, 2)}
        </pre>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state = {}) => ({
  detail: fromEntities.getDetail(state, 'barangays', 95),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    resourceDetailReadRequest
  }, dispatch)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home)

