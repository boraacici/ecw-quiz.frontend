<template>
  <div class="game">
    <div class="quiz-box">
      <header>
        <div class="total-point">Total Point <span>31</span></div>
        <timer />
      </header>
      <section>
        <div class="question">
          <span class="que-text">
            Here I've inserted question from JavaScript
          </span>
        </div>
        <div class="option-list">
          <span class="option">
            Here I've inserted options from JavaScript
          </span>
          <span class="option correct">
            Here I've inserted options from JavaScript
          </span>
          <span class="option">
            Here I've inserted options from JavaScript
          </span>
          <span class="option incorrect">
            Here I've inserted options from JavaScript
          </span>
        </div>
      </section>
      <div class="next-button-box">
        <button class="next-btn">Next Question</button>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "../component/Timer.vue";
export default {
  components: { Timer },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5765f2;
  .quiz-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total-point {
        font-size: 20px;
        font-weight: 600;
      }
    }
    section {
      .question {
        margin-top: 20px;
        margin-bottom: 10px;
        .que-text {
          font-size: 25px;
          font-weight: 600;
        }
      }
      .option-list {
        .option {
          background: aliceblue;
          border: 1px solid #84c5fe;
          border-radius: 5px;
          padding: 8px 15px;
          font-size: 17px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon {
            height: 26px;
            width: 26px;
            border: 2px solid transparent;
            border-radius: 50%;
            text-align: center;
            font-size: 13px;
            pointer-events: none;
            transition: all 0.3s ease;
            line-height: 24px;
          }
          .icon.tick {
            color: #23903c;
            border-color: #23903c;
            background: #d4edda;
          }
          .icon.cross {
            color: #a42834;
            background: #f8d7da;
            border-color: #a42834;
          }
        }
        .option:hover {
          color: #004085;
          background: #cce5ff;
          border: 1px solid #b8daff;
        }
        .option.correct {
          color: #155724;
          background: #d4edda;
          border: 1px solid #c3e6cb;
        }
        .option.incorrect {
          color: #721c24;
          background: #f8d7da;
          border: 1px solid #f5c6cb;
        }
        .option.disabled {
          pointer-events: none;
        }
      }
    }

    .next-button-box {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .next-btn {
        height: 40px;
        padding: 0 13px;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 5px;
        background: #007bff;
        border: 1px solid #007bff;
        line-height: 10px;
        pointer-events: none;
        transform: scale(0.95);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
