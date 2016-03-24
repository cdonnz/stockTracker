///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/components/stock-form/stocks-form'; 
 
import {Donut} from 'client/components/donut/donut'; 
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {TickerService} from 'client/services/ticker.service';

import {StockList} from 'client/components/stock-list/stock-list';


@Component({
    selector: 'page-layout'
})
   
@View({
    templateUrl: '/client/components/page-layout/page-layout.html',
    directives: [NgFor, StockList, StocksForm, Donut, RouterLink]
})

export class PageLayout {
  dataset: Array<Object> = [ 
    { key: 0, value: 5 },
    { key: 1, value: 10 }
  ];
  constructor(){}
  

}