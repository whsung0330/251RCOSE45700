import {
    ZOrderStrategy,
    MoveForwardStrategy,
    MoveBackwardStrategy,
    MoveToFrontStrategy,
    MoveToBackStrategy,
} from "./ZOrderStrategy";

export class ZOrderStrategyFactory {
    private static strategies: Record<string, ZOrderStrategy> = {
        forward: new MoveForwardStrategy(),
        backward: new MoveBackwardStrategy(),
        toFront: new MoveToFrontStrategy(),
        toBack: new MoveToBackStrategy(),
    };

    static getStrategy(action: string): ZOrderStrategy {
        const strategy = this.strategies[action];
        if (!strategy) throw new Error(`Invalid Z-order action: ${action}`);
        return strategy;
    }
}
