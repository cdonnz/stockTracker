import {Stocks} from 'collections/stocks';
 
export function loadStocks() {
    if (Stocks.find().count() === 0) {
 
    var stocks = [
        {
            'name': 'FB',
            'netChange': '5.32',
            'percentChange': 'Palo Alto'
        },
        {
            'name': 'GOOG',
            'netChange': 'Get it on!',
            'percentChange': 'Palo Alto'
        },
        {
            'name': 'AAPL',
            'netChange': 'Leisure suit required. And only fiercest manners.',
            'percentChange': 'San Francisco'
        }
    ];
 
    for (var i = 0; i < stocks.length; i++) {
        Stocks.insert(stocks[i]);
    }
  }
};