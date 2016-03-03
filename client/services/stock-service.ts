import {Injectable} from "angular2/core";
import {StockModel} from 'client/services/stock-model';


@Injectable()

export class StockService {
  
  constructor(){}
  stocks = [];
  
  registerStocks(cList){

      for(var i = 0; i < cList.length; i++){
        var n = new StockModel(cList[i]);
        this.stocks.push(n);
      }
  }
  getTickerList(){
    var stocksArr = [];
    this.stocks.forEach(function(sObj){
      stocksArr.push(sObj.ticker);  
    });
    return stocksArr;
  }
  
  getData(){
    
     
      window.cb = (data) => {
        let d = data.quote; 
          console.log("data",data)
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
      var tickerArr = this.getTickerList();
      console.log(tickerArr,"<---")
      tickerArr = tickerArr.join(',')
      this.getTickerList();
      let script = document.createElement('script');
      script.src  = `http://www.foxbusiness.com/ajax/quote/${tickerArr}?callback=cb`;
      document.getElementsByTagName('head')[0].appendChild(script);          
    
    for(var j = 0; j < this.stocks.length; j++){
      console.log("print s name:", this.stocks[j].ticker)
      
    }
    
  }   
}