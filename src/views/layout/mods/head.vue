<template>
  <el-header class="flex flex_align">
    <div class="collapse" @click="collapse_menu()">
      <i v-if="!isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <ul class="browsing_history flex">
      <li v-for="(item, index) in list" :key="item.path">
        {{ item.meta && item.meta.title }}
        <span v-if="index != list.length-1 && item.name">/</span>
      </li>
    </ul>
    <div class="right item_flex right flex flex_right">
      <ul class="flex flex_align">
        <li><img src="~@/assets/images/logo.png" alt=""></li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </el-header>
</template>
<script >
import { mapGetters } from "vuex";
export default {
  name: "cHead",
  data: () => {
    return {
      isCollapse: false
    };
  },
  computed: {
     ...mapGetters(["userInfo"]),
    list() {
      return this.$route.matched;
    }
  },
  created() {},
  methods: {
    collapse_menu() {
      this.isCollapse = !this.isCollapse;
      this.$store.dispatch("set_collapse", this.isCollapse);
    },
    logOut() {
      this.$Cookies.remove("token");
      location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  // width: 100%;
  background-color: #333;
  color: #fff;
  .collapse {
    font-size: 24px;
    cursor: pointer;
  }
  .browsing_history {
    margin-left: 10px;
    font-size: 14px;
    span {
      margin: 0 5px;
    }
  }
  .right {
    font-size: 14px;
    li {
      &:nth-child(1) {
        margin-right: 10px;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 5px;
      }
    }
  }
}
/deep/.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>
