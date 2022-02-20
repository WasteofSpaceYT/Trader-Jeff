import React from 'react';

function Sell() {

    var submit = (event: any) => {

    }

  return (
    <div>
    <h1>Sell</h1>
    <form onSubmit={submit}>
    <input type="text" placeholder="Token" style={{marginBottom: 10}} required />
    <br />
    <input type="text" placeholder="Amount" style={{marginBottom: 10}} required />
    <br />
    <input type="submit" value="Sell" />
    </form>
    </div>
  );
}

export default Sell;