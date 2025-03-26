export interface Shape {
  draw(ctx: CanvasRenderingContext2D): void;
  //move(dx: number, dy: number),
  //resize(w: number, h:number)
}

export class Rectangle implements Shape {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private color: string
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Circle implements Shape {
  constructor(
    private centerX: number,
    private centerY: number,
    private radius: number,
    private color: string
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// vm
// class ShapeViewModel {
//   createRectangle(startX: number, startY: number, endX: number, endY: number): Rectangle {
//     const width = Math.abs(endX - startX);
//     const height = Math.abs(endY - startY);
//     return new Rectangle(startX, startY, width, height);
//   }

//   createCircle(centerX: number, centerY: number, endX: number, endY: number): Circle {
//     const radius = Math.sqrt((endX - centerX) ** 2 + (endY - centerY) ** 2);
//     return new Circle(centerX, centerY, radius);
//   }
// }
