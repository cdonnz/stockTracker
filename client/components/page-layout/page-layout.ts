///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/components/stock-form/stocks-form'; 
 
import {Donut} from 'client/components/donut/donut'; 
 
import {RouterLink} from 'angular2/router';

import {StockList} from 'client/components/stock-list/stock-list';

import {CookieService} from 'client/services/cookie-service';
import {StockService} from 'client/services/stock-service';

@Component({
    selector: 'page-layout'
})
   
@View({
    templateUrl: '/client/components/page-layout/page-layout.html',
    directives: [NgFor, StockList, StocksForm, Donut, RouterLink]
})

export class PageLayout {
  stocks:Array<Object> = [];

  newStockFlag:Boolean = false;
  
  constructor(public cookieService:CookieService,public stockService:StockService){
    
    stockService.grabStocks();
    let c = 0;
    setInterval(() => {

      if(c%10===0 || this.newStockFlag){
        stockService.grabStocks();
        this.stocks = stockService.stocks;
        this.newStockFlag = false;
        
      }
      c++;
    },1000);    
  }
}