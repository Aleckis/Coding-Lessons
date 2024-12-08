$(document).ready(function () {
    const breakLabel = $("#break-length");
    const sessionLabel = $("#session-length");
  
    let breakLength = parseInt(breakLabel.text());
    let sessionLength = parseInt(sessionLabel.text());
    let isTimerRunning = false;
    let isPaused = false;
    let originalTime = 0;
    let isBreakTime = false;
    let controller = new AbortController();
  
    function updateTimer(time) {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (time !== 0) {
        $("#time-left").text(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      } else {
        $("#time-left").text("00:00");
      }
    }
  
    async function countdownSession(time) {
      controller.abort();
      controller = new AbortController();
      const { signal } = controller;
  
      $("#timer-label").text("Session");
      originalTime = time;
      isBreakTime = false;
  
      while (time >= 0 && isTimerRunning) {
        if (signal.aborted) return;
        if (isPaused) {
          await new Promise((resolve) => {
            const checkPause = setInterval(() => {
              if (isPaused === false) {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }
        updateTimer(time);
        time--;
  
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
  
      if (time < 0) {
        $("#beep")[0].play();
        $("#timer-label").text("Break");
        updateTimer(breakLength * 60);
        countdownBreak(breakLength * 60);
      }
    }
  
    async function countdownBreak(time) {
      controller.abort();
      controller = new AbortController();
      const { signal } = controller;
  
      isBreakTime = true;
      originalTime = time;
  
      while (time >= 0 && isTimerRunning) {
        if (signal.aborted) return;
        if (isPaused) {
          await new Promise((resolve) => {
            const checkPause = setInterval(() => {
              if (isPaused === false) {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }
  
        updateTimer(time);
        time--;
  
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
  
      if (time < 0) {
        $("#beep")[0].play();
        $("#timer-label").text("Session");
        updateTimer(sessionLength * 60);
        countdownSession(sessionLength * 60);
      }
    }
  
    $("#break-increment").on("click", function () {
      if ((!isTimerRunning || isPaused) && breakLength < 60) {
        breakLength++;
        breakLabel.text(breakLength);
      }
    });
  
    $("#break-decrement").on("click", function () {
      if ((breakLength > 1 && !isTimerRunning) || isPaused) {
        breakLength--;
        breakLabel.text(breakLength);
      }
    });
  
    $("#session-increment").on("click", function () {
      if ((!isTimerRunning || isPaused) && sessionLength < 60) {
        sessionLength++;
        sessionLabel.text(sessionLength);
        updateTimer(sessionLength * 60);
      }
    });
  
    $("#session-decrement").on("click", function () {
      if ((sessionLength > 1 && !isTimerRunning) || isPaused) {
        sessionLength--;
        sessionLabel.text(sessionLength);
        updateTimer(sessionLength * 60);
      }
    });
  
    $("#start_stop").on("click", function () {
      if (!isTimerRunning) {
        isTimerRunning = true;
        if (isBreakTime) {
          countdownBreak(breakLength * 60);
        } else {
          countdownSession(sessionLength * 60);
        }
      } else if (isPaused === false) {
        isPaused = true;
      } else if (originalTime === sessionLength * 60 || originalTime === breakLength * 60) {
        isPaused = false;
      } else {
        if (isBreakTime) {
          countdownBreak(breakLength * 60);
        } else {
          countdownSession(sessionLength * 60);
        }
      }
    });
  
    $("#reset").on("click", function () {
      controller.abort();
      $("#beep")[0].pause();
      $("#beep")[0].currentTime = 0;
      breakLength = 5;
      sessionLength = 25;
      breakLabel.text(`${breakLength}`);
      sessionLabel.text(`${sessionLength}`);
      $("#timer-label").text("Session");
      updateTimer(sessionLength * 60);
      isTimerRunning = false;
      isPaused = false;
      isBreakTime = false;
    });
  });
  