import React, { Component } from 'react'

class SellForm extends Component {
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
        let partner_address, partner_happy
        partner_address = this.partner_address_input.value
        partner_happy = this.partner_happy_input.value
        this.props.Partner_Decision(partner_happy, partner_address)
      }}>

      {/* First input: Staker Address */}
      <div>
        <label className="float-left"><b>Staker Address</b></label>
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

      {/* Second input: Are you happy */}
      <div>
        <label className="float-left"><b>Has he met the resolution clause ?</b></label>
      </div>
      <div className="input-group mb-4">
        <select 
          className="form-control form-control-lg"
          ref={(input) => { this.partner_happy_input = input }}
          id="partner_happy_input">
          <option value="1">Yes, he has met the resolution clause</option>
          <option value="-1">No, he has not met the resolution clause</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary btn-block btn-lg">Resolve!</button>
    </form>
    );
  }
}

export default SellForm;
