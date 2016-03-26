///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View, Input} from 'angular2/core';
 
import {NgFor} from 'angular2/common';

//import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
//import {Jsonp} from 'angular2/http';

import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/components/stock-form/stocks-form'; 
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {StockModel} from 'client/services/stock-model';

import {StockShares} from 'client/components/stock-list/stock-shares';

import {PageLayout} from 'client/components/page-layout/page-layout';

import {StockCollection} from 'client/services/stock-collection';

import {CookieService} from 'client/services/cookie-service';

import {StockService} from 'client/services/stock-service';

declare var window: any;

@Component({
    selector: 'stock-list',
    //inputs: ['foo']//,
    //directives: [PageLayout]
})
   
@View({
    templateUrl: '/client/components/stock-list/stock-list.html',
    directives: [NgFor, StocksForm, StockShares, RouterLink]
})

export class StockList {
  @Input() allStocks;
  @Input() cookieList;


  constructor(public stockService:StockService) {

    let c = 0;
    setInterval(() => {
      
      if(stockService.stocks.length !==0){
        
          this.stocks = stockService.stocks;  
      }
      c++;
    },1000);
    
    
    
  }   

  removeStock(stock) {console.log("hi",stock.ticker)
     this.stockService.removeStock(stock.ticker)
    //console.log(stockService.stockList,"remove");
    return;
     this.cookieService.cList.push("G")
    
    let aS = this.allStocks;
    //let cList = this.cL;
        
    aS.forEach(function(s,i){
      if(stock.ticker === s.ticker){
        aS.splice(i,1); 
        //cList.remove(s.ticker)
      }
    })  
    //console.log(cList.sArr,"after remove")
  }
    

}