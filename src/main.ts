import { Application } from "pixi.js";
import { GameStore } from "./store/GameStore";
import { GameController } from "./controllers/GameController/GameController";
import gameData from "./assets/slot_test_assignm.json";
import type { GameData } from "./types";
import "./style.css";

async function init() {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1a2235,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.body.appendChild(app.canvas);

  const store = new GameStore(gameData as GameData);
  const game = new GameController(app, store);

  await game.initScene();
}

init();
