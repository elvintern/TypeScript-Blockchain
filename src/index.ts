import * as crypto from 'crypto';

interface BlockShape {
  hash: string;
  prehash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prehash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prehash, height, data);
  }
  static calculateHash(prehash: string, height: number, data: string) {
    const toHash = `${prehash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('Frist one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');

console.log(blockchain.getBlocks());
