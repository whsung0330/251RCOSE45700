import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { ShapeFactory } from "../entity/ShapeFactory";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/Shape";

export class CanvasViewModel extends Observable {
  private model: CanvasModel;
  private drawing = false;
  private drawingShape: Shape | null = null;

  public shapeType: string = "rectangle"; //TODO: 하나의 prop으로 정리하기?
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private color: string = "black";

  constructor(model: CanvasModel) {
    super();
    this.model = model;
  }

  getShapes() {
    if (this.drawing) {
      return this.drawingShape
        ? [...this.model.getShapes(), this.drawingShape]
        : this.model.getShapes();
    }
    return this.model.getShapes();
  }

  getSelectedShapes() {
    return this.model.getSelectedShapes();
  }

  handleMouseDown = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.drawing = true;
    this.model.clearSelectedShapes();
  };

  handleMouseMove = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.drawing) return;

    this.endX = offsetX;
    this.endY = offsetY; // 실시간 반영

    if (this.shapeType === "select") {
      this.model.clearSelectedShapes();
      this.selectShapes(this.startX, this.startY, this.endX, this.endY);
      this.notifyCanvas();
      return;
    }

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.model.countShapes(),
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
      color: this.color,
    });

    this.notifyCanvas();
  };

  handleMouseUp = () => {
    if (this.drawing && this.shapeType !== "select") {
      this.model.addShape(
        ShapeFactory.createShape(this.shapeType, {
          id: this.model.countShapes(),
          startX: this.startX,
          startY: this.startY,
          endX: this.endX,
          endY: this.endY,
          color: this.color,
        })
      ); // Model에 추가
    }
    this.notifyCanvas();
    this.drawing = false;
  };

  selectShapes(startX: number, startY: number, endX: number, endY: number) {
    this.model.clearSelectedShapes();

    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    this.model.getShapes().forEach((shape) => {
      if (
        ((minX <= shape.startX && shape.startX <= maxX) ||
          (minX <= shape.endX && shape.endX <= maxX)) &&
        ((minY <= shape.startY && shape.startY <= maxY) ||
          (minY <= shape.endY && shape.endY <= maxY))
      ) {
        this.model.addSelectedShapes(shape);
      }
    });
  }

  notifyCanvas() {
    this.notify([this.getShapes(), this.model.getSelectedShapes()]);
  }
}
