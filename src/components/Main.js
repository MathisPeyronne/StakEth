import React, { Component } from 'react'
import StakeForm from './StakeForm'
import ResolveForm from './ResolveForm'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'stake'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'stake') {
      content = <StakeForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        StakeTokens={this.props.StakeTokens}
      />
    } else {
      content = <ResolveForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        Partner_Decision={this.props.Partner_Decision}
      />
    }

    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'stake' })
              }}
            >
            Stake
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'resolve' })
              }}
            >
            Resolve
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>

        </div>

      </div>
    );
  }
}

export default Main;
