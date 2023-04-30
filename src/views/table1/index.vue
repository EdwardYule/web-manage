<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="词条标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="词条类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="提交时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核结果" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="审核时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span class="operation" @click="audit(scope.row)">审核</span>
          <!-- <span @click="detail(scope.row)">详情</span> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" title="词条审核">
      <el-form :model="form">
        <el-form-item label="拒绝原因">
          <el-input v-model="form.reason" />
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
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      visible: false,
      form: {
        reason: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    audit() {
      this.visible = true
    },
    pass(){
      this.visible = false;
    },
    reject(){
      this.visible = false;
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
  color: blue;
  cursor: pointer;
  margin-right: 8px;
}
</style>
