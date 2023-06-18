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
      <el-table-column label="词条类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.articleTypeName || "无" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.committer }}</span>
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
          <span>{{ $utils.formatTime(scope.row.commitTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核结果" align="center">
        <template slot-scope="scope">
          <span>{{
            {
              0: "待审核",
              1: "审核通过",
              2: "审核拒绝",
            }[scope.row.auditResult]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.auditor }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="审核时间"
        width="200px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{
            scope.row.auditTime ? $utils.formatTime(scope.row.auditTime) : "无"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span class="operation" @click="audit(scope.row)">审核</span>
          <!-- <span @click="detail(scope.row)">详情</span> -->
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
    <el-dialog :visible.sync="visible" title="词条审核">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="拒绝原因" prop="refuseReason">
          <el-input v-model="form.refuseReason" />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="pass">通过</el-button>
        <el-button @click="reject">拒绝</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { articleGetArticleList, articleAudit } from "@/api/table";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      visible: false,
      form: {
        articleId: "",
        refuseReason: "",
      },
      pageBean: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      currentPage: 4,
      rules: {
        refuseReason: [
          {
            required: true,
            message: "请填写拒绝原因",
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
    audit(row) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form.articleId = row.articleId;
      });
    },
    pass() {
      articleAudit({
        ...this.form,
        auditResult: 1,
      }).then(() => {
        this.$message.success('操作成功');
        this.fetchData();
      }).finally(() => {
        this.visible = false;
      });
    },
    reject() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          articleAudit({
            ...this.form,
            auditResult: 2,
          }).then(() => {
            this.$message.success('操作成功');
            this.fetchData();
          }).finally(() => {
            this.visible = false;
          });
        }
      });
    },
    fetchData() {
      this.listLoading = true;
      articleGetArticleList(this.pageBean)
        .then((res) => {
          const { row, result } = res;
          this.list = result;
          this.pageBean.total = row;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    articleAudit() {
      articleAudit().then((res) => {});
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
