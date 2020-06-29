import { AuctionItem } from './auctionItem.model';
import { User } from './user.model';

export class Bid {
    id: string;
    auction: AuctionItem;
    user: User;
    time: number;
    amount: number;
}