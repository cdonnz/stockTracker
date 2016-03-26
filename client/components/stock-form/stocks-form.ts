///<reference path="../../../typings/angular2-meteor.d.ts" />
 
import {Component, View, Input} from 'angular2/core';
 
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';
 
import {Stocks} from 'collections/stocks';

import {CookieList} from 'client/helpers/cookieList'; 

import {TickerService} from 'client/services/ticker.service';

import {CookieService} from 'client/services/cookie-service';
import {StockService} from 'client/services/stock-service';

@Component({
    selector: 'stocks-form'
})

@View({
    templateUrl: '/client/components/stock-form/stocks-form.html'
})

export class StocksForm {
    @Input() flag;
    stocksForm: ControlGroup;
    
    constructor(public stockService:StockService) {
      var fb = new FormBuilder();
      this.stocksForm = fb.group({
          name: ['']
      });
    }
    addStock(stock) {
      this.stockService.insertStock(stock);
    }    
}