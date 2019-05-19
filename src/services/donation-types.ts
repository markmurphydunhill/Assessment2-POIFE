
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface Island{
  name: string;
  lat: number;
  long: number;
  description: string;
  costalZone: string;
  region: Region;
  creator: User;
  _id: string;
}

export interface RawIsland{
  name: string;
  lat: number;
  long: number;
  description: string;
  costalZone: string;
  region: string;
  creator: string;
  _id: string;
}

export interface Region{

  title: string;
  geo: {lat:number, long: number};
  _id: string;

}


