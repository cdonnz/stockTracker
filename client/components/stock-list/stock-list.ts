///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View, Input} from 'angular2/core';
 
import {NgFor} from 'angular2/common';

//import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
//import {Jsonp} from 'angular2/http';

import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/components/stock-form/stocks-form'; 
 
import {RouterLink} from 'angular2/router';

import {StockModel} from 'client/services/stock-model';

import {StockShares} from 'client/components/stock-list/stock-shares';

import {PageLayout} from 'client/components/page-layout/page-layout';

import {CookieService} from 'client/services/cookie-service';

import {StockService} from 'client/services/stock-service';

declare var window: any;

@Component({
    selector: 'stock-list'
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

  removeStock(stock) {
     this.stockService.removeStock(stock.ticker);
  }
}