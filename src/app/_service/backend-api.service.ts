import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  // TODO make api url configurable
  private static API_URL = 'http://localhost:5000';


  private constructor() {
  }

  public static getBackendUrl(connectionName: string): string {
    return `${this.API_URL}/${connectionName}`;
  }

  public static getBackendUrlClean(): string {
    return `${this.API_URL}`;
  }

  public static getHttpOptions(headers?: string | {
    [name: string]: string | string[];
  }) {
    return {
      withCredentials: true,
      headers: new HttpHeaders(headers),
    };
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public static log(message: String) {
    console.log(message);
  }

}
