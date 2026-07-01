import { Container } from "pixi.js";
import { Reel } from "../Reel/Reel";
import type { SymbolType, WinLine } from "../../types/index";

export class SlotGrid extends Container {
  private reels: Reel[] = [];

  constructor(matrix: SymbolType[][]) {
    super();

    for (let i = 0; i < 5; i++) {
      const columnTypes = matrix.map((row) => row[i]);
      const reel = new Reel(columnTypes);

      reel.position.set(i * 105, 0);

      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  /** Подсвечивает символы, входящие в выигрышные линии (лайновые выигрыши). */
  public highlightWin(winLines: WinLine[]): void {
    winLines.forEach((line) => {
      line.positions.forEach(([col, row]) => {
        const symbol = this.reels[col].getSymbol(row);
        symbol.setHighlight(true);
      });
    });
  }

  /**
   * Подсвечивает все символы-скаттеры на поле (для бонусного выигрыша,
   * который не привязан к конкретной линии).
   */
  public highlightScatters(matrix: SymbolType[][], scatterId: string): void {
    matrix.forEach((row, rowIndex) => {
      row.forEach((symbol, colIndex) => {
        if (symbol === scatterId) {
          this.reels[colIndex].getSymbol(rowIndex).setHighlight(true);
        }
      });
    });
  }

  public updateGrid(matrix: SymbolType[][]): void {
    for (let i = 0; i < 5; i++) {
      const columnTypes = matrix.map((row) => row[i]);
      this.reels[i].updateSymbols(columnTypes);

      for (let j = 0; j < 3; j++) {
        this.reels[i].getSymbol(j).setHighlight(false);
      }
    }
  }
}