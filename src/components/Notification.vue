<template>
  <div>
    <v-snackbar v-model="snackbar" color="info" top right>
      {{ message }}
      <v-btn flat fab color="red" @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",

  props: ["snackbar", "message"]
};
</script>

