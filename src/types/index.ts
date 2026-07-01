export interface GameConfig {
  rows: number;
  columns: number;
  bet: number;
  balance: number;
}

export type SymbolType = "regular" | "wild" | "scatter";

export interface Payouts {
  [key: string]: number;
}

export interface SymbolConfig {
  id: string;
  type: SymbolType;
  payout?: Payouts;
}

export interface Payline {
  id: number;
  positions: [number, number][];
}

export interface WinLine {
  payline: number;
  symbol: string;
  count: number;
  positions: [number, number][];
}

export interface SpinWin {
  amount: number;
  lines?: WinLine[];
  scatterCount?: number;
  bonusTriggered?: boolean;
}

export interface SpinResult {
  id: number;
  matrix: SymbolType[][];
  win: SpinWin;
}

export interface GameData {
  gameConfig: GameConfig;
  symbols: SymbolConfig[];
  paylines: Payline[];
  spins: SpinResult[];
}
