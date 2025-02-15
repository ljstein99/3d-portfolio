document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startOverlay").style.display = "none";
  controls.lock();
});

document.addEventListener("pointerlockchange", () => {
  if (window.ignorePauseOverlay) return;
  if (!document.pointerLockElement) {
    document.getElementById("pauseOverlay").style.display = "flex";
  } else {
    document.getElementById("pauseOverlay").style.display = "none";
  }
});

document.getElementById("resumeButton").addEventListener("click", () => {
  controls.lock();
});

document.addEventListener("keydown", (e) => {
  const key = e.key === " " ? "space" : e.key.toLowerCase();
  keys[key] = true;
});

document.addEventListener("keyup", (e) => {
  const key = e.key === " " ? "space" : e.key.toLowerCase();
  keys[key] = false;
});
