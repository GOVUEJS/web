<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="articleItem.title"
        label="제목"
        required
    ></v-text-field>

    <v-textarea
        v-model="articleItem.content"
        label="내용"
        required
    ></v-textarea>

    <v-btn
        color="success"
        class="mr-4"
        @click="clickWrite"
    >
      작성
    </v-btn>

    <v-btn
        color="error"
        variant="outlined"
        @click="clickCancle"
    >
      뒤로가기
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArticleItem } from '@/model/model';
import articles from '@/api/articles';

export default defineComponent({
  data: () => ({
    articleItem: new ArticleItem(),
    valid: true,
    name: '',
    email: '',
    select: null,
    checkbox: false,
  }),
  methods: {
    async clickWrite() {
      const data = {
        title: this.articleItem.title,
        content: this.articleItem.content
      };
      const res = await articles.a002(data);
      if (res.status === 200) {
        this.$router.push({name: 'Articles'});
      }
    },
    clickCancle() {
      this.$router.back();
    }
  },
});
</script>