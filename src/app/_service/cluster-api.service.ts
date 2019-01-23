import {BackendApiService} from './backend-api.service';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConnectionNameListResponse} from '../_models/ConnectionNameListResponse';

@Injectable({
  providedIn: 'root'
})
export class ClusterApiService {

  constructor(private http: HttpClient) {
  }

  tryConnect(connectionName: string): Observable<any> {
    return this.http.get(
      `${BackendApiService.getBackendUrl(connectionName)}/try_connect`,
      BackendApiService.getHttpOptions()
    )
      .pipe(
        tap(try_connect => console.log('tryConnect: ' + try_connect)),
        catchError(BackendApiService.handleError('tryConnect', []))
      );
  }

  getConnectionNames(): Observable<ConnectionNameListResponse> {
    return this.http.get<ConnectionNameListResponse>(
      `${BackendApiService.getBackendUrlClean()}`,
      BackendApiService.getHttpOptions()
    );
  }

}
