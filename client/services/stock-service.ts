import {StockModel} from 'client/services/stock-model';
import {CookieService} from 'client/services/cookie-service';

declare var window: any;

import {Injectable} from 'angular2/core';
@Injectable()

export class StockService {
  constructor(public cookieService:CookieService){}
  
  stockList = [];
  stocks = []; 
  
  stripShares(){
    let tempArr = [];
    this.stockList.forEach(function(item){
      let target = item.split(':')[0];
      tempArr.push(target);
    })
    return tempArr;
  }
  
  enterShares(stock,shares){
    var index = this.stockList.indexOf(stock);

    if(index > -1) {
      this.stockList.splice(index, 1, stock + ':' + shares);
      this.cookieService.update(this.stockList);
      this.grabStocks();
    }      
  }
  
  insertStock(s){

    let cleanArr =  this.stripShares();
    if(cleanArr.indexOf(s.name) > -1 || s.name === ''){return;}
    
    this.stockList.push(s.name);
    this.cookieService.update(this.stockList);
    this.grabStocks();
  }
  
  removeStock(s){
 
    let cleanArr =  this.stripShares();
    
    let index = cleanArr.indexOf(s);
    if(index > -1) {
      this.stockList.splice(index, 1);
    } 
    this.cookieService.update(this.stockList);
    this.grabStocks();
  }
  
  grabStocks(){
    if(this.stockList.length === 0){
       this.stockList = this.cookieService.cookieGrab();
    }
    let tempList = [];

    this.stockList.forEach(function(i){
      if(i.indexOf(':')> -1){
        let iSplit = i.split(':');
        tempList.push(iSplit[0]);
      }else{
        tempList.push(i);
      }
    });
    
    let stockStr = tempList.join(',');  

    let script = document.createElement('script');
    script.src  = `http://www.foxbusiness.com/ajax/quote/${stockStr}?callback=cb`;
    document.getElementsByTagName('head')[0].appendChild(script);   
    
    let stockList = this.stockList;
    window.cb = (data) => {
      let temp = [];

      let fn = function(s){
        let symbol:string = s.ticker.toLowerCase();
        let percentChange = parseFloat(s.percentChange);
        let netChange = parseFloat(s.netChange);
        let current = parseFloat(s.current);
        let shares = 0;

        stockList.forEach(function(t,i){
          if(t.indexOf(symbol) > -1 && t.indexOf(':') > -1 ){
            shares = parseInt(t.split(':')[1]);
          }
        })

        temp.push(new StockModel(symbol,shares,current,percentChange,netChange,s.description));    
      }
      
      let d = data.quote; 
      if (Object.prototype.toString.call(d) === '[object Array]')  {
        d.forEach(function(s){
          fn(s);      
        });
      }else{
        fn(d); 
      } 
      this.stocks = temp;
    }      
    
  }

}