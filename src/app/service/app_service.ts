import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpClientJsonpModule  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AppService {

  API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  API_KEY = '&appid=0d7303c17ee3d3482cd82a2ad273a90d'
  URL : string = "";

  constructor(private http: HttpClient) { }

  public get(city: string): Observable<any> {
    this.URL = this.API_URL + city + this.API_KEY;;
    return this.http.get(this.URL.toString()).pipe(map(res => res));
  }
}