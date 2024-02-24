<template>
  <div class="leader-board-container">
    <div class="leader-board-box">
      <div class="title">Leaderboard</div>
      <div class="leader-board-text">
        Congratulations
        <span class="bold">{{ userData.username }}</span>
        ! Your score:
        <span class="bold">{{ userData.score }}</span>
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
        <tr
          :class="{ 'active-row': user.id === userData.id }"
          v-for="(user, index) in top5Scores"
          :key="index"
        >
          <th>{{ index + 1 }}</th>
          <th>{{ user.username }}</th>
          <th>{{ user.score }}</th>
        </tr>
        <tr v-if="!isUserTop5">
          <th>...</th>
          <th>...</th>
          <th>...</th>
        </tr>
        <tr class="active-row" v-if="!isUserTop5">
          <th></th>
          <th>{{ this.userData.username }}</th>
          <th>{{ this.userData.score }}</th>
        </tr>
      </tbody>
    </table>
    <div class="try-again">
      <button class="button" @click="tryAgain">Try Again</button>
    </div>
  </div>
</template>

<script>
import { getTop5Score } from "../core/db";
export default {
  name: "Leaderboard",
  data() {
    return {
      top5Scores: undefined,
      isUserTop5: false,
    };
  },
  props: ["userData"],
  methods: {
    tryAgain() {
      this.$router.push({
        name: "Game",
        params: {
          username: localStorage.username,
        },
      });
    },
  },
  async created() {
    if (!this.userData) {
      this.$router.push({
        name: "Start",
      });
    }

    this.top5Scores = await getTop5Score();

    if (this.top5Scores.indexOf((doc) => doc.id === this.userData.id) !== -1) {
      this.isUserTop5 = true;
    }
  },
};
</script>

<style scoped>
.leader-board-container {
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
	 justify-content: space-evenly;
}
 .leader-board-container .leader-board-box {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
}
 .leader-board-container .leader-board-box .title {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: bold;
	 font-size: 33px;
	 line-height: 49px;
	 color: #696f79;
	 margin-bottom: 10px;
}
 .leader-board-container .leader-board-box .leader-board-text {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: normal;
	 font-size: 20px;
	 line-height: 22px;
	 color: #696f79;
	 text-align: center;
}
 .leader-board-container .leader-board-box .leader-board-text .bold {
	 font-weight: bold;
}
 .leader-board-container .content-table {
	 font-size: 16px;
}
 .leader-board-container .content-table thead tr th {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: 600;
	 font-size: 23px;
	 line-height: 34px;
	 color: #696f79;
}
 .leader-board-container .content-table tbody tr th {
	 font-family: Poppins;
	 font-style: normal;
	 font-weight: normal;
	 font-size: 18px;
	 line-height: 23px;
	 color: #696f79;
}
 .leader-board-container .content-table th, .leader-board-container .content-table td {
	 padding: 3px 3px;
	 font-weight: normal;
}
 .leader-board-container .content-table tbody tr.active-row th {
	 font-weight: bold;
}
 .leader-board-container .try-again {
	 width: 100%;
	 display: inline-flex;
	 justify-content: space-around;
}
 .leader-board-container .try-again .button {
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
}
 @media screen and (max-width: 569px) {
	 .leader-board-container {
		 border-radius: 0;
		 max-height: none;
	}
	 .leader-board-container .try-again {
		 justify-content: center;
	}
	 .button {
		 margin-right: 0;
		 font-size: 18px !important;
		 padding: 12px 26px !important;
	}
}
 
</style>
