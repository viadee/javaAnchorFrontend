import {Injectable} from "@angular/core";
import {FrameSummary} from '../_models/FrameSummary';
import {Anchor} from '../_models/Anchor';


@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesComponent {

  private frameSummary: FrameSummary = null;

  private anchors: Anchor[] = null;

  public getFrameSummary(): FrameSummary {
    return this.frameSummary;
  }

  public setFrameSummary(frameSummary: FrameSummary): void {
    this.frameSummary = frameSummary;
  }

  public getAnchors(): Anchor[] {
    return this.anchors;
  }

  public setAnchors(anchors): void {
    this.anchors = anchors;
  }

  public addAnchor(anchor: Anchor): void {
    if (this.anchors == null) {
      this.anchors = [];
    }

    this.anchors.push(anchor)
  }

}
