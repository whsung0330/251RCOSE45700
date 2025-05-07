import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

// 이동 모드
export class MoveState implements ICanvasState {
  private moving = false;

  constructor(
    private viewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel,
    offsetX: number,
    offsetY: number
  ) {
    this.selectedShapeModel.startMoveSelectedShapes(offsetX, offsetY);
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    //? required?

    this.moving = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.moving) return;
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.selectedShapeModel.getSelectedShapes().length === 0) return;
    this.selectedShapeModel.moveSelectedShapes(offsetX, offsetY);
  }

  handleMouseUp(): void {
    this.moving = false;
    this.viewModel.setState(
      new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
    ); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}
