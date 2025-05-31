<script lang="ts" setup>
const token = ref("");
const tokenPwd = ref("");
const devices = ref();
const router = useRouter();
onMounted(() => {
  token.value = localStorage.getItem("token") || "";
  tokenPwd.value = localStorage.getItem("tokenpwd") || "";
  if (!token.value && !tokenPwd.value) {
    router.push("/");
  }
  getDevices();
});
const getDevices = async () => {
  const req = await fetch("/api/myDevices");
  const res = await req.json();
  devices.value = res.myDeviceList;
  console.log(res.myDeviceList);
};
const unlockDoor = async (door: string) => {
  const req = await fetch(`/api/door/unlock/${door}`);
  const res = await req.text();
  console.log(res);
  void res;
};
const lockDoor = async (door: string) => {
  const req = await fetch(`/api/door/lock/${door}`);
  const res = await req.text();
  console.log(res);
  void res;
};
</script>
<template>
  <h1>Devices</h1>
  <div v-for="item in devices">
    <p>Device ID: {{ item.myDeviceId }}</p>
    <p>Device Member ID: {{ item.myDeviceMemberId }}</p>
    <p>Device Reg Device ID: {{ item.myDeviceRegDeviceId }}</p>
    <p>Serial Number: {{ item.regDeviceSerialNo }}</p>
    <p>App Key?: {{ item.regDeviceAppKey }}</p>
    <p>Broker ID?: {{ item.regDeviceBrokerId }}</p>
    <p>Device Nickname: {{ item.myDeviceNickName }}</p>
    <p>Device Maker?: {{ item.myDeviceMakerName }}</p>
    <p>Device Model: {{ item.myDeviceModelName }}</p>
    <div style="display: flex; flex-direction: row">
      <button @click="() => unlockDoor(item.myDeviceId)">Unlock Door</button>
      <button @click="() => lockDoor(item.myDeviceId)">Close Door</button>
    </div>
  </div>
</template>
