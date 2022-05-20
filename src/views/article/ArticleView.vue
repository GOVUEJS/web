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
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await articles.a001();
      this.articleList = res.data.articleList;
    },
    clickArticle(item: ArticleItem) {
      this.$router.push({name: 'ReadArticle', params: {id: item.id}});
    }
  },
});
</script>