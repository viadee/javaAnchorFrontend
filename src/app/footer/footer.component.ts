import {Component, OnInit} from '@angular/core';
import {ClusterApiService} from '../_service/cluster-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version;

  constructor(private _clusterApi: ClusterApiService) {
  }

  ngOnInit() {
    this.loadVersion();
  }

  loadVersion() {
    this._clusterApi.getVersion().subscribe((version => {
      this.version = version.slice(1, version.length - 1);
    }), (err) => {
      console.log('error while loading version from backend: ' + err.message);
      this.version = 'N.A.';
    });
  }

}
