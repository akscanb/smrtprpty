contract test{
  address owner;
  function test(){
    owner = msg.sender;
  }
  function kill(){
    if(msg.sender == owner)
    suicide(owner);
  }
}
