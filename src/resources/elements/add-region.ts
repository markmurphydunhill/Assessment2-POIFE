import {inject} from 'aurelia-framework'
import {bindable} from 'aurelia-framework'
import { Region } from '../../services/donation-types';
import {DonationService} from "../../services/donation-service";

@inject(DonationService)
export class AddRegion {
  title: string;
  lat: number;
  long: number;

  @bindable
  regions: Region[];

  constructor(private ds: DonationService){}

  makeRegion(){
    this.ds.addRegion(this.title, this.lat, this.long);
  }
}
