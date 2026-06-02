// -------------------------------
// TIME / SKY VARIABLES
// -------------------------------

let time = 0;
let sunX = 55;
let sunY = 200;
let moonX = 600;
let moonY = 400;
let skyColor;
let stars = [];

// -------------------------------
// ANIMATION VARIABLES
// -------------------------------

let circleX = 320;
let circleDirection = 1;
let stopCircle = false;
let tireRotation = 0;
let lightColor;
let dashOffset = 0;
let roseScale = 1;
let cloudX = -100;
let birdX = 1000;

let crowX = 180;
let crowY = 280;
let crowMoved = false;

// -------------------------------
// URDU TEXT VARIABLES
// -------------------------------

let textX1 = 340;
let textY1 = 445;
let textWidth1 = 250;
let textHeight1 = 20;

let textX2 = 590;
let textY2 = 445;
let textWidth2 = 250;
let textHeight2 = 20;

// -------------------------------
// EDUCATIONAL LAYER VARIABLES
// -------------------------------

let activeHotspot = null;

let hotspots = [
  {
    id: "chamak",
    label: "Chamak Pati",
    x: 300,
    y: 335,
    w: 500,
    h: 45,
    dotX: 550,
    dotY: 355,
    title: "Chamak Pati",
    body: "Reflective steel decorations used on Pakistani trucks. They catch sunlight and make the truck sparkle on the road."
  },
  {
    id: "urdu",
    label: "Urdu Quotes",
    x: 335,
    y: 425,
    w: 500,
    h: 40,
    dotX: 470,
    dotY: 445,
    title: "Urdu Quotes",
    body: "Trucks often include poetry, jokes, or emotional phrases.\n\n“Fasla rakhay warna pyar ho jayay ga” means “Keep your distance, or I’ll fall for you.”"
  },
  {
    id: "motifs",
    label: "Motifs",
    x: 315,
    y: 385,
    w: 460,
    h: 150,
    dotX: 520,
    dotY: 425,
    title: "Painted Motifs",
    body: "Artists paint flowers, birds, landscapes, and patterns to make each truck feel unique and expressive."
  },
  {
    id: "driver",
    label: "Driver",
    x: 190,
    y: 405,
    w: 105,
    h: 145,
    dotX: 260,
    dotY: 430,
    title: "The Driver",
    body: "Drivers personalize their trucks with colors, names, symbols, and quotes that show pride, humor, and identity."
  }
];

// -------------------------------
// SETUP
// -------------------------------

function setup() {
  createCanvas(1000, 1000);
  noStroke();

  // Instrument Sans must also be loaded in index.html.
  textFont("Instrument Sans");

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      brightness: random(100, 255)
    });
  }
}

// -------------------------------
// DRAW
// -------------------------------

function draw() {
  drawSky();
  drawCrow();
  drawRoad();
  drawTruck();
  drawClouds();

  // Educational layer stays last so it appears on top.
  drawInstructionBanner();
  drawHotspots();
  drawInfoCard();
}

// -------------------------------
// SKY
// -------------------------------

function drawSky() {
  let r = map(time, 0, 300, 173, 25);
  let g = map(time, 0, 300, 216, 25);
  let b = map(time, 0, 300, 230, 112);

  skyColor = color(r, g, b);
  background(skyColor);

  if (time < 300) {
    textSize(80);
    text("☀️", sunX, sunY);

    if (time > 100) {
      sunY += 2;
    }
  }

  if (time >= 150) {
    textSize(80);
    text("🌙", moonX, moonY);

    if (moonY > 100) {
      moonY -= 0.5;
    }
  }

  if (time >= 200) {
    for (let i = 0; i < stars.length; i++) {
      fill(255, 255, 255, stars[i].brightness);
      ellipse(stars[i].x, stars[i].y, 5, 5);

      stars[i].brightness += random(-5, 5);
      stars[i].brightness = constrain(stars[i].brightness, 100, 255);
    }
  }

  if (time < 300) {
    time++;
  }
}

