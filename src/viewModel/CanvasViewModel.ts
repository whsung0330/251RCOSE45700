import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/Shape";
import { CanvasEvent } from "./CanvasEvents";
import { ZOrderAction } from "../model/CanvasModel";
import { ICanvasState } from "./canvasState/CanvasState";
import { DrawState } from "./canvasState/DrawState";
import { ResizeState } from "./canvasState/ResizeState";

export class CanvasViewModel extends Observable<any> {
  private model: CanvasModel;
  private state: ICanvasState;

  private shapeType: string = "rectangle";

  constructor(model: CanvasModel) {
    super();
    this.model = model;
    this.state = new DrawState(this); //default: 그리기 모드
  }

  setState(state: ICanvasState) {
    this.state = state;
    this.notifyStateChanged();
  }

  setShapeType(type: string) {
    this.shapeType = type;
  }

  handleMouseDown = (event: React.MouseEvent) => {
    this.state.handleMouseDown(event);
  };

  handleMouseMove = (event: React.MouseEvent) => {
    this.state.handleMouseMove(event);
    this.notifyShapesUpdated();
  };

  handleMouseUp = () => {
    this.state.handleMouseUp();
    this.notifyShapesUpdated();
  };

  resetCanvas() {
    this.clearShapes();
    this.clearSelectedShapes();
    this.setShapeType("rectangle"); // default 값으로
    this.setState(new DrawState(this));
    this.notifyShapesUpdated();
  }

  startResizing(
    handle: { x: number; y: number; pos: string },
    event: React.MouseEvent
  ): void {
    event.stopPropagation(); // 부모 요소의 이벤트가 발생하지 않도록 함
    const canvas = (
      event.currentTarget as HTMLCanvasElement
    ).getBoundingClientRect();
    if (!canvas) return;
    return this.setState(
      new ResizeState(
        this,
        handle.pos,
        canvas.left - event.nativeEvent.offsetX,
        canvas.top - event.nativeEvent.offsetY
      )
    );
  }

  getShapes() {
    return this.state.getCurrentShapes();
  }

  getShapeType() {
    return this.shapeType;
  }

  //모델 관련 메서드 -> state에서 참조함
  getSavedShapes() {
    return this.model.getShapes();
  }

  getSelectedShapes() {
    return this.model.getSelectedShapes();
  }

  countShapes() {
    return this.model.countShapes();
  }

  addShape(shape: Shape) {
    return this.model.addShape(shape);
  }

  clearShapes() {
    return this.model.clearShapes();
  }

  clearSelectedShapes() {
    return this.model.clearSelectedShapes();
  }

  addSelectedShapes(shape: Shape) {
    return this.model.addSelectedShapes(shape);
  }

  moveSelectedShapes(dx: number, dy: number) {
    return this.model.moveSelectedShapes(dx, dy);
  }

  resizeSelectedShapes(x: number, y: number, pos: string) {
    return this.model.resizeSelectedShapes(x, y, pos);
  }

  moveForward(shapeId: number) {
    console.log("forward");
    return this.model.moveZOrder(shapeId, ZOrderAction.forward); // 앞으로 이동
  }

  moveBackward(shapeId: number) {
    return this.model.moveZOrder(shapeId, ZOrderAction.backward); // 뒤로 이동
  }

  moveToFront(shapeId: number) {
    return this.model.moveZOrder(shapeId, ZOrderAction.toFront); // 맨 앞으로 이동
  }

  moveToBack(shapeId: number) {
    return this.model.moveZOrder(shapeId, ZOrderAction.toBack); // 맨 뒤로 이동
  }
  notifyShapesUpdated() {
    const event: CanvasEvent<{ shapes: Shape[]; selectedShapes: Shape[] }> = {
      type: "SHAPES_UPDATED",
      data: {
        shapes: this.getShapes(),
        selectedShapes: this.model.getSelectedShapes(),
      },
    };
    this.notify(event);
  }

  notifyStateChanged() {
    const event: CanvasEvent<{ currentState: string; drawingShape?: string }> =
      {
        type: "STATE_CHANGED",
        data: {
          currentState: this.state.constructor.name,
          drawingShape:
            this.state instanceof DrawState ? this.shapeType : undefined,
        },
      };
    this.notify(event);
  }
}
