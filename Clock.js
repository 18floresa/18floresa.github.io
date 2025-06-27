let canvas, ctx, radius;

function drawClock() {
  canvas = document.getElementById("analog-clock");
  if (!canvas.getContext) return;

  ctx = canvas.getContext("2d");
  radius = canvas.height / 2;
  radius = radius * 0.90;
  ctx.translate(radius, radius);

  setInterval(update, 1000);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour = (hour * Math.PI / 6) +
         (minute * Math.PI / (6 * 60)) +
         (second * Math.PI / (360 * 60));
  drawHand(ctx, hour, radius * 0.5, 7);

  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.8, 5);

  second = (second * Math.PI / 30);
  drawHand(ctx, second, radius * 0.9, 2, "red");
}

function drawHand(ctx, pos, length, width, color = "black") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function update() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  drawFace(ctx, radius);
  drawNumbers(ctx, radius); // ← Added here
  drawTime(ctx, radius);
}


