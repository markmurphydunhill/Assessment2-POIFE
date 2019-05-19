import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';
import{Region, Island, User} from '../services/donation-types';

@inject(DonationService)
export class Islands {
  islands: Island [] = [];
  //regions: Region[];
  //users: User[];

  constructor(private ds: DonationService) {
//    this.regions = ds.regions;
    this.islands = ds.islands;
    // this.users = ds.users;
  }
}
