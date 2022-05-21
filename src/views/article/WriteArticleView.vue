<template>
  <v-form
      ref="form"
      v-model="valid"
  >
    <v-text-field
        v-model="articleItem.title"
        label="제목"
        :rules="titleRules"
        required
        counter
    ></v-text-field>

    <v-textarea
        v-model="articleItem.content"
        label="내용"
        :rules="contentRules"
        required
        counter
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
        @click="clickBack"
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
    valid: false,
    articleItem: new ArticleItem(),
    titleRules: [
      (v: string) => !!v || '제목을 입력해주세요',
    ],
    contentRules: [
      (v: string) => !!v || '내용을 입력해주세요',
    ],
  }),
  methods: {
    async clickWrite() {
      // eslint-disable-next-line
      (this.$refs['form'] as any).validate();
      if (!this.valid) {
        return;
      }

      const data = {
        title: this.articleItem.title,
        content: this.articleItem.content
      };
      const res = await articles.a002(data);
      if (res.status === 201) {
        this.$router.push({name: 'Articles'});
      }
    },
    clickBack() {
      this.$router.back();
    }
  },
});
</script>