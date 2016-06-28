contract dumb{
  uint public data;

  function dumb(uint initialvalue){
    data = initialvalue
  }
  function set(uint x){
    data = x
  }
  function get() constant returns (uint retVal){
    return data;
  }
}
