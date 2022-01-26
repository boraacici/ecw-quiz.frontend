<template>
  <div class="quiz-box">
    <div class="quiz-info-and-timer">
      <div class="quiz-info">
        <span class="title">Quiz</span>
        <span class="timer">{{ counter }}</span>
      </div>
      <span class="description">Answer the question below</span>
    </div>
    <div class="question-box">
      <span class="question-number">Question {{questionIndexes.length + 1}}</span>
      <span class="question">
        {{ questionDefinition }}
      </span>
    </div>
    <div class="answer-container">
      <!-- <span class="choose">Choose answer</span> -->
      <div
        class="answer-box"
        :style="{ opacity: answers.length === 4 ? 1 : 0 }"
      >
        <div class="radio-box">
          <label
            class="container"
            v-for="(answer, index) in answers"
            :key="index"
          >
            <span class="answer">{{ answer.word }}</span>
            <input
              type="radio"
              name="radio-answer"
              :value="answer"
              v-model="selectedAnswer"
            />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="secret-answer">
          <span class="secret-answer-text">Your Answer</span>
          <span class="secret-answer-text correct">Correct Answer</span>
          <span class="secret-answer-text">Your Answer</span>
          <span class="secret-answer-text">Your Answer</span>
        </div>
      </div>
    </div>
    <div class="send-answer">
      <button class="send-answer-button" @click="sendAnswer">
        Send Answer
      </button>
    </div>
  </div>
</template>

<script>
import {  getQuestionData } from '../core/db'
export default {
  data() {
    return {
      counter: 25,
      questionIndexes: [],
      questionIndex: null,
      answerIndexes: [],
      answers: [],
      selectedAnswer: '',
      timerInterval: undefined,
    }
  },
  props: ['username'],
  async mounted() {
    if (!this.username) {
      this.$router.push({ name: 'Start' })
    }

    this.next()
  },
  methods: {
    async next() {
      this.clearQuestionData();
      await this.getQuestion();
      this.startTimer();
    },
    sendAnswer(){
      // cevap dogru mu yanlis mi
      // dogruysa
      this.next();
      // yanlissa
      // go to leaderboard
    },
    async getQuestion() {
      this.questionIndex = this.createQuestionIndex()
      await this.getAnswers()
    },
    async getAnswers() {
      this.answerIndexes = [this.questionIndex]

      for (let i = 0; i < 3; i++) {
        this.answerIndexes.push(this.createAnswerIndex())
      }

      this.answers = await getQuestionData(this.answerIndexes)
      this.shuffle(this.answers);
    },
    createQuestionIndex() {
      let questionIndex = Math.floor(Math.random() * 2748)
      if (!this.questionIndexes.includes(questionIndex)) {
        return questionIndex
      } else {
        return this.createQuestionIndex()
      }
    },
    createAnswerIndex() {
      let answerIndex = Math.floor(Math.random() * 2748)

      if (!this.answerIndexes.includes(answerIndex)) {
        return answerIndex
      } else {
        return this.createAnswerIndex()
      }
    },
    timer() {
      if (this.counter) {
        this.counter = this.counter - 1
      } else if (this.counter == 0) {
        return this.counter
      }
    },
    startTimer() {
      if(this.timerInterval){
        clearInterval(this.timerInterval)
        this.counter = 25;
      }
      this.timerInterval = setInterval(this.timer, 1000)
    },
    clearQuestionData(){
      if (this.questionIndex) {
        this.questionIndexes.push(this.questionIndex);
      }
      this.answers = [];
      this.answerIndexes = [];
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ]
      }

      return array
    },
  },
  computed: {
    questionDefinition(){
      if(this.answers.length === 4){
        const question = this.answers.find(a => a.index === this.questionIndex);
        return question.definitions[0].definition;
      }else{
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.quiz-box {
  width: 100%;
  height: 100%;
  max-width: 509px;
  max-height: 649px;
  background: #ffffff;
  box-shadow: 0px 15px 40px 5px #ededed;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 30px;

  .quiz-info-and-timer {
    .quiz-info {
      display: flex;
      justify-content: space-between;
      .title {
        display: block;
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 33px;
        line-height: 49px;
        color: #696f79;
        margin-bottom: 10px;
      }
      .timer {
        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        font-size: 33px;
        line-height: 49px;
        color: #de6944;
      }
    }
    .description {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 22px;
      color: #696f79;
    }
  }
  .question-box {
    .question-number {
      display: block;
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 34px;
      color: #696f79;
      margin-bottom: 20px;
    }
    .question {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 22px;
      color: #696f79;
    }
  }
  .answer-container {
    .choose {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 34px;
      color: #696f79;
    }
    .answer-box {
      display: flex;
      width: 70%;
      justify-content: space-between;
      margin-top: 20px;

      .radio-box {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;

        /* The container */
        .container {
          display: block;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          font-family: Poppins;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 27px;
          letter-spacing: 0em;
          text-align: left;
          color: #696f79;
        }

        /* Hide the browser's default radio button */
        .container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        /* Create a custom radio button */
        .checkmark {
          position: absolute;
          top: 2px;
          left: 0;
          height: 17px;
          width: 17px;
          border: 2px solid #696f79;
          border-radius: 50%;
        }

        /* On mouse-over, add a grey background color */
        .container:hover input ~ .checkmark {
          background-color: #ccc;
        }

        /* When the radio button is checked, add a blue background */
        .container input:checked ~ .checkmark {
          background-color: #fff;
        }

        /* Create the indicator (the dot/circle - hidden when not checked) */
        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }

        /* Show the indicator (dot/circle) when checked */
        .container input:checked ~ .checkmark:after {
          display: block;
        }

        /* Style the indicator (dot/circle) */
        .container .checkmark:after {
          top: 4px;
          left: 4px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #696f79;
        }
      }
      .secret-answer {
        display: inline-flex;
        flex-direction: column;
        display: none;

        .secret-answer-text {
          font-family: Poppins;
          font-style: normal;
          font-weight: bold;
          font-size: 9px;
          transform-origin: center;
          transform: scale(2);
          line-height: 27px;
          color: #f24e1e;

          margin-bottom: 12px;

          &.correct {
            color: #08ad36;
          }
        }
      }
    }
  }
  .send-answer {
    width: 100%;
    display: inline-flex;
    justify-content: flex-end;

    .send-answer-button {
      font-family: Poppins;
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      color: #ffffff;

      background: #8692a6;
      border-radius: 30px;

      padding: 16px 32px;
      border: none;

      margin-right: 52px;
    }
  }
}

@media (hover: none) {
  .quiz-box {
    border-radius: 0;
    max-height: none;

    .send-answer {
      justify-content: center;

      .send-answer-button {
        margin: 0;
      }
    }
  }
}
</style>
