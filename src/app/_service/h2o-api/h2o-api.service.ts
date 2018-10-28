import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Model} from '../../_models/Model';
import {DataFrame} from '../../_models/DataFrame';
import {FrameSummary} from '../../_models/FrameSummary';
import {CaseSelectCondition} from '../../_models/CaseSelectCondition';
import {Rule} from '../../_models/Rule';
import {CaseSelectConditionResponse} from '../../_models/CaseSelectConditionResponse';


@Injectable({
  providedIn: 'root'
})
export class H2oApiService {
  // TODO make api url configurable
  API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  tryConnect(h2oInstance: string) {
    return this.http.get(
      `${this.API_URL}/${encodeURIComponent(h2oInstance)}/try_connect`,
      this.getHttpOptions()
    )
      .pipe(
        tap(try_connect => console.log('tryConnect: ' + try_connect)),
        catchError(this.handleError('tryConnect', []))
      );
  }

  getModels(h2oInstance: string): Observable<Model[]> {
    return this.http.get<Model[]>(
      `${this.API_URL}/${h2oInstance}/models`,
      this.getHttpOptions()
    );
  }

  getDataFrames(h2oInstance: string): Observable<DataFrame[]> {
    return this.http.get<DataFrame[]>(
      `${this.API_URL}/${h2oInstance}/frames`,
      this.getHttpOptions()
    );
  }

  getDataFrame(h2oInstance: string, frame_id: string): Observable<FrameSummary> {
    return this.http.get<FrameSummary>(
      `${this.API_URL}/${h2oInstance}/frames/${frame_id}`,
      this.getHttpOptions()
    );
  }

  getRandomRule(h2oInstance: string, model_id: string, frame_id: string, conditions: CaseSelectConditionResponse): Observable<Rule> {
    return this.http.post<Rule>(
      `${this.API_URL}/${h2oInstance}/rule/${model_id}/${frame_id}`,
      conditions,
      this.getHttpOptions()
    );
  }

  getCaseSelectConditions(h2oInstance: string, model_id: string, frame_id: string): Observable<CaseSelectConditionResponse> {
    return this.http.get<CaseSelectConditionResponse>(
      `${this.API_URL}/${h2oInstance}/frames/${frame_id}/conditions`,
      this.getHttpOptions()
    );
  }

  private getHttpOptions() {
    return {
      withCredentials: true,
      headers: new HttpHeaders({}),
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
