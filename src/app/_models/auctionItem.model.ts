import {Deserializable} from './deserializable.model';
import { Url } from 'url';

export class AuctionItem implements Deserializable {
  public name: string;
  public auctionStartTime: Date;
  public auctionStartPrice: Number;
  public placeholder: Url;
  public description: string;

  constructor(name : string, auctionStartTime : Date, placeholder, auctionStartPrice : number, description : string) {
    this.auctionStartPrice = auctionStartPrice;
    this.name = name;
    this.auctionStartTime = auctionStartTime;
    this.placeholder = placeholder;
    this.description = description;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}