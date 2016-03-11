///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';

import {CookieList} from 'client/helpers/cookieList'; 

import {TickerService} from 'client/services/ticker.service';

@Component({
    selector: 'stocks-form'
})

@View({
    templateUrl: '/client/components/stock-form/stocks-form.html'
})

export class StocksForm {
    stocksForm: ControlGroup;
    
    constructor(public tickers: TickerService) {
        var fb = new FormBuilder();
        this.stocksForm = fb.group({
            name: ['']
        });
    }
    addStock(stock) {
        if(stock.name === ''){return;}
        console.log("entered",stock)
        var cList = new CookieList;
        cList.insert(stock.name);
        return; 
        this.tickers.getStockData();
    }    
}