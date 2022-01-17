<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        <path
          ref="timerPath"
          id="base-timer-path-remaining"
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">{{ timeLeft }}</span>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      FULL_DASH_ARRAY: 283,
      COLOR_CODES: {
        info: {
          color: "green",
          threshold: 20,
        },
        warning: {
          color: "orange",
          threshold: 10,
        },
        alert: {
          color: "red",
          threshold: 5,
        },
      },
      TIME_LIMIT: 31,
      timePassed: 0,
      timeLeft: 31,
      timerInterval: null,
      remainingPathColor: "green",
      circleDasharray: "283 283",
    };
  },
  mounted() {
    this.startTimer();
    // this.$parent.$on("stopTimer", this.onTimesUp);
    // this.$parent.$on("refreshTimer", this.refreshTimer);
  },
  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval);
    },
    setCircleDasharray() {
      this.circleDasharray = `${(
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
    },
    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
      return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    },
    startTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
        // this.$store.commit("setTimeleft", this.timeLeft);

        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0) {
          this.onTimesUp();
        }
      }, 1000);
    },
    setRemainingPathColor(timeLeft) {
      const { alert, warning, info } = this.COLOR_CODES;
      if (timeLeft <= info.threshold) {
        this.remainingPathColor = info.color;
      }
      if (timeLeft <= alert.threshold) {
        this.remainingPathColor = alert.color;
      } else if (timeLeft <= warning.threshold) {
        this.remainingPathColor = warning.color;
      }
    },
    refreshTimer() {
      this.timeLeft = 2000;
      this.timePassed = 0;
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);
      this.$refs.timerPath.style.transition = "none";
      setTimeout(() => {
        this.$refs.timerPath.style.transition = "1s linear all";
      }, 1000);
      this.startTimer();
    },
  },
};
</script>
<style>
.base-timer {
  position: relative;
  width: 60px;
  height: 60px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}
</style>
