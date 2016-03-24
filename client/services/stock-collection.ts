///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';

//import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
//import {Jsonp} from 'angular2/http';
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {StockModel} from 'client/services/stock-model';

declare var window: any;

@Component({
    selector: 'stock-list'
})
   
@View({
    templateUrl: '/client/components/stock-list/stock-list.html',
    directives: [NgFor, RouterLink]
})

export class StockCollection {
  sList = [];

  constructor() {
      //console.log(HTTP,"http",HTTP.Jsonp)
      this.cList = new CookieList();
      this.grabStocks();
     // let counter = 0;
      /*setInterval(() => {
        if(counter%10===0){
         // this.grabStocks();
         console.log("refresh");
        }
        counter++;
      },1000); */      
    }   

    grabStocks(){
      let cList = this.cList
      let cListArr = cList.stockListGrab();
      let tempList = [];

      cListArr.forEach(function(j){
        if(j.indexOf(':')> -1){
          let jSplit = j.split(':');
          tempList.push(jSplit[0]);
        }else{
          tempList.push(j);
        }
      })

      let cListString = tempList.join(',');

      window.cb = (data) => {

        let temp = [];
 
        let fn = function(s){
          let symbol:string = s.ticker.toLowerCase();
          let percentChange = parseFloat(s.percentChange);
          let netChange = parseFloat(s.netChange);
          let current = parseFloat(s.current);
          let stockShares = 0;
          //let rgb = new RGB();
 console.log(percentChange,"LL")
         // let rgbColor = rgb.getPerfColor(perChange);
          cListArr.forEach(function(t){
            if(t.indexOf(symbol) > -1 && t.indexOf(':') ){
              stockShares = parseInt(t.split(':')[1]);
            }
          })
          
          temp.push(new StockModel(symbol,stockShares,current,percentChange,netChange,s.description));    
        }
        
        let d = data.quote; 
        if (Object.prototype.toString.call(d) === '[object Array]')  {
          d.forEach(function(s){
            fn(s);      
          });
        }else{
          fn(d); 
        } 
 console.log("grab now")
        this.sList = temp;
      }    
      
      let script = document.createElement('script');
      script.src  = `http://www.foxbusiness.com/ajax/quote/${cListString}?callback=cb`;
      document.getElementsByTagName('head')[0].appendChild(script);    
    };
    
    removeStock(stock) {
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