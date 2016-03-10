export class StockModel{
  constructor(ticker,current,percentChange,netChange,description){
    this.ticker = ticker;
    this.current = current;
    this.percentChange = percentChange;
    this.netChange = netChange;
    this.description = description;
    this.rgb = 'pink';
    this.shares = 0;
}
  
  ticker:string = '';
  current:string = '';
  percentChange:number = null;
  netChange:number = null;
  description:string = '';
  color:string = '';
  RGB:string = '';
  addShareBut = 'on';
 

  enterShares(shares){
    this.shares = shares;
    console.log(this,"share added")
  }
 
}