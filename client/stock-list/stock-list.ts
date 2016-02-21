///<reference path="../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/stock-form/stocks-form'; 

import {Item} from 'client/item/item'; 
 
import {Donut} from 'client/donut/donut'; 
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {TickerService} from 'client/services/ticker.service';


@Component({
    selector: 'stock-list'
})
   
@View({
    templateUrl: '/client/stock-list/stock-list.html',
    directives: [NgFor, StocksForm, Donut, RouterLink]
})

export class StockList {
    stocks: {};
    
    constructor(public tickers: TickerService) {
        tickers.getStockData();
        this.stocks = Stocks.find();
        
    }   
 
    removeStock(stock) {
        Stocks.remove(stock._id);
        var cList = new CookieList();
        cList.remove(stock.name)
    }

}