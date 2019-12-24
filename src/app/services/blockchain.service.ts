import { Injectable } from '@angular/core';
import { BlockChain } from 'hangcoin';
import  EC from "elliptic";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  
  public blockchainInstance = new BlockChain();
  public walletKeys = [];

  constructor() { 
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('my-wallet-address');

    this.generateWalletKeys();
  }

  getBlocks(){
    return this.blockchainInstance.chain;
  }

  private generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });
  }

}
