import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

export class DrawState implements ICanvasState {
  private shapeType = "rectangle"; // default shape type
  private drawing = false;
  constructor(
    private viewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel,
    shapeType: string
  ) {
    this.shapeType = shapeType;
  }

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    this.shapeModel.startDrawShape(this.shapeType, offsetX, offsetY);

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!this.drawing) return;

    this.shapeModel.continueDrawShape(offsetX, offsetY);
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    this.shapeModel.endDrawShape();
    this.selectedShapeModel.continueSelectShapes(
      this.shapeModel.getShapes().slice(-1)
    );
    this.viewModel.setState(
      new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
    ); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}
