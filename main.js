const crypto = require("crypto-js");

class Block {
  constructor(index, timeStamp, data, previousHash = "") {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 1;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    console.log(this);
    //SHA256 returns object, so remember to convert it to string again
    return crypto
      .SHA256(
        this.index +
          this.previouseHash +
          this.timeStamp +
          JSON.stringify(this.data) +
          this.nonce.toString()
      )
      .toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }
  createGenesisBlock() {
    return new Block(0, "01/01/2018", "Nan Genesis Block", "0");
  }
  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLastestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const preBlock = this.chain[i - 1];
      if (currentBlock.hash != currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash != preBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let chain = new Blockchain();

console.log("mining...");
chain.addBlock(new Block(1, "03/01/2018", "Nan Genesis Block 2"));
console.log("mining...");
chain.addBlock(new Block(2, "03/01/2018", { test: "test" }));

console.log(JSON.stringify(chain, null, "\t"));
console.log("check chain validity: ", chain.isChainValid());
