import type { GameData, SpinResult } from "../types";

export class GameStore {
  private balance: number;
  private bet: number;
  private spinIndex: number = 0;
  private data: GameData;

  constructor(gameData: GameData) {
    this.data = gameData;
    this.balance = gameData.gameConfig.balance;
    this.bet = gameData.gameConfig.bet;
  }

  public getInitialSpin(): SpinResult {
    return this.data.spins[0];
  }

  public get currentBalance(): number {
    return this.balance;
  }

  public get currentBet(): number {
    return this.bet;
  }

  public canSpin(): boolean {
    return this.balance >= this.bet;
  }

  public getNextSpin(): SpinResult {
    if (!this.canSpin()) {
      throw new Error("Недостаточно средств");
    }

    this.balance -= this.bet;
    const spin = this.data.spins[this.spinIndex];
    this.spinIndex = (this.spinIndex + 1) % this.data.spins.length;

    return spin;
  }

  public addWin(amount: number): void {
    this.balance += amount;
  }

  public getScatterSymbolId(): string | undefined {
    return this.data.symbols.find((s) => s.type === "scatter")?.id;
  }
}
