import React, { Component } from 'react'
import ethLogo from '../eth-logo.png'

class StakeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount, partner_address, resolution_clause
          etherAmount = this.etherAmount_input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          partner_address = this.partner_address_input.value
          resolution_clause = this.resolution_clause_input.value
          this.props.StakeTokens(etherAmount, partner_address, resolution_clause)
        }}>

        {/* First input: partner Address */}
        <div>
          <label className="float-left"><b>Partner Address</b></label>
        </div>
        <div className="input-group mb-4">
          <input
            id="partner_address_input"
            type="text"
            ref={(input) => { this.partner_address_input = input }}
            className="form-control form-control-lg"
            placeholder=""
            required />
        </div>

        {/* Second input: Resolution clause */}
        <div>
          <label className="float-left"><b>Resolution clause: You have to ... to get it back</b></label>
        </div>
        <div className="input-group mb-4">
          <textarea
            id="resolution_clause_input"
            type="text"
            rows = "3"
            ref={(input) => { this.resolution_clause_input = input }}
            className="form-control form-control-lg"
            placeholder=""
            />
        </div>

        {/* Third input: Amount Staked */}
        <div>
          <label className="float-left"><b>Amount to Stake</b></label>
          <span className="float-right text-muted">
            Your Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            id="etherAmount_input"
            type="text"
            ref={(input) => { this.etherAmount_input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg">Stake!</button>
      </form>
    );
  }
}

export default StakeForm;
