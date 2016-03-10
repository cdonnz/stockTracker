///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';

//import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
//import {URLSearchParams, Jsonp} from 'angular2/http';

import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/components/stock-form/stocks-form'; 
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {StockModel} from 'client/services/stock-model';
import {StockShares} from 'client/components/stock-list/stock-shares';


@Component({
    selector: 'stock-list'
})
   
@View({
    templateUrl: '/client/components/stock-list/stock-list.html',
    directives: [NgFor, StocksForm, StockShares, RouterLink]
})

export class StockList {
    sList = [];
    isReady = false;
    constructor() {
      console.log(HTTP,"http",HTTP.Jsonp)
       this.cList = new CookieList();
       this.grabStocks();
      /*setInterval(() => {
        console.log("refresh")
        this.grabStocks();
      // zone.js tells Angular 2 to trigger Change Detection
      }, 1000);*/
    }   

    grabStocks(){
      let cList = this.cList
      let cListArr = cList.stockListGrab();
      let cListString = cListArr.join(',');
 
      for(var i = 0; i < cListArr.length; i++){
        this.sList.push(new StockModel(cListArr[i]));
      }  

      window.cb = (data,fn) => {
        let temp = [];
 
        fn = function(s){
          let symbol:string = s.ticker.toLowerCase();
          let percentChange = parseFloat(s.percentChange);
          let netChange = parseFloat(s.netChange);
          //let rgb = new RGB();
          //let rgbColor = rgb.getPerfColor(perChange);

          temp.push(new StockModel(symbol,s.current,percentChange,netChange,s.description));    
        }
        
        let d = data.quote; 
        if (Object.prototype.toString.call(d) === '[object Array]')  {
          d.forEach(function(s){
            fn(s);      
          });
        }else{
          fn(d); 
        } 
        this.sList = temp;
        this.isReady = true;
      }    
      
      let script = document.createElement('script');
      script.src  = `http://www.foxbusiness.com/ajax/quote/${cListString}?callback=cb`;
      document.getElementsByTagName('head')[0].appendChild(script);    
    };
    
    
    showStocks(){
      
      console.log("showStocks",this.sList);
      //this.sService.grabData();
      //console.log(this.sService.showStocks(),".....")
  
      /*let sService = new StockService();
      console.log(sService.showStocks(),'??');*/
    }

    
    removeStock(stock) {
      var sL = this.sList;
      let cList = this.cList;
      this.sList.forEach(function(s,i){
        if(stock.ticker === s.ticker){
           sL.splice(i,1);
           cList.remove(s.ticker)
        }
      })   
    }
    

}