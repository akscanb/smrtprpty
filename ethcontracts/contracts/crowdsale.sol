contract token { function transfer(address receiver, uint amount){  } }


contract Crowdsale {
    address public beneficiary;
    uint public fundingGoal; uint public amountRaised; uint public deadline; uint public price;
    token public tokenReward;
    Funder[] public funders;
    event FundTransfer(address backer, uint amount, bool isContribution);
    bool crowdsaleClosed = false;

    /* data structure to hold information about campaign contributors */
    struct Funder {
        address addr;
        uint amount;
    }

    /*  at initialization, setup the owner of the contract*/
    function Crowdsale(
        address ifSuccessfulSendTo,
        uint fundingGoalInEthers,
        uint durationInMinutes,
        uint etherCostOfEachToken,
        token addressOfTokenUsedAsReward
    ) {
        beneficiary = ifSuccessfulSendTo;
        fundingGoal = fundingGoalInEthers * 1 ether;
        deadline = now + durationInMinutes * 1 minutes;
        price = etherCostOfEachToken * 1 ether;
        tokenReward = token(addressOfTokenUsedAsReward);
    }
    modifier goalNotReached(){if (fundingGoalInEthers < amountRaised) _ }

    /* The function without name is the default function that is called whenever anyone sends funds to a contract */
    function () goalNotReached {
        if (crowdsaleClosed) throw;
        uint amount = msg.value;
        if(amount + amountRaised > fundingGoalInEthers){
          amount = amount + amountRaised - fundingGoalInEthers;
          msg.sender.send(msg.value - amount);
        }
        funders[funders.length++] = Funder({addr: msg.sender, amount: amount});
        amountRaised += amount;
        tokenReward.transfer(msg.sender, amount / price);
        FundTransfer(msg.sender, amount, true);
    }


    modifier afterDeadline() { if (now >= deadline) _ }


    /* checks if the goal or time limit has been reached and ends the campaign */
    function checkGoalReached() afterDeadline {
        if (amountRaised = fundingGoal){
            beneficiary.send(amountRaised);
            FundTransfer(beneficiary, amountRaised, false);
        } else {
            for (uint i = 0; i < funders.length; ++i) {
              funders[i].addr.send(funders[i].amount);
              FundTransfer(funders[i].addr, funders[i].amount, false);
            }
        }
        crowdsaleClosed = true;
    }
}
