import { Shape } from "../../entity/Shape";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { MoveState } from "./MoveState";

// 선택 모드
export class SelectState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private selecting = false;
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.checkShapeClick(offsetX, offsetY)) return; // 선택한 위치에 도형이 있다면 MoveState로 전환

    this.viewModel.clearSelectedShapes();
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.selecting) return;

    this.endX = offsetX;
    this.endY = offsetY;

    this.viewModel.clearSelectedShapes();
    this.selectShapes(this.startX, this.startY, this.endX, this.endY);
  }

  handleMouseUp(): void {
    this.selecting = false;
    console.log(this.viewModel.getSelectedShapes());
  }

  selectShapes(startX: number, startY: number, endX: number, endY: number) {
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    this.viewModel.getSavedShapes().forEach((shape) => {
      const shapeMinX = Math.min(shape.startX, shape.endX);
      const shapeMaxX = Math.max(shape.startX, shape.endX);
      const shapeMinY = Math.min(shape.startY, shape.endY);
      const shapeMaxY = Math.max(shape.startY, shape.endY);

      if (
        !(shapeMaxX < minX || maxX < shapeMinX) &&
        !(shapeMaxY < minY || maxY < shapeMinY)
      ) {
        this.viewModel.addSelectedShapes(shape);
      }
    });
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }

  checkShapeClick(offsetX: number, offsetY: number): boolean {
    const selectedShapes = this.viewModel.getSelectedShapes();
    for (let i = 0; i < selectedShapes.length; i++) {
      const shape = selectedShapes[i];
      if (shape.isPointInside(offsetX, offsetY)) {
        this.viewModel.setState(
          new MoveState(this.viewModel, offsetX, offsetY)
        );
        return true;
      }
    }

    this.viewModel.clearSelectedShapes();
    const shapes = this.viewModel.getSavedShapes();
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.isPointInside(offsetX, offsetY)) {
        this.viewModel.addSelectedShapes(shape); // 클릭한 도형을 선택
        this.viewModel.setState(
          new MoveState(this.viewModel, offsetX, offsetY)
        );
        return true;
      }
    }

    return false;
  }
}