// -------------------------------
// CROW
// -------------------------------

function drawCrow() {
  textSize(35);

  if (!crowMoved) {
    let crowSize = 35;

    if (
      mouseX > crowX - crowSize / 2 &&
      mouseX < crowX + crowSize / 2 &&
      mouseY > crowY - crowSize / 2 &&
      mouseY < crowY + crowSize / 2
    ) {
      crowX = 150;
      crowY = 312;
      crowMoved = true;
    }
  }

  text("🦅", crowX, crowY);
}

// -------------------------------
// ROAD
// -------------------------------

function drawRoad() {
  fill("green");
  rect(0, 500, 1000, 900);

  fill("#000000");
  rect(0, 400, 1000, 550);

  dashOffset -= 2;

  if (dashOffset < -36) {
    dashOffset = 0;
  }

  push();
  drawingContext.setLineDash([16, 20]);
  drawingContext.lineDashOffset = dashOffset;
  stroke("white");
  strokeWeight(4);
  line(0, 700, 1000, 700);
  drawingContext.setLineDash([]);
  pop();

  noStroke();
  fill("#FFD13B");
  rect(0, 430, 1000, 5);
  rect(0, 920, 1000, 5);
}

// -------------------------------
// TRUCK
// -------------------------------

function drawTruck() {
  noStroke();

  textSize(25);
  text("🏅", 157, 667);
  text("🏅", 176, 667);
  text("🏅", 196, 667);

  fill(128);
  rect(165, 625, 640, 20, 4);

  if (frameCount % 60 < 30) {
    lightColor = color(255, 255, 0);
  } else {
    lightColor = color(255, 165, 0);
  }

  fill(lightColor);
  ellipse(180, 610, 20, 30);

  fill(0, 128, 0);
  arc(300, 625, 250, 250, PI, TWO_PI);

  fill("red");
  rect(795, 600, 10, 20, 20);

  fill("#8BC34A");
  rect(300, 350, 500, 275, 0, 10, 10, 0);

  fill(255, 0, 0);
  rect(300, 350, 500, 100, 0, 10);

  fill(0, 0, 220);
  rect(300, 350, 250, 100, 0, 0);

  drawTire(400, 625);
  drawTire(700, 625);

  textSize(40);
  text("🔆", 380, 640);
  text("🔆", 680, 640);

  fill("#FF0000");
  triangle(300, 350, 300, 500, 150, 320);

  fill("#FF0000");
  quad(220, 400, 300, 390, 300, 550, 200, 555);

  fill("#E91E63");
  rect(220, 395, 80, 10, 0, 10, 0, 0);

  drawDoorPattern();

  fill("#add8e6");
  quad(230, 420, 285, 420, 288, 530, 220, 530);

  textSize(150);
  text("🧎🏽‍♀️", 187, 539);

  fill("#000000");
  ellipse(235, 525, 8, 50);

  fill("#0FA65F");
  rect(195, 520, 605, 40, 10);

  if (mouseX > 220 && mouseX < 300 && mouseY > 400 && mouseY < 550) {
    fill("#0125eb");
  } else {
    fill("#FADB09");
  }

  rect(270, 540, 10, 5);

  fill("#FADB09");
  rect(300, 450, 500, 10);
  rect(300, 470, 500, 10);

  fill("#0FA65F");
  rect(300, 460, 500, 10);

  drawTopEmojis();
  drawHoodSymbols();
  drawCircleEmojiLine();
  drawTruckTopStars();
  drawDetailSymbols();
  drawHoodFlowers();

  push();
  drawingContext.setLineDash([10, 10]);
  stroke("#FF0000");
  strokeWeight(2);
  line(210, 530, 779, 530);
  drawingContext.setLineDash([]);
  pop();

  fill("#8BC34A");
  circle(circleX, 465, 25);

  if (!stopCircle) {
    circleX += 2 * circleDirection;

    if (circleX > 780 || circleX < 320) {
      circleDirection *= -1;
    }
  }

  if (
    mouseX > circleX - 17.5 &&
    mouseX < circleX + 17.5 &&
    mouseY > 447.5 &&
    mouseY < 482.5
  ) {
    stopCircle = true;
  } else {
    stopCircle = false;
  }

  if (!stopCircle) {
    tireRotation += 0.1;
  }

  drawLeavesAndRose();

  push();
  translate(780, 642);
  rotate(HALF_PI);
  textSize(30);
  text("🚩", 0, 0);
  pop();

  drawUrduText();
}

