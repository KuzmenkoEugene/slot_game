import { Container } from "pixi.js";
import { SlotSymbol } from "../Symbol/Symbol";
import type {SymbolType} from "../../types/index"

export class Reel extends Container {
  private symbols: SlotSymbol[] = [];

  constructor(types: SymbolType[]) {
    super();

    for (let i = 0; i < 3; i++) {
      const symbol = new SlotSymbol(types[i]);
      symbol.position.set(0, i * 105);
      this.symbols.push(symbol);
      this.addChild(symbol);
    }
  }

  public getSymbol(row: number): SlotSymbol {
    return this.symbols[row];
  }

  public updateSymbols(types: SymbolType[]): void {
    types.forEach((type, index) => {
      this.symbols[index].setType(type);
    });
  }
}
