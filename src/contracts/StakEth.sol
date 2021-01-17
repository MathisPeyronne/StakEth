pragma solidity ^0.5.0;

import "./Token.sol";

contract StakEth {
  string public name = "StakEth";
  uint public contracts_count = 0;
  Token public token;
  uint public rate = 100;

  struct Staking_contract{
    address payable staker;
    address payable partner;
    uint partner_happy;
    string resolution_clause;
    uint amount_staked;
  }

  //key: an id, elem: a specific contract
  mapping(uint => Staking_contract) public staking_contracts;
  //key: an address, elem: all the contracts he is a staker in
  mapping(address => mapping(address => uint)) public address_to_staking;  
  //key: an address, elem: all the contracts he is a partner in
  mapping(address => mapping(address => uint)) public address_to_partner;

  event TokensStaked(
    address payable staker,
    address payable partner,
    int partner_happy,
    string resolution_clause,
    uint amount_staked
  );

  event TokensResolved(
    address payable staker,
    address payable partner,
    int partner_happy,     // use a three state boolean(-1: False, 0: don't know yet, 1: True)
    string resolution_clause,
    uint amount_staked
  );

  constructor(Token _token) public {
    token = _token;
  }

  function StakeTokens(address payable _partner_address, string memory _resolution_clause) public payable {
    //require(msg.value > 0);

    contracts_count ++;

    staking_contracts[contracts_count] = Staking_contract(msg.sender, _partner_address, 0, _resolution_clause, msg.value);

    address_to_staking[msg.sender][_partner_address] = contracts_count;

    address_to_partner[_partner_address][msg.sender] = contracts_count;

    emit TokensStaked(msg.sender, _partner_address, 0, _resolution_clause, msg.value); // 0 means don't know yet
  }


  function Partner_Decision(int partner_happy, address payable staker_address) public {

    Staking_contract memory staking_contract = staking_contracts[address_to_staking[staker_address][msg.sender]];

    require(partner_happy != 0);

    if(partner_happy == 1){
      address(staker_address).transfer(staking_contract.amount_staked);
    } else{
      msg.sender.transfer(staking_contract.amount_staked);
    }

    emit TokensResolved(staker_address, msg.sender, partner_happy, staking_contract.resolution_clause,  staking_contract.amount_staked);
  }

  /*
  function sellTokens(uint _amount) public {
    // User can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate;

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token), _amount, rate);
  }
  */
}
