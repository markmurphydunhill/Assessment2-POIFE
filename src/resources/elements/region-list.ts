import { bindable } from 'aurelia-framework';
import { Region } from '../../services/donation-types';

export class RegionList {
  @bindable
  regions: Region[];
}
