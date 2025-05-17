import { ShapeModel } from "../model/ShapeModel";
import React from "react";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { CanvasEvent } from "./CanvasEvents";
import { ICanvasState } from "./canvasState/CanvasState";
import { DrawState } from "./canvasState/DrawState";
import { ResizeState } from "./canvasState/ResizeState";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasStateCommandFactory } from "./canvasState/CanvasStateCommandFactory";
import {
  AddTemplateShapeCommand,
  CanvasResetCommand,
  SetPropertyCommand,
  ZOrderMoveCommand,
} from "../command";

export class CanvasViewModel extends Observable<any> {
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;
  private state: ICanvasState;
  private canvasStateCommandFactory: CanvasStateCommandFactory;

  private shapeType: string = "rectangle";

  constructor(shapeModel: ShapeModel, selectedShapeModel: SelectedShapeModel) {
    super();
    this.shapeModel = shapeModel;
    this.selectedShapeModel = selectedShapeModel;
    this.state = new DrawState(
      this,
      this.shapeModel,
      this.selectedShapeModel,
      this.shapeType
    ); //default: 그리기 모드
    this.canvasStateCommandFactory = new CanvasStateCommandFactory(
      this,
      this.shapeModel,
      this.selectedShapeModel
    );
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

  handleDoubleClick = (event: React.MouseEvent) => {
    this.state.handleDoubleClick(event);
    this.notifyShapesUpdated();
  };

  requestResetCanvas() {
    const command = new CanvasResetCommand(
      this,
      this.shapeModel,
      this.selectedShapeModel
    );
    command.execute();
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
        this.shapeModel,
        this.selectedShapeModel,
        handle.pos,
        canvas.left - event.nativeEvent.offsetX,
        canvas.top - event.nativeEvent.offsetY
      )
    );
  }

  requestSetState(stateType: string, params: any) {
    if (stateType === "DrawState") {
      this.setShapeType(params.shapeType); // shapeType을 DrawState에 전달
    } else this.setShapeType("");
    const command = this.canvasStateCommandFactory.createCommand(
      stateType,
      params
    );
    command.execute();
  }

  getShapes() {
    return this.shapeModel.getShapes();
  }

  getShapeType() {
    return this.shapeType;
  }

  requestZOrderMove(action: string, shapeId: number) {
    const command = new ZOrderMoveCommand(this.shapeModel, action, shapeId);
    command.execute();
    this.notifyShapesUpdated();
  }

  requestSetProperty(shapeId: number, propertyName: string, value: any) {
    const command = new SetPropertyCommand(
      this.shapeModel,
      shapeId,
      propertyName,
      value
    );
    command.execute();
    this.notifyShapesUpdated();
  }

  requestAddTemplateShape(type: string, properties: any) {
    const command = new AddTemplateShapeCommand(
      this,
      this.shapeModel,
      this.selectedShapeModel,
      type,
      properties
    );
    command.execute();
    this.notifyShapesUpdated();
  }

  notifyShapesUpdated() {
    const event: CanvasEvent<{ shapes: Shape[]; selectedShapes: Shape[] }> = {
      type: "SHAPES_UPDATED",
      data: {
        shapes: this.getShapes(),
        selectedShapes: this.selectedShapeModel.getSelectedShapes(),
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
