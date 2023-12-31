import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  private apiURL = 'http://127.0.0.1:8000/api';
  private apiKey = 'AIzaSyDbpBfS0Rcu1xJqPHgsUPAek-aJxYOU40g';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login/`, { email, password })
      .pipe(retry(3));
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiURL}/usuarios/`, userDetails)
      .pipe(retry(3));
  }

  crearViaje(viajeData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/viajes/`, viajeData)
    
  }

  listarViajes(pasajeroId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/viajes/?pasajero=${pasajeroId}`);
  }

  obtenerDatos(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/usuarios/${userId}/`);
  }

  agregarPasajero(pasajeroId: number, viajeId: number): Observable<any> {
    return this.http.put(`${this.apiURL}/viajes/${viajeId}/agregar_pasajero/`, { pasajero_nuevo: pasajeroId })
      .pipe(retry(2));
  }
}





