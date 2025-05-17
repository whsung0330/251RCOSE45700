export interface ZOrderStrategy {
    execute(zOrder: number[], index: number): void;
}

export class MoveForwardStrategy implements ZOrderStrategy {
    execute(zOrder: number[], index: number) {
        if (index < zOrder.length - 1) {
            [zOrder[index], zOrder[index + 1]] = [zOrder[index + 1], zOrder[index]];
        }
    }
}

export class MoveBackwardStrategy implements ZOrderStrategy {
    execute(zOrder: number[], index: number) {
        if (index > 0) {
            [zOrder[index], zOrder[index - 1]] = [zOrder[index - 1], zOrder[index]];
        }
    }
}

export class MoveToFrontStrategy implements ZOrderStrategy {
    execute(zOrder: number[], index: number) {
        const item = zOrder.splice(index, 1)[0];
        zOrder.push(item);
    }
}

export class MoveToBackStrategy implements ZOrderStrategy {
    execute(zOrder: number[], index: number) {
        const item = zOrder.splice(index, 1)[0];
        zOrder.unshift(item);
    }
}