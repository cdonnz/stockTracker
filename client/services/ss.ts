import {StockListModel} from 'client/services/stock-list-model';

declare var window: any;

export class StockService {
  constructor(){
    //this.stockList = new StockListModel();
    this.stockList = ["start"];
  }
  
  initData(){
    this.stockList = ["initData"];
    console.log("initData",this.stockList)
  }
  
  
  grabData(cList){
    console.log("grabData",this.stockList);
    return this.stockList;
    //this.stockList.grabStocks(cList);
  }
  
  showStocks(){console.log("inside show stock")
    return this.stockList.process();
  }
  
  /*stocks = ['start'];
  
  registerStocks(cList){

      for(var i = 0; i < cList.length; i++){
        var n = new StockModel(cList[i]);
        this.stocks.push(n);
      }
  }
  
  showStocks(){
    return this.stocks;
  }
  
  getTickerList():any{
    var stocksArr:any = [];
    this.stocks.forEach(function(sObj){
      stocksArr.push(sObj.ticker);  
    });
    return stocksArr;
  }

  fbCall(sList:string):void{
    let script = document.createElement('script');
    script.src  = `http://www.foxbusiness.com/ajax/quote/${sList}?callback=cb`;
    document.getElementsByTagName('head')[0].appendChild(script);     
  }

  grabData(cList):void{
    let tempStocks = [];
    
    let insertData = function(data){
      let d = data.quote; 
      function insert(s){
        
        let symbol:string = s.ticker.toLowerCase();
        //let rgb = new RGB();
        //let rgbColor = rgb.getPerfColor(perChange);

        let item = {
          current : s.current,
          percentChange : parseFloat(s.percentChange),
          netChange : parseFloat(s.netChange),
          description : s.description,
          color : '',
          RGB: ''
        }
        
        var nS = new StockModel(item);
        nS.placeData(item)
        tempStocks.push(nS);
      }

      if (Object.prototype.toString.call(d) === '[object Array]')  {
        d.forEach(function(s){
            insert(s);      
        });
      }else{
        insert(d); 
      }    
      return tempStocks;
    }

     let stockRef = this.stocks;
     
     
     
    window.cb = (data) => {
      this.process(data)
    }
 
    this.fbCall(cList.join(','));
  }
  
  process(d){
      console.log('stocksRef1',this.stocks)
      this.stocks = ['asdf','asdfadf'];
      console.log('stocksRef2',this.stocks)
        
  }
 */
}