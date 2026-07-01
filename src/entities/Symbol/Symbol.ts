import { Container, Graphics, Text } from "pixi.js";
import type { SymbolType } from "../../types/index";

export class SlotSymbol extends Container {
  private bg: Graphics;
  private symbolText: Text;
  private symbolType: SymbolType;

  constructor(type: SymbolType) {
    super();
    this.symbolType = type;

    this.bg = new Graphics();
    this.bg.rect(0, 0, 100, 100);
    this.bg.fill(0xffffff);
    this.bg.stroke({ color: 0x000000, width: 2 });
    this.addChild(this.bg);

    this.symbolText = new Text({
      text: type,
      style: { fill: 0x000000, fontSize: 20, fontWeight: "bold" },
    });
    this.symbolText.anchor.set(0.5);
    this.symbolText.position.set(50, 50);
    this.addChild(this.symbolText);
  }

  public setType(type: SymbolType): void {
    this.symbolType = type;
    this.symbolText.text = type;
  }

  public setHighlight(isHighlight: boolean): void {
    this.bg.clear();
    this.bg.rect(0, 0, 100, 100);
    this.bg.fill(isHighlight ? 0xffd700 : 0xffffff);
    this.bg.stroke({ color: 0x000000, width: 2 });
  }

  public get type(): SymbolType {
    return this.symbolType;
  }
}
