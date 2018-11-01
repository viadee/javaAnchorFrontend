import {BackendApiService} from './backend-api.service';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClusterApiService {

  constructor(private http: HttpClient) {
  }

  tryConnect(connectionName: string): Observable<any> {
    return this.http.get(
      `${BackendApiService.getBackendUrl()}/${encodeURIComponent(connectionName)}/try_connect`,
      BackendApiService.getHttpOptions()
    )
      .pipe(
        tap(try_connect => console.log('tryConnect: ' + try_connect)),
        catchError(BackendApiService.handleError('tryConnect', []))
      );
  }

  getConnectionNames(): Observable<Array<string>> {
    return this.http.get<string[]>(
      `${BackendApiService.getBackendUrl()}`,
      BackendApiService.getHttpOptions()
    )
  }

}
