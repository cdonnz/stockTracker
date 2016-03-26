import {Injectable} from 'angular2/core';

@Injectable()

declare var Cookie: any;

export class CookieService {

  private sArr:string[];
 
  constructor() {

     /* if(Cookie.get('stocksStorage')){
          this.sArr = Cookie.get('stocksStorage').split('-');
      }else{
          this.sArr = [];
      }*/
  }
  cookieGrab(){
    if(Cookie.get('stocksStorage')){
      return Cookie.get('stocksStorage').split('-');
    }else{
      return [];
    } 
  }
  
  stockListGrab(): string[] {
      if(Cookie.get('stocksStorage')){
          return Cookie.get('stocksStorage').split('-');
      }else{
          return [];
      }
  }       

  stockListCheck(stock: string): boolean {
    this.sArr = Cookie.get('stocksStorage').split('-');
    return (this.sArr.indexOf(stock) > -1)? true : false;
  }
   
  isInside(stock: string): boolean {
    
    if(!Cookie.get('stocksStorage')){
      Cookie.set('stocksStorage', '');
      return false;
    }
    
    this.sArr = Cookie.get('stocksStorage').split('-');
    return (this.sArr.indexOf(stock) > -1)? true : false;
  } 
  update(stockList):void{
    Cookie.set('stocksStorage', stockList.join('-'));
  }
  insert(stock: string): void {

    if(!this.isInside(stock)){

        var temp = Cookie.get('stocksStorage').split('-');

        if(temp[0] === ''){
            this.sArr = [stock];
        }else{
            this.sArr.push(stock);
        }
        
       if(this.sArr.length === 1){
           Cookie.set('stocksStorage', this.sArr);
        }else{
           Cookie.set('stocksStorage', this.sArr.join('-'));
        }
    }
  }
 
  remove(stock: string): void {
     ///this.Service.cList.push(stock)
     
    this.sArr = Cookie.get('stocksStorage').split('-');
    let tempArr = [];

    this.sArr.forEach(function(s){
      let target = s.split(':')[0];
      tempArr.push(target);
    })
    let index = tempArr.indexOf(stock);
    if(index > -1) {
      this.sArr.splice(index, 1);
    }    
   
    Cookie.set('stocksStorage', this.sArr.join('-'));
  } 
  
  insertShares(stock: string, shares: number){
    this.sArr = Cookie.get('stocksStorage').split('-');
    var index = this.sArr.indexOf(stock);

    if(index > -1) {
      this.sArr.splice(index, 1, stock + ':' + shares);
      Cookie.set('stocksStorage', this.sArr.join('-'));
    }   
  }
  
   
}