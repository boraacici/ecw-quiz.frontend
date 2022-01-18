<template>
  <div class="leader-board-container">
    <div class="emty">
      <div class="leader-board-box">
        <h1 class="title">LEADER BOARD</h1>
        <table class="content-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Country</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>Cabbar el Hakim</th>
              <th>Turkey</th>
              <th>31</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>2</th>
              <th>Kuntay</th>
              <th>Turkey</th>
              <th>31</th>
            </tr>
          </tbody>
          <tbody>
            <tr class="active-row">
              <th>3</th>
              <th>Kuntay</th>
              <th>Turkey</th>
              <th>31</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>4</th>
              <th>Kuntay</th>
              <th>Turkey</th>
              <th>31</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.leader-board-container {
  width: 100%;
  height: 100vh;
  background-color: #5765f2;
  display: flex;
  justify-content: center;
  align-items: center;

  .leader-board-box {
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: #404EED;
    }

    .content-table {
      border-collapse: collapse;
      margin: 25px;
      font-size: 16px;
      min-width: 375px;
      border-left: 1px solid #dddddd;
      border-right: 1px solid #dddddd;

      thead tr {
        background-color: #404EED;
        color: #fff;
      }
      th,
      td {
        padding: 12px 15px;
        font-weight: normal;
      }
      tbody tr {
        border-bottom: 1px solid #dddddd;
      }
      tbody:nth-of-type(even) {
        background-color: #f3f3f3;
      }
      tbody tr.active-row {
        color: #404EED;
        th{
            font-weight: bold;
        }
      }
    }
  }
}
</style>
