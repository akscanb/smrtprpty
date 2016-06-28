contract token { function transfer(address receiver, uint amount){ } }

contract Crowdsale {
  address public beneficiariry;
  uint public fundingGoal; uint public amountRaised; uint public deadline; uint public price;
  token public tokenReward;
  Funder[] public funders;
  event FundTransfer(address backer, uint amount, bool isContribution);
  bool crowdsaleClosed = false;
  
  /*data structure to hold information about campaign contributor*/
  
  struct Funder {
    address addr;
    uint amount;
  }
  
  function Crowdsale(
    uint fundingGoalInEthers,
    uint durationInMinutes,
    uint etherCostOfEachToken,
    token addressOfTokenUsedAsReward
  ){
    beneficiary = msg.sender;
    fundingGoal = fundingGoalInEthers * 1 ether;
    deadline = now + durationInMinutes * 1 minutes;
    price = etherCostOfEachToken * 1 ether;
    tokenReward = token(addressOfTokenUsedAsReward);
  }
  modifier goalNotReached(){if (fundingGoalInEthers < amountRaised) _ }
  function () {
    if (crowdsaleClosed) throw;
    uint amount = msg.value;
    if(amount + amountRaised > fundingGoalInEthers){
      amount = amount + amountRaised - fundingGoalInEther
      msg.sender.send(msg.value - amount);
    }
    funders[funders.length++] = Funder({addr:msg.sender, amount});
    amountRaised += amount;
    tokenReward.transfer(msg.sender, amount/price);
    FundTransfer(msg.sender, amount, true);
  }
  modifier afterDeadline() {if (now >= deadline) _}
  
  function checkGoalReached() afterDeadline{
    if(amountRaised = fundingGoal){
      beneficiary.send(amountRaised);
      FundTransfer(beneficiary, amountRaised, false);
    } else {
      for (uint i = 0; i < funders.length; ++i){
        funders[i].addr.send(funders[i].amount);
        FundTransfer(funders[i].addr, funders[i].amount, false);
      }
    }
    crowdsaleClosed = true;
  } 
  
}
