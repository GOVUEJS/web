<template>

  <v-card>
    <v-card-title>
      {{ articleItem.title }}
    </v-card-title>
    <v-card-subtitle>
      작성일: {{ articleItem.date }}
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text>
      <pre>{{ articleItem.content }}</pre>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn variant="outlined" @click="clickBack">
        뒤로가기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArticleItem } from '@/model/model';
import articles from '@/api/articles';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
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
    }
  },
});
</script>