<template>

  <v-card>
    <v-card-title>
      {{ articleItem.title }}
    </v-card-title>
    <v-card-subtitle>
      작성자: {{ articleItem.writer }}<br/>
      작성일: {{ articleItem.date }}
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <pre style="white-space: pre-wrap">
        {{ articleItem.content }}
      </pre>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn variant="outlined" @click="clickBack">
        뒤로가기
      </v-btn>
      <v-btn v-if="userStore.isLogin && userStore.email === articleItem.writer" color="primary" variant="outlined"
             @click="clickEdit">
        수정
      </v-btn>
      <v-btn v-if="userStore.isLogin && userStore.email === articleItem.writer" color="secondary" variant="outlined"
             @click="clickDelete">
        삭제
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArticleItem } from '@/model/model';
import articles from '@/api/articles';
import { useUserStore } from '@/store/user';

export default defineComponent({
  setup() {
    return {
      userStore: useUserStore(),
    };
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    articleItem: new ArticleItem(),
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await articles.a003(Number(this.id));
      this.articleItem = res.data.article;
    },
    clickBack() {
      this.$router.go(-1);
    },
    clickEdit() {
      this.$router.push({name: 'EditArticle', params: {id: this.id}});
    },
    async clickDelete() {
      const res = await articles.a005(Number(this.id));
      if (res.status === 204) {
        this.$router.push({name: 'Articles'});
      }
    },
  },
});
</script>