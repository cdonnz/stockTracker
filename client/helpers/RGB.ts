export class RGB {
  private sArr:string[];
  constructor() {}
  getPerfColor(val: string): string {
    var valNum = parseInt(val), n = 100, r = 233, g = 250, b = 232, 
        pos:any = {r2 : 71, g2 : 226, b2 : 64},
        neg:any = {r2 : 207, g2 : 11, b2 : 28}, cObj = {r2 : null, g2 : null, b2 : null}, p = parseInt, pos;
    valNum = Math.abs(valNum) > 40 ? 40 : valNum;
    cObj = (valNum > 0)? pos : neg;

    pos = p((Math.round((Math.abs(valNum)/7)*100)).toFixed(0));
        
    var red = p((r + (( pos * (cObj.r2 - r)) / (n-1))).toFixed(0)),
        green = p((g + (( pos * (cObj.g2 - g)) / (n-1))).toFixed(0)),
        blue = p((b + (( pos * (cObj.b2 - b)) / (n-1))).toFixed(0));

    return 'rgb('+red+','+green+','+blue+')';
  }  
}    
