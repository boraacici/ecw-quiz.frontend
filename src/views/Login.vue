<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">Welcome</h1>
      <form>
        <label for="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name.."
        />

        <label for="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Country"
        />
        <input type="submit" value="LOGIN" />
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5765f2;
}

h1{
  color: #fff;
}

.login-box {
  padding: 60px;
  background: #36393e;
  border-radius: 10px;
  max-width: 375px;
  box-sizing: border-box;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-top: 10px;
}

form {
  margin-top: 10px;
}
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4752c4;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
label{
  color: #B8BBBE;
  font-size: 16px;
}
</style>
