<script lang="ts" setup>
const account = ref();
const password = ref();
const error = ref("");
const token = ref("");
const tokenPwd = ref("");
const route = useRoute();
const router = useRouter();
onMounted(() => {
  token.value = localStorage.getItem("token") || "";
  tokenPwd.value = localStorage.getItem("tokenpwd") || "";
});
const submit = async () => {
  console.log(account.value);
  console.log(password.value);
  if (!account.value || !password.value) {
    error.value = "Username and password are required";
    return;
  }
  const req = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: account.value,
      password: password.value,
    }),
  });
  const res = await req.json();
  if (res.error) {
    error.value = res.error;
  }
  localStorage.setItem("token", res.token);
  localStorage.setItem("tokenpwd", res.password);
  token.value = res.token;
  tokenPwd.value = res.password;
};
const myDevices = () => {
  router.push("/devices");
};
</script>
<template>
  <h1>Login</h1>
  <input type="text" v-model="account" />
  <input type="password" v-model="password" />
  <button @click="submit">Submit</button>
  <p>Error: {{ error }}</p>
  <p>Key: {{ token }}</p>
  <p>Pwd: {{ tokenPwd }}</p>
  <p>Get Devices: <button @click="myDevices">Go</button></p>
</template>
