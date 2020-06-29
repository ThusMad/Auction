import {Deserializable} from './deserializable.model';
import { Url } from 'url';
import { Moment } from 'moment';
import { User } from './user.model';
import { Category } from './category.model';

enum AuctionType{
  Fast, 
  Normal
}

export class AuctionItem implements Deserializable {
  public id: string;
  public title: string;
  public description: string;
  public startPrice : number;
  public priceStep : number;
  public creationTime: number;
  public startTime: number;
  public endTime: number;
  public type: AuctionType;
  public images: string[];
  public categories: Category[];
  public creator: User;

  constructor(
    title : string, 
    description : string,
    priceStep : number,
    startPrice : number,
    startTime : Moment, 
    endTime : Moment,
    categories: Category[],
    type : string) 
  {
    this.title = title;
    this.description = description;
    this.startPrice = startPrice;
    this.priceStep = priceStep;
    this.startTime = startTime.valueOf();
    this.endTime = endTime.valueOf();
    this.type = AuctionType[type];
    this.categories = categories;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}