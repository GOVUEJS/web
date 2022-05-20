<template>
  <v-btn color="primary" @click="$router.push({name:'WriteArticle'})">글 쓰기</v-btn>

  <v-table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="header.value" class="text-left">
        {{ header.text }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in articleList" :key="item.id" @click.prevent="clickArticle(item)" style="cursor: pointer">
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.date }}</td>
    </tr>
    </tbody>
  </v-table>

  <v-pagination
      v-model="pagination.current"
      :length="pagination.total"
      :total-visible="8"
      @update:modelValue="changePage"
  ></v-pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import articles from '@/api/articles';
import { ArticleItem } from '@/model/model';

export default defineComponent({
  data: () => ({
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Title', value: 'title'},
      {text: 'Date', value: 'date'},
    ],
    articleList: [],
    pagination: {
      current: 1,
      total: 1,
    }
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {
        page: this.pagination.current
      };
      const res = await articles.a001(params);
      this.articleList = res.data.articleList;
      this.pagination.total = res.data.totalPage;
      this.pagination.current = res.data.current;
    },
    clickArticle(item: ArticleItem) {
      this.$router.push({name: 'ReadArticle', params: {id: item.id}});
    },
    changePage() {
      this.getData();
    }
  },
});
</script>