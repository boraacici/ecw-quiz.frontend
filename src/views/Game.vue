<template>
  <div class="quiz-box">
    <div class="quiz-info-and-timer">
      <div class="quiz-info">
        <span class="title">Quiz</span>
        <span class="timer">{{ counter }}</span>
      </div>
      <span class="description">Find the right word</span>
    </div>
    <div class="question-box">
      <span class="question-number">
        {{ questionIndexes.length + 1 }}. Word
      </span>
      <span v-if="questionDefinition" class="question">
        {{ questionDefinition }}
      <i class="change-icon" @click="change"></i>
      </span>
      <span v-if="translatedWord" class="question question-translation">
      <img height="25" src="../assets/images/tr-flag.png" alt="turkish" />
        {{ translatedWord }}
      </span>
    </div>
    <div class="answer-container">
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
        <div class="secret-answer" v-if="isShowCorrect">
          <span
            class="secret-answer-text"
            :class="{ correct: answer.index === questionIndex }"
            :style="{
              opacity:
                answer.index === questionIndex ||
                answer.index === selectedAnswer.index
                  ? 1
                  : 0,
            }"
            v-for="(answer, index) in answers"
            :key="index"
          >
            {{
              answer.index === questionIndex ? "Correct Answer" : "Your Answer"
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="button-box" v-if="answers.length === 4" :key="questionDefinitions[definitionIndex] + 'button'">
      <button
        class="button go-leaderboard"
        v-show="isShowCorrect"
        @click="goLeaderboard"
      >
        Go to Leaderboard
      </button>
      <button
        class="button send-answer"
        v-show="!isShowCorrect"
        @click="sendAnswer"
      >
        Send Answer
      </button>
    </div>
  </div>
</template>

<script>
import { getQuestionData, addLeaderboard } from "../core/db";
import helper from "../utils/helper";
export default {
  data() {
    return {
      username: localStorage.username,
      counter: 25,
      questionIndexes: [],
      questionIndex: null,
      answerIndexes: [],
      answers: [],
      selectedAnswer: "",
      timerInterval: undefined,
      isShowCorrect: false,
      userData: undefined,
      definitionIndex: 0,
      translatedWordList: '',
      translatedWordIndex: 0,
    };
  },
  async mounted() {
    if (!this.username) {
      this.$router.push({ name: "Start" });
    }
    this.next();
  },
  methods: {
    async next() {
      this.clearQuestionData();
      await this.getQuestion();
      this.getTranslatedWord();
      this.startTimer();
    },
    sendAnswer() {
      if (this.selectedAnswer !== "") {
        if (this.selectedAnswer.index == this.questionIndex) {
          this.next();
        } else {
          this.stopTimer();
          this.isShowCorrect = true;
        }
      } else {
        return;
      }
    },
    async getQuestion() {
      this.questionIndex = this.createQuestionIndex();
      await this.getAnswers();
    },
    async getAnswers() {
      this.answerIndexes = [this.questionIndex];

      for (let i = 0; i < 3; i++) {
        this.answerIndexes.push(this.createAnswerIndex());
      }

      this.answers = await getQuestionData(this.answerIndexes);
      this.shuffle(this.answers);
    },
    createQuestionIndex() {
      let questionIndex = Math.floor(Math.random() * 2748);
      if (!this.questionIndexes.includes(questionIndex)) {
        return questionIndex;
      } else {
        return this.createQuestionIndex();
      }
    },
    createAnswerIndex() {
      let answerIndex = Math.floor(Math.random() * 2748);

      if (!this.answerIndexes.includes(answerIndex)) {
        return answerIndex;
      } else {
        return this.createAnswerIndex();
      }
    },
    timer() {
      if (this.counter) {
        this.counter = this.counter - 1;
      } else if (this.counter == 0) {
        this.timesUp();
        return this.counter;
      }
    },
    startTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.counter = 25;
      }
      this.timerInterval = setInterval(this.timer, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
    timesUp() {
      this.isShowCorrect = true;
    },
    clearQuestionData() {
      if (this.questionIndex) {
        this.questionIndexes.push(this.questionIndex);
      }
      this.answers = [];
      this.answerIndexes = [];
      this.translatedWordList = "";
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },
    async goLeaderboard() {
      let userScoreData = {
        username: this.username,
        score: this.questionIndexes.length,
      };
      this.userData = await addLeaderboard(userScoreData);
      localStorage.score = userScoreData.score;
      localStorage.scoreId = this.userData.id;
      this.$router.push({
        name: "LeaderBoard",
      });
    },
    change(){
      this.changeDefinition();
      this.changeTranslatedWord();
    },
    changeDefinition() {
      if (this.definitionIndex < this.questionDefinitions.length - 1) {
        this.definitionIndex++;
      } else {
        this.definitionIndex = 0;
      }
    },
    changeTranslatedWord() {
      if (this.translatedWordIndex < this.translatedWordList.length - 1) {
        this.translatedWordIndex++;
      } else
        this.translatedWordIndex = 0;
    },
    async getTranslatedWord() {
      const {word} = this.answers.find(
        (a) => a.index === this.questionIndex
      );
      const translation = await helper.translateWord(word, 'tr');
      this.translatedWordList = translation.def[0].tr.filter(t => t.fr === 10).flatMap(f => f.text);
    },
  },
  computed: {
    question(){
      return this.answers.length === 4 ? this.answers.find(
        (a) => a.index === this.questionIndex
      ) : {};
    },
    questionDefinitions() {
      return  this.question.definitions || [];
    },
    questionDefinition() {
      return this.questionDefinitions[this.definitionIndex]?.definition?.toLowerCase().replaceAll(this.question.word,"")
    },
    translatedWord() {
      return this.translatedWordList[this.translatedWordIndex]
    }
  },
};
</script>

<style>
.quiz-box {
	 width: 100%;
	 height: 100%;
	 max-width: 509px;
	 max-height: 649px;
	 background: #fff;
	 box-shadow: 0px 15px 40px 5px #ededed;
	 border-radius: 30px;
	 display: flex;
	 flex-direction: column;
	 padding: 0 30px;
	 padding-top: 40px;
	 box-sizing: border-box;
	 position: relative;
}
 .quiz-box .quiz-info-and-timer .quiz-info {
	 display: flex;
	 justify-content: space-between;
   align-items: center;
}
 .quiz-box .quiz-info-and-timer .quiz-info .title {
	 display: block;
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: bold;
	 font-size: 33px;
	 line-height: 49px;
	 color: #696f79;
	 margin-bottom: 10px;
}
 .quiz-box .quiz-info-and-timer .quiz-info .timer {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: normal;
	 font-size: 24px;
	 line-height: 49px;
	 color: #de6944;
   border: 1px solid red;
   border-radius: 50%;
   display: flex;
   justify-content: center;
   width: 49px;
}
 .quiz-box .quiz-info-and-timer .description {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: normal;
	 font-size: 20px;
	 line-height: 22px;
	 color: #696f79;
}
 .quiz-box .question-box {
	 margin-top: 25px;
}
 .quiz-box .question-box .question-number {
   position: relative;
	 display: block;
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: 600;
	 font-size: 23px;
	 line-height: 34px;
	 color: #696f79;
	 margin-bottom: 20px;
}
 .quiz-box .question-box .question {
  font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    color: #696f79;
    animation: showing 0.3s forwards;
    width: calc(100% - 40px);
    display: flex;
    column-gap: 8px;
    justify-content: space-between;
}
  .quiz-box .question-box .question.question-translation{
    margin-top: 4px;
    font-weight: 300;
    font-style: italic;
    justify-content: flex-start;
 }
 .quiz-box .answer-container {
	 margin-top: 50px;
}
 .quiz-box .answer-container .choose {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: 600;
	 font-size: 23px;
	 line-height: 34px;
	 color: #696f79;
}
 .quiz-box .answer-container .answer-box {
	 display: flex;
	 justify-content: space-between;
	 width: 70%;
}
 .quiz-box .answer-container .answer-box .radio-box {
	 display: inline-flex;
	 flex-direction: column;
	 align-items: flex-start;
	/* The container */
	/* Hide the browser's default radio button */
	/* Create a custom radio button */
	/* On mouse-over, add a grey background color */
	/* When the radio button is checked, add a blue background */
	/* Create the indicator (the dot/circle - hidden when not checked) */
	/* Show the indicator (dot/circle) when checked */
	/* Style the indicator (dot/circle) */
}
 .quiz-box .answer-container .answer-box .radio-box .container {
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
	 opacity: 0;
	 animation: showing 0.3s 0.3s forwards;
}
 .quiz-box .answer-container .answer-box .radio-box .container input {
	 position: absolute;
	 opacity: 0;
	 cursor: pointer;
}
 .quiz-box .answer-container .answer-box .radio-box .checkmark {
	 position: absolute;
	 top: 2px;
	 left: 0;
	 height: 17px;
	 width: 17px;
	 border: 2px solid #696f79;
	 border-radius: 50%;
}
 .quiz-box .answer-container .answer-box .radio-box .container:hover input ~ .checkmark {
	 background-color: #ccc;
}
 .quiz-box .answer-container .answer-box .radio-box .container input:checked ~ .checkmark {
	 background-color: #fff;
}
 .quiz-box .answer-container .answer-box .radio-box .checkmark:after {
	 content: "";
	 position: absolute;
	 display: none;
}
 .quiz-box .answer-container .answer-box .radio-box .container input:checked ~ .checkmark:after {
	 display: block;
}
 .quiz-box .answer-container .answer-box .radio-box .container .checkmark:after {
	 top: 4px;
	 left: 4px;
	 width: 9px;
	 height: 9px;
	 border-radius: 50%;
	 background: #696f79;
}
 .quiz-box .answer-container .answer-box .secret-answer {
	 display: inline-flex;
	 flex-direction: column;
}
 .quiz-box .answer-container .answer-box .secret-answer .secret-answer-text {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: bold;
	 font-size: 13px;
	 line-height: 27px;
	 color: #f24e1e;
	 margin-bottom: 12px;
}
 .quiz-box .answer-container .answer-box .secret-answer .secret-answer-text.correct {
	 color: #08ad36;
}
 .quiz-box .button-box {
	 width: 100%;
	 display: inline-flex;
	 justify-content: flex-end;
	 position: absolute;
	 bottom: 40px;
	 left: 0;
}
 .quiz-box .button-box .button {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: bold;
	 font-size: 22px;
	 line-height: 33px;
	 color: #fff;
	 background: #8692a6;
	 border-radius: 30px;
	 padding: 16px 32px;
	 border: none;
	 margin-right: 52px;
}
.change-icon {
  display: inline-block;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: url(../assets/icons/change.svg) no-repeat center;
  background-size: contain;
  flex-shrink: 0;
}
 @media screen and (max-width: 569px) {
	 .quiz-box {
		 border-radius: 0;
		 max-height: none;
		 padding-top: 20px;
	}
	 .quiz-box .question-box {
		 margin-top: 25px;
	}
	 .quiz-box .question-number {
		 margin-bottom: 20px !important;
	}
	 .quiz-box .answer-container {
		 margin-top: 25px;
	}
	 .quiz-box .button-box {
		 justify-content: center;
		 position: static;
		 margin-top: 25px;
		 opacity: 0;
		 animation: showing 0.3s 0.6s forwards;
	}
	 .quiz-box .button-box .button {
		 margin-right: 0;
		 font-size: 18px;
		 padding: 12px 26px;
	}
	 .question {
		 line-height: 22px !important;
	}
	 .answer-box {
		 width: 100% !important;
	}
}
 @media screen and (max-width: 569px) and (max-height: 667px) {
	 .quiz-box {
		 padding-top: 0px;
	}
	 .quiz-box .question-box {
		 margin-top: 15px;
	}
	 .quiz-box .question-number {
		 margin-bottom: 10px !important;
	}
	 .quiz-box .answer-container {
		 margin-top: 15px;
	}
	 .quiz-box .button-box {
		 margin-top: 15px;
	}
}
 @keyframes showing {
	 from {
		 opacity: 0;
		 transform: translate(0px, 20px);
	}
	 to {
		 opacity: 1;
		 transform: translate(0px, 0px);
	}
}
 
</style>
