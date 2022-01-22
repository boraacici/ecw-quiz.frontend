<template>
    <div class="login-box">
      <span class="title">English Common Words Quiz</span>
      <form action="">
        <label class="name-label" for="fname">Fullname</label>
        <input class="name-input" type="text" placeholder="Enter your name" />
      </form>
      <div class="rules">
        <span class="rules-title">Rules</span>
        <span class="rule"
          >1. You will have only 15 seconds per each question.</span
        >
        <span class="rule">2. Choose the correct answer and send.</span>
        <span class="rule"
          >3. The quiz ends when the wrong answer is given or the time runs
          out.</span
        >
      </div>
      <div class="start-quiz">
        <button class="start-quiz-button">Start Quiz</button>
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    max-width: 509px;
    max-height: 649px;
    background: #ffffff;
    box-shadow: 0px 15px 40px 5px #ededed;
    border-radius: 30px;

    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    padding: 0 30px;

    .title {
      font-family: Poppins;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 45px;
      color: #000000;
    }
    form {
      width: 80%;
      display: inline-flex;
      flex-direction: column;

      .name-label {
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #696f79;
        margin-bottom: 12px;
      }
      .name-input {
        background: #ffffff;
        -webkit-appearance: none;
        box-shadow: 0px 15px 40px 5px #ededed;
        // border: 1px solid #8692A6;
        border-radius: 30px;
        border: none;

        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #8692a6;
        padding-left: 38px;
        padding-top: 22px;
        padding-bottom: 22px;
      }
    }
    .rules {
      max-width: 411px;
      display: inline-flex;
      flex-direction: column;

      .rules-title {
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 23px;
        line-height: 34px;
        color: #696f79;
      }
      .rule {
        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 37px;
        color: #8692a6;
      }
    }
    .start-quiz {
      width: 100%;
      display: inline-flex;
      justify-content: flex-end;

      .start-quiz-button {
        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 33px;
        color: #ffffff;

        background: #8692a6;
        border-radius: 30px;

        padding: 16px 51px;
        border: none;
        cursor: pointer;

        margin-right: 72px;
      }
    }
  }

  @media (hover: none) {
  .login-box {
    border-radius: 0;
    max-height: none;
  }
}
</style>