// -------------------------------
// TRUCK HELPER FUNCTIONS
// -------------------------------

function drawTire(x, y) {
  push();
  translate(x, y);
  rotate(-tireRotation);

  fill(70, 105, 105);
  circle(0, 0, 125);

  fill(0);
  arc(0, 0, 62.5, 62.5, 0, PI);

  fill(255);
  arc(0, 0, 62.5, 62.5, PI, TWO_PI);

  pop();
}

function drawDoorPattern() {
  let patternX = [220, 235, 250, 265, 280];

  for (let i = 0; i < patternX.length; i++) {
    if (
      mouseX > patternX[i] &&
      mouseX < patternX[i] + 10 &&
      mouseY > 395 &&
      mouseY < 405
    ) {
      fill(i % 2 === 0 ? 0 : 255);
    } else {
      fill(i % 2 === 0 ? 255 : 0);
    }

    rect(patternX[i], 395, 10, 10);
  }
}

function drawTopEmojis() {
  textSize(55);

  drawHoverEmoji("🌼", 320, 420);
  drawHoverEmoji("🦚", 400, 420);
  drawHoverEmoji("🌼", 480, 420);
  drawHoverEmoji("🦚", 570, 420);
  drawHoverEmoji("🌼", 650, 420);
  drawHoverEmoji("🦚", 730, 420);
}

function drawHoverEmoji(emoji, x, y) {
  let scaleFactor = 1;

  if (dist(mouseX, mouseY, x, y) < 50) {
    scaleFactor = 1.2;
  }

  push();
  translate(x, y);
  scale(scaleFactor);
  text(emoji, 0, 0);
  pop();
}

function drawHoodSymbols() {
  textSize(30);

  if (mouseX > 180 && mouseX < 770 && mouseY > 615 && mouseY < 645) {
    fill("#FFEB3B");
  } else {
    fill("#FFFFFF");
  }

  text("❖", 180, 635);
  text("❖", 220, 635);
  text("❖", 260, 635);
  text("❖", 300, 635);
  text("❖", 470, 635);
  text("❖", 510, 635);
  text("❖", 550, 635);
  text("❖", 590, 635);
  text("❖", 770, 635);

  textSize(22);

  if (mouseX > 202 && mouseX < 615 && mouseY > 615 && mouseY < 645) {
    fill("#FAFAF7");
  } else {
    fill("#FF0000");
  }

  text("❁", 202, 635);
  text("❁", 242, 635);
  text("❁", 282, 635);
  text("❁", 493, 635);
  text("❁", 533, 635);
  text("❁", 575, 635);
  text("❁", 615, 635);
}

function drawCircleEmojiLine() {
  textSize(30);

  text("🔵", 306, 514);
  text("🔴", 336, 514);
  text("🟢", 366, 514);
  text("🟢", 396, 514);
  text("⚪️", 426, 514);
  text("🔵", 456, 514);
  text("🟢", 486, 514);
  text("🔴", 516, 514);
  text("🔴", 546, 514);
  text("🟢", 576, 514);
  text("🔵", 606, 514);
  text("⚪️", 636, 514);
  text("🟢", 666, 514);
  text("🟢", 696, 514);
  text("🔴", 726, 514);
  text("🔵", 756, 514);
}

