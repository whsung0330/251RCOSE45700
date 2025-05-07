import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

// 리사이즈 모드
export class ResizeState implements ICanvasState {
  private resizing: boolean = false;
  constructor(
    private viewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel,
    pos: string, // "top-left", "top-right", "bottom-right", "bottom-left"
    offsetX: number,
    offsetY: number
  ) {
    this.resizing = true;

    document.addEventListener("mouseup", this.handleMouseUpBound);
    this.selectedShapeModel.startResizeSelectedShapes(offsetX, offsetY, pos);
  }

  private handleMouseUpBound = this.handleMouseUp.bind(this);
  handleMouseDown(event: React.MouseEvent): void {
    this.resizing = false;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.resizing) return;
    const { offsetX, offsetY } = event.nativeEvent;

    this.selectedShapeModel.resizeSelectedShapes(offsetX, offsetY);
  }

  handleMouseUp(): void {
    this.resizing = false;
    document.removeEventListener("mouseup", this.handleMouseUpBound);
    this.viewModel.setState(
      new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
    ); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}
