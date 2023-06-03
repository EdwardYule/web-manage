<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      height="600px"
    >
      <el-table-column label="词条标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人联系方式" align="center">
        <template slot-scope="scope">
          <span>邮箱：{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="提交时间"
        width="200px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放结果" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="发放时间"
        width="200px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span class="operation" @click="issue(scope.row)">发放</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="visible" title="奖励发放">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="口令红包" prop="content">
          <el-input v-model="form.content" />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { articleGetArticleList } from "@/api/table";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 4,
      form: {
        content: "",
      },
      visible: false,
      rules: {
        content: [
          {
            required: true,
            message: "请填写口令红包",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    issue() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    fetchData() {
      this.listLoading = true;
      articleGetArticleList({
        articleTypeId: '',
        page: 0,
        pageSize: 0,
      }).then((response) => {
        this.list = response.data.items;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false;
          console.log("confirm");
        }
      });
    },
    cancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  color: blue;
  cursor: pointer;
  margin-right: 8px;
}
.footer {
  text-align: right;
  margin-top: 16px;
}
</style>
