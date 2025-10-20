import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  public static gameVersion: string = 'v1.0-beta.4';

  constructor() { }

}
