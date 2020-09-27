<template>
  <div class="home">
    list
    <input type="text">
  </div>
</template>

<script>
import { statistics } from "@/api/home/home.js";
export default {
  components: {},
  created() {},
  mounted() {
    // this.getData();
  },
  methods: {
    getData() {
      statistics()
        .then(res => {
          // 这里保证都是成功 200
          this.loading = false;
        })
        .catch(err => {
          // 报错或者 后端提示不是200
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>
