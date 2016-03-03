export class StockModel{
  constructor(public ticker:string = ''){
    
  }
  current:string = '';
  percentChange:number = '';
  netChange:number = '';
  description:string = '';
  color:string = '';
  RGB:string = '';
 
}