import { inject } from 'aurelia-framework';
import{Region, Island} from '../services/donation-types';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Regions {
 // islands: Island [] = [];
  regions: Region[];
  //users: User[];

  constructor(private ds: DonationService) {
    this.regions = ds.regions;
    //this.islands = ds.islands;
    //   this.users = ds.users;
  }
}
