import {BackendApiService} from './backend-api.service';
import {Observable} from 'rxjs';
import {Model} from '../_models/Model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelApiService {

  constructor(private http: HttpClient) {
  }

  getModels(connectionName: string): Observable<Model[]> {
    return this.http.get<Model[]>(
      `${BackendApiService.getBackendUrl(connectionName)}/models`,
      BackendApiService.getHttpOptions()
    );
  }

}
