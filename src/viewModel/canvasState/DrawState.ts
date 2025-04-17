import { Shape } from "../../entity/Shape";
import { ShapeFactory } from "../../entity/ShapeFactory";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private color = "black";
  private drawingShape: Shape | null = null;
  private drawing = false;
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.drawing) return;

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(
      this.viewModel.getShapeType(),
      {
        id: this.viewModel.countShapes(),
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY,
        color: this.color,
      }
    );
  }

  handleMouseUp(): void {
    if (!this.drawing) return;
    this.drawing = false;
    if (this.drawingShape) {
      this.viewModel.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
    }
  }

  getCurrentShapes(): Shape[] {
    if (this.drawing) {
      return this.drawingShape
        ? [...this.viewModel.getSavedShapes(), this.drawingShape]
        : this.viewModel.getSavedShapes();
    }
    return this.viewModel.getSavedShapes();
  }
}
