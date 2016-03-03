/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgZone, provide} from 'angular2/core';

import {NgFor} from 'angular2/common';

import {bootstrap} from 'angular2-meteor';

import {Stocks} from 'collections/stocks';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';
 
import {PageLayout} from 'client/components/page-layout/page-layout';
  
import {StockDetails} from 'client/components/stock-details/stock-details';

import {TickerService} from 'client/services/ticker.service';

@Component({
  selector: 'app'
})

@View({
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', as: 'PageLayout', component: PageLayout},
    { path: '/stock/:stockId', as: 'StockDetails', component: StockDetails }
])

class Socially {}

bootstrap(Socially, [ROUTER_PROVIDERS, TickerService, provide(APP_BASE_HREF, { useValue: '/' })]);
