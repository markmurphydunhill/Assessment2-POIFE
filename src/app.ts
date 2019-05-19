import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([


      {
        route: ['','islands'],
        name: 'Island',
        moduleId: PLATFORM.moduleName('views/islands'),
        nav: true,
        title: 'Islands'
      },
      {
        route: 'regions',
        name: 'Region',
        moduleId: PLATFORM.moduleName('views/region'),
        nav: true,
        title: 'Region'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
