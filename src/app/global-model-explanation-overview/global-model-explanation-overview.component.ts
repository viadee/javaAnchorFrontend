import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {Anchor} from '../_models/Anchor';
import {AnchorApiService} from '../_service/anchor-api.service';
import {AnchorConfigDescription} from '../_models/AnchorConfigDescription';
import {SubmodularPickResult} from '../_models/SubmodularPickResult';

@Component({
  selector: 'app-global-model-explanation-overview',
  templateUrl: './global-model-explanation-overview.component.html',
  styleUrls: ['./global-model-explanation-overview.component.scss']
})
export class GlobalModelExplanationOverviewComponent implements OnInit {

  anchors: Anchor[];

  anchorConfig: Array<AnchorConfigDescription>;

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _globals: GlobalVariablesComponent,
              private _spinner: NgxSpinnerService,
              private _anchorApi: AnchorApiService) {
    this._globals.checkQueryParams(route, (conn) => {
      if (conn !== null) {
        this.anchors = this._globals.getSpAnchors().anchors;
      } else {
        this._router.navigate(['/model-frame-overview']);
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  setAnchorConfig(event) {
    this.anchorConfig = event;
  }

  runSP() {
    this._spinner.show();
    const conn = this._globals.getConnection();
    this._anchorApi.runSubmodularPick(conn.server, conn.modelId, conn.frameId, this.anchorConfig).subscribe(
      (response: SubmodularPickResult) => {
        this._spinner.hide();
        const spAnchors = response.anchors;
        if (spAnchors === null) {
          // TODO handle no spAnchors from server
          return;
        }

        this._globals.setSpAnchors(response);
        this.anchors = spAnchors;
      }, (err) => {
        console.log('failed to generate sp anchors: ' + err.message);
        this._spinner.hide();
      });
  }

  ngOnInit() {
  }

}
