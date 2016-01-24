export class CookieList {
  private sArr:string[];
  constructor() {
      if(Cookie.get('stocksStorage')){
          this.sArr = Cookie.get('stocksStorage').split(':');
      }else{
          this.sArr = [];
      }
  }
    
  stockListGrab(): string[] {
    return Cookie.get('stocksStorage').split(':');
  }       

  stockListCheck(stock: string): boolean {
    this.sArr = Cookie.get('stocksStorage').split(':');
    return (this.sArr.indexOf(stock) > -1)? true : false;
  }
   
  isInside(stock: string): boolean {
    this.sArr = Cookie.get('stocksStorage').split(':');
    return (this.sArr.indexOf(stock) > -1)? true : false;
  } 
  
  
  insert(stock: string): void {
    if(!this.isInside(stock)){

        var temp = Cookie.get('stocksStorage').split(':');

        if(temp[0] === ''){
            this.sArr = [stock];
        }else{
            this.sArr.push(stock);
        }
        
       if(this.sArr.length === 1){
           Cookie.set('stocksStorage', this.sArr);
        }else{
           Cookie.set('stocksStorage', this.sArr.join(':'));
        }
    }
  }
 
  remove(stock: string): void {
    this.sArr = Cookie.get('stocksStorage').split(':');
    var index = this.sArr.indexOf(stock);
    if(index > -1) {
        this.sArr.splice(index, 1);
    }
    Cookie.set('stocksStorage', this.sArr.join(':'));
  }   
}