/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgZone, provide} from 'angular2/core';

import {NgFor} from 'angular2/common';

import {bootstrap} from 'angular2-meteor';

import {Stocks} from 'collections/stocks';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';
 
import {StockList} from 'client/stock-list/stock-list';
  
import {StockDetails} from 'client/stock-details/stock-details';

import {TickerService} from 'client/services/ticker.service';

import {HeatService} from 'client/services/heat.service';

@Component({
  selector: 'app'
})

@View({
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', as: 'StockList', component: StockList },
    { path: '/stock/:stockId', as: 'StockDetails', component: StockDetails }
])

class Socially {}

bootstrap(Socially, [ROUTER_PROVIDERS, TickerService, HeatService, provide(APP_BASE_HREF, { useValue: '/' })]);
