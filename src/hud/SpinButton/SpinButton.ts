import { Container, Graphics, Text } from "pixi.js";
import clickSoundUrl from "../../assets/click.mp3";

export class SpinButton extends Container {
  private bg: Graphics;
  private buttonText: Text;
  private clickSound: HTMLAudioElement;

  constructor(onClick: () => void) {
    super();

    const radius = 45;

    this.bg = new Graphics();
    this.bg.circle(0, 0, radius);
    this.bg.fill(0xffcc00);

    this.buttonText = new Text({
      text: "SPIN",
      style: {
        fill: 0x000000,
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Arial",
      },
    });

    this.buttonText.anchor.set(0.5);
    this.buttonText.position.set(0, 0);

    this.addChild(this.bg, this.buttonText);

    this.clickSound = new Audio(clickSoundUrl);
    this.clickSound.volume = 0.5;

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerover", () => (this.alpha = 0.8));
    this.on("pointerout", () => {
      this.alpha = 1;
      this.scale.set(1);
    });

    this.on("pointerdown", () => {
      this.alpha = 0.6;
      this.scale.set(0.95);
    });

    this.on("pointerup", () => {
      this.alpha = 0.8;
      this.scale.set(1);

      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {});

      onClick();
    });

    this.on("pointerupoutside", () => {
      this.alpha = 1;
      this.scale.set(1);
    });
  }

  public setEnabled(enabled: boolean): void {
    this.eventMode = enabled ? "static" : "none";
    this.alpha = enabled ? 1 : 0.5;

    if (!enabled) {
      this.scale.set(1);
    }
  }
}
