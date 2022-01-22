<template>
  <div class="leader-board-container">
    <div class="leader-board-box">
      <div class="title">Leaderboard</div>
      <div class="leader-board-text">
        Congratulations Sadık ! Your score: <span class="bold">20</span>
      </div>
    </div>
    <table class="content-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <th>Cabbar el Hakim</th>
          <th>31</th>
        </tr>
        <tr>
          <th>2</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>3</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>4</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>5</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>6</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>7</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>8</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
        <tr>
          <th>...</th>
          <th>...</th>
          <th>...</th>
        </tr>
        <tr class="active-row">
          <th>99</th>
          <th>Kuntay</th>
          <th>31</th>
        </tr>
      </tbody>
    </table>
    <div class="try-again">
      <button class="try-again-button">Try Again</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.leader-board-container {
  width: 100%;
  height: 100%;
  max-width: 509px;
  max-height: 649px;
  background: #ffffff;
  box-shadow: 0px 15px 40px 5px #ededed;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  justify-content: space-evenly;

  .leader-board-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-family: Poppins;
      font-style: normal;
      font-weight: bold;
      font-size: 33px;
      line-height: 49px;
      color: #696f79;
      margin-bottom: 10px;
    }
    .leader-board-text {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 30px;
      color: #696f79;
      text-align: center;

      .bold {
        font-weight: bold;
      }
    }
  }

  .content-table {
    font-size: 16px;

    thead tr th {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 34px;
      color: #696f79;
    }
    tbody tr th {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 27px;
      color: #696f79;
    }

    th,
    td {
      padding: 3px 3px;
      font-weight: normal;
    }
    tbody tr.active-row {
      th {
        font-weight: bold;
      }
    }
  }
  .try-again {
    width: 100%;
    display: inline-flex;
    justify-content: flex-end;

    .try-again-button {
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
  .leader-board-container {
    border-radius: 0;
    max-height: none;
  }
}
</style>
