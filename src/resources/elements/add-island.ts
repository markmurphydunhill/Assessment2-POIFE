import {inject} from 'aurelia-framework'
import {bindable} from 'aurelia-framework'
import { Region, Island, User } from '../../services/donation-types';
import {DonationService} from '../../services/donation-service';

@inject(DonationService)
export class AddIsland {
  name: string;
  lat: number;
  long: number;
  description: string;
  costalZone: string;

  @bindable
  regions: Region[];
  selectedRegion: Region = null;


   @bindable
   users: User[];
   selectedUser: User = null;

  @bindable
   islands: Island[] = [];
   //islands: Island[];

  /* addIsland() {
     const island = {
       name: this.name,
       lat: this.lat,
       long: this.long,
       description: this.description,
       costalZone: this.costalZone,
       region: this.selectedRegion,
       user: this.selectedUser,
     };
     this.islands.push(island);
     console.log(island);
   }*/

  constructor(private ds: DonationService){}

  makeIsland(){
    this.ds.addIsland(this.name, this.lat, this.long, this.description,
      this.costalZone, this.selectedRegion /*, this.selectedUser*/)
  }
}

