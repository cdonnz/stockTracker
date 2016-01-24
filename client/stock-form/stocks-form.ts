/// <reference path="../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';

import {CookieList} from 'client/helpers/cookieList'; 

import {Tickers} from 'client/helpers/tickers';

@Component({
    selector: 'stocks-form'
})

@View({
    templateUrl: '/client/stock-form/stocks-form.html'
})

export class StocksForm {
    stocksForm: ControlGroup;
 
    constructor() {
        var fb = new FormBuilder();
        this.stocksForm = fb.group({
            name: ['']
        });
    }
    addStock(stock) {
        var cList = new CookieList;
        cList.insert(stock.name)

        let tickers = new Tickers();
        tickers.getStockData();
    }    
}