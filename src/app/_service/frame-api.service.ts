import {BackendApiService} from './backend-api.service';
import {Observable} from 'rxjs';
import {DataFrame} from '../_models/DataFrame';
import {FrameSummary} from '../_models/FrameSummary';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrameApiService {

  constructor(private http: HttpClient) {
  }

  getFrames(connectionName: string): Observable<DataFrame[]> {
    return this.http.get<DataFrame[]>(
      `${BackendApiService.getBackendUrl()}/${connectionName}/frames`,
      BackendApiService.getHttpOptions()
    );
  }

  getFrameSummary(connectionName: string, frame_id: string): Observable<FrameSummary> {
    return this.http.get<FrameSummary>(
      `${BackendApiService.getBackendUrl()}/${connectionName}/frames/${frame_id}/summary`,
      BackendApiService.getHttpOptions()
    );
  }

}
