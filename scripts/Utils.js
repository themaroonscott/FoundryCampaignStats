import { ATTACKTYPES } from "./Settings";

function isTokenInside(template, token, wallsBlockTargeting) {
    const grid = canvas.scene.data.grid,
        templatePos = { x: template.data.x, y: template.data.y };

    const startX = token.width >= 1 ? 0.5 : token.width / 2;
    const startY = token.height >= 1 ? 0.5 : token.height / 2;

    for (let x = startX; x < token.width; x++) {
        for (let y = startY; y < token.height; y++) {
          const currGrid = {
            x: token.x + x * grid - templatePos.x,
            y: token.y + y * grid - templatePos.y,
          };
          let contains = template.shape?.contains(currGrid.x, currGrid.y);
          if (contains && wallsBlockTargeting) {
            const r = new Ray(
              { x: currGrid.x + templatePos.x, y: currGrid.y + templatePos.y },
              templatePos
            );
            contains = !canvas.walls.checkCollision(r);
          }
          if (contains) return true;
        }
      }
      return false;
}

