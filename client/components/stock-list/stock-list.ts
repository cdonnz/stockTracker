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
  @Input() graphdata;
  sList = [];

  constructor() {
      

      console.log(222222)
      let sC = new StockCollection();
      sC.grabStocks();
      let counter = 0;
      setInterval(() => {
        console.log(this.graphdata[0].value,">>>>>>>")
        if(counter%10===0){
         this.sList =  sC.sList;
         sC.grabStocks();
         console.log("refrest");
        }
        counter++;
      },1000);       
    }   

    
    
    removeStock(stock) {
      return;
      let sL = this.sList;
      let cList = this.cList;
      
      sL.forEach(function(s,i){
        if(stock.ticker === s.ticker){
           sL.splice(i,1);
           cList.remove(s.ticker)
        }
      })   
    }
    

}