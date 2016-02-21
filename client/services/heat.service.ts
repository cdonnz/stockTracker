import {Injectable} from "angular2/core";
@Injectable()

export class HeatService {
  private sArr:string[];
  constructor() {}
  getPerfColor(val: string): string {console.log(val)
    var val = parseInt(val), n = 100, r = 233, g = 250, b = 232, pos = {r2 : 71, g2 : 226, b2 : 64},
    neg = {r2 : 207, g2 : 11, b2 : 28}, cObj = {}, p = parseInt, pos;
    val = Math.abs(val) > 40 ? 40 : val;
    cObj = (p(val) > 0)? pos : neg;

    pos = p((Math.round((Math.abs(val)/7)*100)).toFixed(0));
    red = p((r + (( pos * (cObj.r2 - r)) / (n-1))).toFixed(0));
    green = p((g + (( pos * (cObj.g2 - g)) / (n-1))).toFixed(0));
    blue = p((b + (( pos * (cObj.b2 - b)) / (n-1))).toFixed(0));

    return 'rgb('+red+','+green+','+blue+')';
  }  
}    
