import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FrameApiService} from '../_service/frame-api.service';
import {FrameColumnApiService} from '../_service/frame-column-api.service';
import {AnchorApiService} from '../_service/anchor-api.service';
import {GlobalVariablesComponent} from '../_helpers/global-variables.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {Anchor} from '../_models/Anchor';

@Component({
  selector: 'app-global-model-explanation-tabular',
  templateUrl: './global-model-explanation-tabular.component.html',
  styleUrls: ['./global-model-explanation-tabular.component.scss']
})
export class GlobalModelExplanationTabularComponent implements OnInit {

  anchors: Anchor[];

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _frameApi: FrameApiService,
              private _frameColumnApi: FrameColumnApiService,
              private _anchorApi: AnchorApiService,
              private _globals: GlobalVariablesComponent,
              private _spinner: NgxSpinnerService) {

    this._globals.checkQueryParams(route, (conn) => {
      if (conn !== null) {
        this.anchors = this._globals.getAnchors();
      } else {
        this._router.navigate(['/model-frame-overview']);
        // TODO fehler anzeigen oder auf die andere Seite zurückschicken
      }
    });
  }

  ngOnInit() {
  }

}
