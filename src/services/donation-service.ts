import {inject, Aurelia} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { User, Island, RawIsland, Region} from './donation-types';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  regions : Region[] = [];
  islands : Island[] = [];

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('https://rocky-fjord-61678.herokuapp.com');
    });

    this.getUsers();
    this.getRegions();
    this.getIslands();

  }

  async getIslands() {
    const response = await this.httpClient.get('/api/islands');
    const rawIslands: RawIsland[] = await response.content;
    rawIslands.forEach(rawIsland => {
      const island = {
        name: rawIsland.name,
        lat: rawIsland.lat,
        long: rawIsland.long,
        description: rawIsland.description,
        costalZone: rawIsland.costalZone,
        _id: rawIsland._id,
        region: this.regions.find(region => rawIsland.region == region._id),
        creator: this.usersById.get(rawIsland.creator)
      };
      this.islands.push(island);

    });
    console.log(this.islands);

  }

  async getRegions(){
    const response = await this.httpClient.get('/api/regions');
    this.regions = await response.content;
    console.log(this.regions);
  }




  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    console.log(response);

    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);

    });
    console.log(this.users);
  }


  async addIsland(name: string,  long: number, lat: number, description: string,
                  costalZone: string, region: Region /*user: User*/){
    const island ={
      name: name,
      lat: lat,
      long: long,
      description: description,
      costalZone: costalZone,
      region: region._id,
      //creator: user
    };
    const response = await this.httpClient.post('/api/createisland', island);
    const newIsland = await response.content;
    //this.users.set(newUser.email, newUser);
    //this.usersById.set(newUser._id, newUser);
    this.islands.push(newIsland);
    //console.log(this.Region);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async addRegion (title: string, lat: number, long: number){
    const region = {
      title: title,
      geo:{lat: lat,
        long: long
           }
    };
    console.log (region);
    const response = await this.httpClient.post('/api/createregion', region);
    const newRegion = await response.content;
    console.log(newRegion);
    //this.users.set(newUser.email, newUser);
    //this.usersById.set(newUser._id, newUser);
    this.regions.push(newRegion);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }




  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/createuser', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && user.password === password) {
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'))
  }

  changeRouter(module: string) {
    this.router.navigate('/', {replace: true, trigger: false});
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
