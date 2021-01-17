import React, { Component } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import StakEth from '../abis/StakEth.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token

    const networkId =  await web3.eth.net.getId()

    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }


    // Load StakEth
    const stakEthData = StakEth.networks[networkId]
    if(stakEthData) {
      const stakEth = new web3.eth.Contract(StakEth.abi, stakEthData.address)
      this.setState({ stakEth })
    } else {
      window.alert('StakEth contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  StakeTokens = (_amount_staked, _partner_address, _resolution_clause) => {
    this.setState({ loading: true })
    this.state.stakEth.methods.StakeTokens(_partner_address, _resolution_clause).send({ from: this.state.account, value: _amount_staked}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  Partner_Decision = (_partner_happy, _staker_address) => {
    //the right one
    this.state.stakEth.methods.Partner_Decision(_partner_happy, _staker_address).send({ from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.stakEth.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      stakEth: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    window.myStateObject = this
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        StakeTokens={this.StakeTokens}
        Partner_Decision={this.Partner_Decision}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://github.com/MathisPeyronne/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
