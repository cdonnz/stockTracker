///<reference path="../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {NgFor} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';
 
import {StocksForm} from 'client/stock-form/stocks-form'; 

import {Item} from 'client/item/item'; 
 
import {RouterLink} from 'angular2/router';

import {CookieList} from 'client/helpers/cookieList'; 

import {Tickers} from 'client/helpers/tickers';

import {TodoService} from 'client/helpers/todo.service';

@Component({
    selector: 'stock-list'
})

@View({
    templateUrl: '/client/stock-list/stock-list.html',
    directives: [NgFor, StocksForm, Item, RouterLink]
})
export class StockList {
    stocks: {};
    foo = [];
    constructor(public todoService: TodoService) {
        let tickers = new Tickers();
        tickers.getStockData();
        this.stocks = Stocks.find();
        console.log(todoService);
    }
 
    removeStock(stock) {
        Stocks.remove(stock._id);
        this.todoService.todos.push(stock._id);
        var cList = new CookieList();
        cList.remove(stock.name)
         console.log(this.todoService.todos);
    }

}