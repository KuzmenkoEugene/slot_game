import { Application, Assets, Sprite, Text } from "pixi.js";
import { GameStore } from "../../store/GameStore";
import { SlotGrid } from "../../entities/SlotGrid/SlotGrid";
import { ScoreBoard } from "../../hud/ScoreBoard/ScoreBoard";
import { SpinButton } from "../../hud/SpinButton/SpinButton";
import bgImageUrl from "../../assets/background.png";
import bgMusicUrl from "../../assets/ambient.mp3";
import winSoundUrl from "../../assets/win.mp3";

export class GameController {
  private app: Application;
  private store: GameStore;
  
  private grid!: SlotGrid;
  private scoreBoard!: ScoreBoard;
  private winText!: Text;
  
  private bgMusic!: HTMLAudioElement;
  private winSound!: HTMLAudioElement;
  private isMusicPlaying: boolean = false;

  constructor(app: Application, store: GameStore) {
    this.app = app;
    this.store = store;
  }

  public async initScene(): Promise<void> {
    this.bgMusic = new Audio(bgMusicUrl);
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.2;

    this.winSound = new Audio(winSoundUrl);
    this.winSound.volume = 0.6;

    const bgTexture = await Assets.load(bgImageUrl);
    const background = new Sprite(bgTexture);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    this.app.stage.addChild(background);

    const initialSpin = this.store.getInitialSpin();
    this.grid = new SlotGrid(initialSpin.matrix);
    this.grid.position.set(130, 150);
    this.app.stage.addChild(this.grid);

    this.scoreBoard = new ScoreBoard(this.store.currentBalance, this.store.currentBet);
    this.scoreBoard.position.set(230, 10);
    this.app.stage.addChild(this.scoreBoard);

    this.winText = new Text({
      text: "",
      style: { 
        fill: 0xffd700, 
        fontSize: 64, 
        fontFamily: "Arial",
        fontWeight: "bold" as const,
        dropShadow: { color: 0x000000, alpha: 0.8, blur: 5, distance: 3 }
      }
    });
    this.winText.anchor.set(0.5);
    this.winText.position.set(this.app.screen.width / 2, this.app.screen.height - 100);
    this.app.stage.addChild(this.winText);

    const spinButton = new SpinButton(() => this.handleSpin());
    spinButton.position.set(this.app.screen.width - 80, this.app.screen.height - 80);
    this.app.stage.addChild(spinButton);
  }

  private handleSpin(): void {
    if (!this.isMusicPlaying) {
      this.bgMusic.play().catch(e => console.log("Автовоспроизведение заблокировано", e));
      this.isMusicPlaying = true;
    }

    if (!this.store.canSpin()) {
      this.winText.text = "Недостаточно средств";
      return;
    }

    this.winText.text = "";

    const spinResult = this.store.getNextSpin();
    this.grid.updateGrid(spinResult.matrix);

    // Выигрыш берём напрямую из предоставленного JSON, а не пересчитываем
    // заново — так корректно отрабатывают все кейсы, включая скаттер/бонус.
    const win = spinResult.win;

    if (win.amount > 0) {
      this.store.addWin(win.amount);
      this.winText.text = win.bonusTriggered
        ? `BONUS! WIN: ${win.amount}`
        : `WIN: ${win.amount}`;

      this.winSound.currentTime = 0;
      this.winSound.play().catch(() => {});
    }

    if (win.lines && win.lines.length > 0) {
      this.grid.highlightWin(win.lines);
    }

    if (win.bonusTriggered) {
      const scatterId = this.store.getScatterSymbolId();
      if (scatterId) {
        this.grid.highlightScatters(spinResult.matrix, scatterId);
      }
    }

    this.scoreBoard.updateBalance(this.store.currentBalance);
  }
}