import {Stocks} from 'collections/stocks';
import {CookieList} from 'client/helpers/cookieList'; 

export class Tickers {
  private sArr:string[];
  constructor() {
      this.sArr = [];
  }   
  
  getStockData(){

      var cList = new CookieList();
      var tickerArr = cList.stockListGrab().join(',');
      console.log(tickerArr,"cookieArr")
        
      window.cb = (data) => {
        let d = data.quote; 

        function insert(s){
            
           let { 
                ticker: symbol,
                current: val,
                percentChange: perChange,
                netChange: netChange,
                description: desc
            } = s;
            
            symbol = symbol.toLowerCase();
            
            if(Stocks.findOne( {name:symbol} )){
                Stocks.update( Stocks.findOne( { name:symbol} )['_id'], { $set: { val: val}} );  
            }else{     
               Stocks.insert({
                    name: symbol,
                    val: val
               });
            }                        
        }

        if (Object.prototype.toString.call(d) === '[object Array]')  {
            d.forEach(function(s){
                insert(s);      
            });
        }else{
            insert(d); 
        }
      }
      var script = document.createElement('script');
      script.src  = `http://www.foxbusiness.com/ajax/quote/${tickerArr}?callback=cb`;
      document.getElementsByTagName('head')[0].appendChild(script);      
  }
  
  add(stock: string): void {

       window.cb = (data) => {
            console.log(data.quote,"data....");
            var s = data.quote;
            var symbol = s.ticker.toLowerCase();
            var stockValue = s.current;
 
            if(Stocks.findOne({name:symbol})){
                Stocks.update( Stocks.findOne({name:symbol})['_id'], {$set: {val: stockValue}} );  
            }else{
               Stocks.insert({
                name: symbol.toLowerCase(),
                val: stockValue
            });
            }
        }
            
        var script = document.createElement('script');
        script.src  = `http://www.foxbusiness.com/ajax/quote/${stock.name}?callback=cb`;
        document.getElementsByTagName('head')[0].appendChild(script); 

  }
 
  
  getHistoricalData(): void {
    var API_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?auth_token=UnfiQceqNU642XV_ttR1';

    HTTP.get(API_URL, {auth_token:'UnfiQceqNU642XV_ttR1'}, function(err, result) {
        console.log(result)
    });   
  }
  
  
  
}