function drawTruckTopStars() {
  let rainbowColors = [
    color(250, 0, 0),
    color(255, 165, 0),
    color(255, 255, 0),
    color(0, 128, 0),
    color(0, 0, 255),
    color(75, 0, 130),
    color(238, 130, 238)
  ];

  let starX = 306;
  let starY = 360;
  let starSpacing = 30;

  textSize(30);

  for (let i = 0; i < 16; i++) {
    let colorIndex = int((frameCount / 50 + i) % rainbowColors.length);
    fill(rainbowColors[colorIndex]);
    text("✦", starX + i * starSpacing, starY);
  }

  textSize(20);
  text("✦", 310, 445);
  text("✦", 530, 445);
  text("✦", 560, 445);
  text("✦", 770, 445);

  text("✪", 200, 555);
  text("✪", 775, 555);
}

function drawDetailSymbols() {
  textSize(20);

  if (mouseX > 310 && mouseX < 760 && mouseY > 510 && mouseY < 545) {
    fill("#FFFFFF");
  } else {
    fill("#FFEB3B");
  }

  text("♠︎", 310, 510);
  text("👁️", 340, 510);
  text("🌼", 370, 510);
  text("♦︎", 400, 510);
  text("🇵🇰", 430, 510);
  text("♠︎", 460, 510);
  text("♦︎", 490, 510);
  text("👁️", 520, 510);
  text("👁️", 550, 510);
  text("♦︎", 580, 510);
  text("♠︎", 610, 510);
  text("🇵🇰", 640, 510);
  text("♦︎", 670, 510);
  text("🌼", 700, 510);
  text("👁️", 730, 510);
  text("♠︎", 760, 510);
}

function drawHoodFlowers() {
  textSize(30);
  text("🌺", 145, 340);

  textSize(29);
  text("🌺", 175, 345);

  textSize(28);
  text("🌺", 165, 340);

  textSize(30);
  text("🌺", 185, 350);
  text("🌺", 197, 350);
  text("🌺", 220, 355);

  textSize(32);
  text("🌺", 240, 359);

  textSize(29);
  text("🌺", 255, 360);

  textSize(30);
  text("🌺", 270, 361);
}

function drawLeavesAndRose() {
  textSize(70);
  text("🌿", 550, 600);

  push();
  translate(545, 600);
  scale(-1, 1);
  textSize(70);
  text("🌿", 0, 0);
  pop();

  textSize(40);
  text("🌿", 240, 600);

  push();
  translate(240, 600);
  scale(-1, 1);
  textSize(40);
  text("🌿", 0, 0);
  pop();

  textSize(30);
  text("🌿", 750, 600);

  push();
  translate(650, 600);
  scale(-1, 1);
  textSize(30);
  text("🌿", 0, 0);
  pop();

  textSize(30);
  text("🌿", 450, 600);

  push();
  translate(350, 600);
  scale(-1, 1);
  textSize(30);
  text("🌿", 0, 0);
  pop();

  if (mouseX > 460 && mouseX < 540 && mouseY > 570 && mouseY < 630) {
    roseScale = 1.3;
  } else {
    roseScale = 1;
  }

  push();
  translate(515, 600);
  scale(roseScale);
  textSize(60);
  text("🌺", 0, 0);
  pop();
}

function drawUrduText() {
  textFont("Instrument Sans");

  if (
    mouseX > textX1 &&
    mouseX < textX1 + textWidth1 &&
    mouseY > textY1 - textHeight1 &&
    mouseY < textY1
  ) {
    fill("red");
  } else {
    fill("#FFFFFE");
  }

  textSize(15);
  text("فاصلہ رکھیں ورنہ پیار ہو جائے گا", textX1, textY1);

  if (
    mouseX > textX2 &&
    mouseX < textX2 + textWidth2 &&
    mouseY > textY2 - textHeight2 &&
    mouseY < textY2
  ) {
    fill("blue");
  } else {
    fill("#FFFFFE");
  }

  textSize(15);
  text("دیکھنے میں ڈولی چلنے میں گولی", textX2, textY2);

  fill("#FFC107");
  textSize(20);
  text("ماں کی دعا", 210, 385);
  text("جنت کا ہوا", 210, 589);
  text("باپ کی دعا", 625, 555);
  text("جا بیٹا ٹیکسی چلا", 340, 555);
}

