<template>
  <div>
      <p>英雄列表</p>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="title" label="称号"></el-table-column>
        
        <el-table-column prop="avator" label="头像">
        <template slot-scope="scope">
          <span>
            <img :src="scope.row.avator" style="height: 3rem">
          </span>
        </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
        <el-button type="text" size="small"
        @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small"
        @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('rest/heroes')
            this.items = res.data
        },
        async remove(row) {
             this.$confirm(`是否确定删除物品?"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const res = this.$http.delete(`rest/heroes/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
          this.fetch()

        }
    }
}
</script>

<style>

</style>