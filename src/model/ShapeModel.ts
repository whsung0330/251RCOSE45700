import { CANVAS, DEFAULT_SHAPE } from "../constants";
import { TextShape } from "../entity/shape";
import { Shape } from "../entity/shape/Shape";
import { ShapeFactory } from "../entity/shape/ShapeFactory";
import { TextShapeProps } from "../entity/shape/TextShape";

export class ShapeModel {
  private shapes: Shape[] = [];
  private zOrder: number[] = []; // z-order - shapeId map
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private shapeType: string = "rectangle"; // default shape type
  private drawingShape: Shape | null = null;

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.push(shape.id); // z-order는 도형 추가 시 자동으로 설정
  }

  clearShapes() {
    this.shapes = [];
    this.zOrder = [];
  }

  getShapes(): Shape[] {
    return [...this.getShapesByZOrder()]; // 원본 배열이 수정되지 않도록 복사본 반환
  }

  countShapes(): number {
    return this.shapes.length;
  }

  startDrawShape(shapeType: string, offsetX: number, offsetY: number): void {
    this.shapeType = shapeType;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }

  continueDrawShape(offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.countShapes(),
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
    });
  }

  endDrawShape(): void {
    if (this.drawingShape) {
      this.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
    }
  }

  getZOrder(): number[] {
    return this.zOrder;
  }

  getShapesByZOrder(): Shape[] {
    const sortedShapes = this.zOrder.map((id) => {
      return this.shapes.find((shape) => shape.id === id);
    });

    if (sortedShapes.includes(undefined)) {
      throw new Error("Shape not found in z-order mapping.");
    } else if (this.drawingShape != null) {
      return [...sortedShapes, this.drawingShape] as Shape[];
    } else return sortedShapes as Shape[];
  }

  setProperty(shapeId: number, propertyName: string, value: any): Shape {
    const shape = this.shapes.find((shape) => shape.id === shapeId);
    if (shape) {
      shape.setProperties(propertyName, value);
      return shape;
    } else {
      throw new Error("Shape not found.");
    }
  }

  addTemplateShape(type: string, properties: any): Shape {
    const defaultWidth = properties.width || DEFAULT_SHAPE.WIDTH;
    const defaultHeight = properties.height || DEFAULT_SHAPE.HEIGHT;

    const startX = properties.startX ?? (CANVAS.WIDTH - defaultWidth) / 2;
    const startY = properties.startY ?? (CANVAS.HEIGHT - defaultHeight) / 2;

    const shape = ShapeFactory.createShape(type, {
      id: this.countShapes(),
      startX,
      startY,
      endX: startX + defaultWidth,
      endY: startY + defaultHeight,
      color: properties.color || DEFAULT_SHAPE.COLOR,
      ...properties,
    });
    this.addShape(shape);
    return shape;
  }

  getTextShapeProperties(shapeId: number): TextShapeProps {
    const shape = this.shapes.find((s) => s.id === shapeId);
    // 일단은 TextShape에 대한 기능부터 구현하자 싶어서 if문 만들었습니다! 추후 제거 예정
    if (!(shape instanceof TextShape)) throw new Error("Requested shape is not a TextShape.");
    
  
    return {
      id: shape.id,
      textContent: shape.textContent,
      startX: shape.startX,
      startY: shape.startY,
      endX: shape.endX,
      endY: shape.endY,
      fontSize: shape.fontSize,
      fontFamily: shape.fontFamily,
      color: shape.color,
    };
  }
}
