import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Model} from '../../_models/Model';
import {DataFrame} from '../../_models/DataFrame';


export interface Models {
  models: Model[];
}

export interface DataFrames {
  frames: DataFrame[];
}


@Injectable({
  providedIn: 'root'
})
export class H2oApiService {
  API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  tryConnect(h2oInstance: string) {
    return this.http.get(`${this.API_URL}/try_connect`, this.getHttpOptions(h2oInstance))
      .pipe(
        tap(try_connect => console.log('tryConnect: ' + try_connect)),
        catchError(this.handleError('tryConnect', []))
      );
  }

  getModels(h2oInstance: string): Observable<any> {
    return this.http.get(`${this.API_URL}/models`, this.getHttpOptions(h2oInstance));
  }

  getDataFrames(h2oInstance: string): Observable<any> {
    return this.http.get(`${this.API_URL}/frames`, this.getHttpOptions(h2oInstance));
  }

  getDataFrame(h2oInstance: string, frame_id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/frames/` + frame_id, this.getHttpOptions(h2oInstance));
  }

  private getHttpOptions(h2oInstance: string) {
    return {
      headers: new HttpHeaders({
        'h2o_instance': h2oInstance
      })
    };
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: String) {
    console.log(message);
  }

}
