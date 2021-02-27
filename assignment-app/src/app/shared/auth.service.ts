import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

 
  constructor (private http: HttpClient){}

  connecte(data): Observable<any>{
    return this.http.post('http://localhost:3000/api/auth/connexion',data);
  }

}
