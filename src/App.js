import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Transactions from './Transactions';
import Send from './Send';
import Import from './Import';
import Bitcoin, { Transaction } from 'bitcore-lib-cash';
import axios from 'axios';
class App extends Component {

  constructor(state) {
    
    super(state)
    Bitcoin.Networks.defaultNetwork = Bitcoin.Networks.testnet;
    var key = new Bitcoin.PrivateKey();
    this.state = {address: key.toAddress().toString(),wif: key.toWIF().toString()}
    this.newAddress = this.newAddress.bind(this);
    this.importWif = this.importWif.bind(this);
    this.sendBch = this.sendBch.bind(this);

  }

  newAddress = () => {
    var newkey = new Bitcoin.PrivateKey();
    this.setState({address: newkey.toAddress().toString(),wif: newkey.toWIF().toString()})
  }

  importWif = (wif) => {
    var importedkey = new Bitcoin.PrivateKey.fromWIF(wif);
    this.setState({key: importedkey,address: importedkey.toAddress().toString(),wif: importedkey.toWIF().toString()})

  }
  sendBch = () => {
    //get unspent outputs of an address from blockdozer
    
    var self = this;
    axios.get(`http://tbcc.blockdozer.com/insight-api/addr/${this.state.address}/utxo`)
    .then(function(response) {
      //push the transaction
      console.log(response);
      var utxo = new Bitcoin.Transaction.UnspentOutput({
        "txid": response.data[0].txid,
        "vout": 0,
        "address": response.data[0].address,
        "scriptPubKey": response.data[0].scriptPubKey,
        "amount": response.data[0].amount
      })
      var transaction = new Bitcoin.Transaction().
      from(utxo).
      to('mgRoeWs2CeCEuqQmNfhJjnpX8YvtPACmCX',50000).change(self.state.address).sign(self.state.key);
      console.log(transaction.serialize())
    })
  }

  render() {
    return (
      <Router>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h3 className="center-align">Anonymous Online Bitcoin Cash Wallet</h3>
            <h5 className="center-align">You can send, receive and check your transactions in this online wallet without needing to register or confirm your ID. There are no limits and no obstacles, exchange away!</h5>
            <p className="center-align">Your Bitcoin Cash Address:</p>
            <div className="col s4 offset-s4 grey lighten-2">
              <code className="center-align">{this.state.address}</code>
            </div>
            <br/>
            <p className="center-align">Your WIF Key (save this to use this wallet again)</p>
            <div className="col s6 offset-s3 grey lighten-2">
              <code className="center-align">{this.state.wif}</code>
            </div>
            <br/>
          </div>
      </div>

      <div className="row">
          <div className="col s8 offset-s2">
            <a className="waves-effect waves-light btn" onClick={this.newAddress}>NEW ADDRESS</a>
            <Link to='/send' className="waves-effect waves-light btn">SEND</Link>
            <Link to='/transactions' className="waves-effect waves-light btn">TRANSACTIONS</Link>
            <Link to='/import' className="waves-effect waves-light btn">IMPORT</Link>
          </div>

      </div>
      <div className="row">
        <div className="col s12">
        <Route path='/send' component={() => <Send sendBch={this.sendBch} />}/>
        <Route path='/transactions' component={Transactions}/>
        <Route path='/import' component={() => <Import address={this.state.address} importWif={this.importWif}/>}/>
        </div>
      </div>
      
      <p className="center-align">Developed by <a href="https://github.com/jbirer">jbirer</a> with hate and tap water</p>
    </div>
    </Router>
    );
  }
}

export default App;
