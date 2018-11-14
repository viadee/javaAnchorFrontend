import {BackendApiService} from './backend-api.service';
import {CaseSelectConditionRequest} from '../_models/CaseSelectConditionRequest';
import {Observable} from 'rxjs';
import {Anchor} from '../_models/Anchor';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnchorApiService {

  constructor(private http: HttpClient) {
  }

  getRandomAnchor(connectionName: string, model_id: string, frame_id: string, conditions: CaseSelectConditionRequest): Observable<Anchor> {
    return this.http.post<Anchor>(
      `${BackendApiService.getBackendUrl()}/${connectionName}/anchors`,
      conditions,
      BackendApiService.getHttpOptions({'Model-Id': model_id, 'Frame-Id': frame_id})
    );
  }

}
