import { Container, Graphics, Text } from "pixi.js";

export class ScoreBoard extends Container {
  private bg: Graphics;
  private balanceValue: Text;
  private betValue: Text;

  constructor(initialBalance: number, initialBet: number) {
    super();

    this.bg = new Graphics();
    this.bg.roundRect(0, 0, 340, 60, 10);
    this.bg.fill({ color: 0x151520, alpha: 0.95 });
    this.bg.stroke({ color: 0xffcc00, width: 2 });

    const labelStyle = {
      fill: 0x8a91a4,
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "bold" as const,
      letterSpacing: 2,
    };

    const valueStyle = {
      fill: 0xffffff,
      fontSize: 24,
      fontFamily: "Arial",
      fontWeight: "bold" as const,
      dropShadow: { color: 0x000000, alpha: 0.8, blur: 2, distance: 2 },
    };

    const balanceLabel = new Text({ text: "BALANCE:", style: labelStyle });
    this.balanceValue = new Text({
      text: initialBalance.toString(),
      style: { ...valueStyle, fill: 0xffcc00 },
    });

    const betLabel = new Text({ text: "BET:", style: labelStyle });
    this.betValue = new Text({
      text: initialBet.toString(),
      style: valueStyle,
    });

    [balanceLabel, this.balanceValue, betLabel, this.betValue].forEach((t) =>
      t.anchor.set(0, 0.5),
    );

    balanceLabel.position.set(20, 30);
    this.balanceValue.position.set(110, 30);

    betLabel.position.set(250, 30);
    this.betValue.position.set(300, 30);

    this.addChild(
      this.bg,
      balanceLabel,
      this.balanceValue,
      betLabel,
      this.betValue,
    );
  }

  public updateBalance(balance: number): void {
    this.balanceValue.text = balance.toString();
  }
}
