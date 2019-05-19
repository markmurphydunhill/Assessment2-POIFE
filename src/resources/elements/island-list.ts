import { bindable } from 'aurelia-framework';
import { Island } from '../../services/donation-types';

export class IslandList {
  @bindable
  islands: Island[];
}
