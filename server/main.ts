import {loadStocks} from './load_stocks';
 
Meteor.startup(loadStocks);
