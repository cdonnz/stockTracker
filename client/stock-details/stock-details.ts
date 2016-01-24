/// <reference path="../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {RouteParams} from 'angular2/router';

import {Stocks} from 'collections/stocks';

import {FORM_DIRECTIVES} from 'angular2/common';

import {RouterLink} from 'angular2/router';

@Component({
  selector: 'stock-details'
})

@View({
  templateUrl: '/client/stock-details/stock-details.html',
  directives: [RouterLink, FORM_DIRECTIVES]
})

export class StockDetails {
    stock: Object;
    constructor(params: RouteParams) {
      var stockId = params.get('stockId');
      this.stock = Stocks.findOne(stockId);
    }
    saveStock(stock) {
      Stocks.update(stock._id, {
        $set: {
          name: stock.name,
          netChange: stock.netChange,
          percentChange: stock.percentChange
        }
      });
    }    
}


