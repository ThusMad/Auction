import { AuctionItem } from './auctionItem.model';
import { User } from './user.model';

export class Bid {
    id: string;
    auctionId: string;
    userId: string;
    time: number;
    price: number;
}