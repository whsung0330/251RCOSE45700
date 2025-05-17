import { PROPERTY_NAMES, PROPERTY_TYPES } from "../../constants";
import {
  CommonPropertyHandlers,
  PropertyHandler,
} from "../property/PropertyHandlers";
import { AbstractShape } from "./Shape";

export class Line extends AbstractShape {
  lineWidth: number = 1;

  get dx(): number {
    return this.endX - this.startX;
  }
  get dy(): number {
    return this.endY - this.startY;
  }
  get length(): number {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!ctx) throw new Error("context is null");
    ctx.save();

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    this.setShadow(ctx);
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  override getResizeHandles(): { x: number; y: number; pos: string }[] {
    return [
      { x: this.startX - 5, y: this.startY - 5, pos: "top-left" }, // starting point
      { x: this.endX - 5, y: this.endY - 5, pos: "bottom-right" }, // ending point
    ];
  }

  override resize(dx: number, dy: number, pos: string): void {
    switch (pos) {
      case "top-left":
        this.startX += dx;
        this.startY += dy;
        break;
      case "top-right":
        this.endX += dx;
        this.startY += dy;
        break;
      case "bottom-right":
        this.endX += dx;
        this.endY += dy;
        break;
      case "bottom-left":
        this.startX += dx;
        this.endY += dy;
        break;
    }
  }

  isPointInside(x: number, y: number, tolerance: number = 5): boolean {
    // 직선의 방정식 ax + by + c = 0
    const a = this.endY - this.startY; // dy
    const b = this.startX - this.endX; // -dx
    const c = this.endX * this.startY - this.startX * this.endY; // 상수항

    // 점과 직선 사이의 거리 공식
    const distance = Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);

    // 점이 선의 범위 있는지 확인
    const withinBounds =
      x >= Math.min(this.startX, this.endX) - tolerance &&
      x <= Math.max(this.startX, this.endX) + tolerance &&
      y >= Math.min(this.startY, this.endY) - tolerance &&
      y <= Math.max(this.startY, this.endY) + tolerance;

    // 점이 "직선"과 가까운지
    // 선 박스 내에 있는지
    return distance <= tolerance && withinBounds;
  }

  // 공통에 없는 Handler 만들어줌. 내부 설정값이라 private static
  // 길이
  private static LengthHandler = (): PropertyHandler<Line> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.LENGTH,
    getValue: (shape) => Math.round(shape.length),
    setValue: (shape, value) => {
      const centerX = shape.centerX;
      const centerY = shape.centerY;
      const newLength = Number(value);
      const angle = Math.atan2(shape.dy, shape.dx);
      shape.startX = centerX - (newLength / 2) * Math.cos(angle);
      shape.startY = centerY - (newLength / 2) * Math.sin(angle);
      shape.endX = centerX + (newLength / 2) * Math.cos(angle);
      shape.endY = centerY + (newLength / 2) * Math.sin(angle);
    },
  });
  // 선 굵기
  private static LineWidthHandler = (): PropertyHandler<Line> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.LINEWIDTH,
    getValue: (shape) => shape.lineWidth,
    setValue: (shape, value) => {
      shape.lineWidth = Number(value);
    },
  });

  protected getPropertyHandlers(): PropertyHandler<this>[] {
    return [
      CommonPropertyHandlers.HorizontalPos(),
      CommonPropertyHandlers.VerticalPos(),
      Line.LengthHandler(),
      Line.LineWidthHandler(),
      CommonPropertyHandlers.Color(),
      CommonPropertyHandlers.ShadowAngle(),
      CommonPropertyHandlers.ShadowRadius(),
      CommonPropertyHandlers.ShadowBlur(),
      CommonPropertyHandlers.ShadowColor(),
    ];
  }
}