// -------------------------------
// CLOUDS
// -------------------------------

function drawClouds() {
  textSize(220);
  text("☁️", 130, 190);

  textSize(300);
  text("☁️", -90, 180);

  textSize(250);
  text("☁️", 300, 190);

  textSize(190);
  text("☁️", 400, 220);

  textSize(250);
  text("☁️", 600, 240);

  textSize(220);
  text("☁️", 900, 190);

  textSize(200);
  text("☁️", 800, 300);

  textSize(190);
  text("☁️", 460, 160);

  textSize(200);
  text("☁️", cloudX, 150);

  cloudX += 1.0;

  if (cloudX > width) {
    cloudX = -100;
  }

  textSize(200);
  text("☁️", birdX, 260);

  birdX -= 1.5;

  if (birdX < -100) {
    birdX = width;
  }
}

// -------------------------------
// EDUCATIONAL UX LAYER
// -------------------------------

function drawInstructionBanner() {
  push();

  textFont("Instrument Sans");

  fill(255, 255, 255, 238);
  stroke("#1A2730");
  strokeWeight(0.15);
  rect(140, 15, 700, 110, 15);

  noStroke();
  fill("#1A2730");
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(28);
  text("Explore Pakistani Truck Art", 500, 60);

  textStyle(NORMAL);
  textSize(12);
  text(
    "Tap the glowing dots to learn about the art, language, craft, and stories behind Pakistani truck art.",
    220,
    84,
    560,
    45
  );

  pop();
}

function drawHotspots() {
  for (let i = 0; i < hotspots.length; i++) {
    let h = hotspots[i];

    if (isMouseOverHotspot(h)) {
      push();
      noFill();
      stroke("#00E5FF");
      strokeWeight(0);
      rect(h.x, h.y, h.w, h.h, 12);
      pop();
    }

    drawHotspotDot(h.dotX, h.dotY);
  }
}

function drawHotspotDot(x, y) {
  let pulse = 10 + sin(frameCount * 0.08) * 3;

  push();
  noStroke();

  fill(0, 229, 255, 70);
  ellipse(x, y, pulse * 3.4, pulse * 3.4);

  fill(0, 229, 255, 150);
  ellipse(x, y, pulse * 2.2, pulse * 2.2);

  fill("#00E5FF");
  ellipse(x, y, 18, 18);

  fill("#1A2730");
  ellipse(x, y, 7, 7);

  pop();
}

function drawInfoCard() {
  if (activeHotspot === null) {
    return;
  }

  let h = activeHotspot;

  push();

  textFont("Instrument Sans");

  noStroke();
  fill(0, 0, 0, 70);
  rect(262, 742, 500, 175, 18);

  fill(255, 255, 255, 248);
  stroke("#1A2730");
  strokeWeight(2);
  rect(250, 730, 500, 175, 18);

  noStroke();
  fill("#1A2730");
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(24);
  text(h.title, 280, 770);

  textStyle(NORMAL);
  textSize(14);
  fill("#333333");
  text(h.body, 280, 798, 420, 70);

  fill("grey");
  textSize(12);
  textStyle();
  text("Tap another glowing dot to keep exploring.", 280, 880);

  fill("#1A2730");
  rect(700, 748, 28, 28, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("×", 714, 761);

  pop();
}

function isMouseOverHotspot(h) {
  return mouseX > h.x && mouseX < h.x + h.w && mouseY > h.y && mouseY < h.y + h.h;
}

function mousePressed() {
  if (activeHotspot !== null) {
    if (mouseX > 700 && mouseX < 728 && mouseY > 748 && mouseY < 776) {
      activeHotspot = null;
      return;
    }
  }

  for (let i = 0; i < hotspots.length; i++) {
    if (isMouseOverHotspot(hotspots[i])) {
      activeHotspot = hotspots[i];
      return;
    }
  }
}
