import {Stocks} from 'collections/stocks';
import {CookieList} from 'client/helpers/cookieList'; 
import {RGB} from 'client/helpers/RGB'; 

export class Tickers {
  private sArr:string[];
  constructor() {
      this.sArr = [];
  }   
  
  getStockData(){
  
      var cList = new CookieList();
      var tickerArr = cList.stockListGrab().join(',');
        
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
            let rgb = new RGB();
            let rgbColor = rgb.getPerfColor(perChange);

            if(Stocks.findOne( {name:symbol} )){
                Stocks.update( Stocks.findOne( { name:symbol} )['_id'], { $set: { val: val}} );  
            }else{     
               Stocks.insert({
                    name: symbol,
                    val: val,
                    rgb: rgbColor,
                    percentChange: perChange
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
      let script = document.createElement('script');
      script.src  = `http://www.foxbusiness.com/ajax/quote/${tickerArr}?callback=cb`;
      document.getElementsByTagName('head')[0].appendChild(script);      
  }
 
  getHistoricalData(): void {
    var API_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?auth_token=UnfiQceqNU642XV_ttR1';

    HTTP.get(API_URL, {auth_token:'UnfiQceqNU642XV_ttR1'}, function(err, result) {
        console.log(result)
    });   
  }
}