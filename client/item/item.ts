/// <reference path="../../typings/angular2-meteor.d.ts" />
 
import {Component, View} from 'angular2/core';
 
import {RouteParams} from 'angular2/router';

import {Stocks} from 'collections/stocks';

import {RouterLink} from 'angular2/router';

@Component({
  selector: 'item'
})

@View({
  templateUrl: '/client/item/item.html',
  directives: [RouterLink]
})

export class Item {
    stocks: Mongo.Cursor<Object>;
    constructor() {
        this.stock = Stocks.find();
    }
    saveStock(stock) {

    }    
}


