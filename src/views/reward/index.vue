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
      <el-table-column label="词条标题" align="center" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.committer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人联系方式" align="center" width="200">
        <template slot-scope="scope">
          <span>邮箱：{{ scope.row.committerEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ $utils.formatTime(scope.row.commitTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放结果" align="center">
        <template slot-scope="scope">
          <span>{{
            {
              null: "待发放",
              1: "已发放",
            }[scope.row.rewardResult]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.auditor }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发放时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ $utils.formatTime(scope.row.auditTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span class="operation" @click="issue(scope.row)">发放</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination
        :current-page="pageBean.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageBean.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageBean.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="visible" title="奖励发放">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="口令红包" prop="alipayRedPacketPassword">
          <el-input v-model="form.alipayRedPacketPassword" />
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
import {
  articleGetAuditedArticleList,
  articleSendAlipayRedPacketPassword,
} from "@/api/table";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      pageBean: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      form: {
        alipayRedPacketPassword: "",
        articleId: "",
      },
      visible: false,
      rules: {
        alipayRedPacketPassword: [
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
      this.pageBean.pageSize = val;
      this.pageBean.page = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pageBean.page = val;
      this.fetchData();
    },
    issue(row) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form.articleId = row.articleId;
      });
    },
    fetchData() {
      this.listLoading = true;
      articleGetAuditedArticleList(this.pageBean)
        .then((res) => {
          const { row, result } = res;
          this.pageBean.total = row;
          this.list = result;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          articleSendAlipayRedPacketPassword(this.form)
            .then(() => {
              this.$message.success('操作成功');
              this.fetchData();
            })
            .finally(() => {
              this.visible = false;
            });
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
