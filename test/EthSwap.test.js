const { assert } = require('chai');

const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap

  before(async () => {
    token = await Token.new()
    ethSwap = await EthSwap.new(token.address)
    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(ethSwap.address, tokens('1000000'))
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'DApp Token')
    })
  })

  /*
  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name()
      assert.equal(name, 'A staking exchange')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(ethSwap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })
  */

  describe('StakeTokens()', async () => {
    let result, contracts_count, partner_balance

    before(async () => {
      // Purchase tokens before each example
      result = await ethSwap.StakeTokens("0x4Cea15a76C1674C7cA5d30238Cc8593d3dCCaFCC", "example description", { from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      
      //Check ability to retrieve
      contracts_count = await ethSwap.contracts_count()
      assert.equal(contracts_count, 1) 
      
      const investor_contract_id = await ethSwap.address_to_staking(investor, "0x4Cea15a76C1674C7cA5d30238Cc8593d3dCCaFCC")

      const contracts = await ethSwap.staking_contracts(investor_contract_id)
    

      /*
      let x = true
      let counter = 0
      let contract_ids = []
      while(x){
        try{
          const investor_contract = await ethSwap.address_to_staking(investor, counter) // should return a array of contracts ids
          contract_ids.push(investor_contract)
          counter++;
        }
        catch(err){
          console.log("here")
          x = false
        }
      }
      console.log(contract_ids[0].toString())
      //assert.equal(investor_contracts, 1)
      */
    
      
      /*
      var arr = [1]
      console.log(investor)
      console.log(investor_contracts)

      assert.equal(investor_contracts, arr)
      */

      /*
      // Check investor token balance after purchase
      let investorBalance = await web3.eth.getBalance(investor)
      assert.isBelow(parseInt(investorBalance), parseInt(web3.utils.toWei('99', 'Ether')))
      */

      /*
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check ethSwap balance after purchase
      let ethSwapBalance
      ethSwapBalance = await token.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), tokens('999900'))
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
      */
    })
    it('decision works', async () => {
      
      //the partner accepts
      result = await ethSwap.Partner_Decision(-1, investor, { from: "0x4Cea15a76C1674C7cA5d30238Cc8593d3dCCaFCC"})

      partner_balance = await web3.eth.getBalance("0x4Cea15a76C1674C7cA5d30238Cc8593d3dCCaFCC")
      console.log(partner_balance)

    })

  })
  /*
  describe('buyTokens()', async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await ethSwap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check ethSwap balance after purchase
      let ethSwapBalance
      ethSwapBalance = await token.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), tokens('999900'))
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sellTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(ethSwap.address, tokens('100'), { from: investor })
      // Investor sells tokens
      result = await ethSwap.sellTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens to ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check ethSwap balance after purchase
      let ethSwapBalance
      ethSwapBalance = await token.balanceOf(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), tokens('1000000'))
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei('0', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await ethSwap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })
  */

})