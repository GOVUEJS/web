<template>
  <v-form
      ref="form"
      v-model="formValid"
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
      수정
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
import { VForm } from 'vuetify/components';


export default defineComponent({
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  data: () => ({
    formValid: false,
    articleItem: new ArticleItem(),
    titleRules: [
      (v: string) => !!v || '제목을 입력해주세요',
    ],
    contentRules: [
      (v: string) => !!v || '내용을 입력해주세요',
    ],
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await articles.a003(Number(this.id));
      this.articleItem = res.data.article;
    },
    async clickWrite() {
      (this.$refs['form'] as typeof VForm).validate();
      if (!this.formValid) {
        return;
      }

      const data = {
        title: this.articleItem.title,
        content: this.articleItem.content,
      };
      const res = await articles.a004(this.id, data);
      if (res.status === 200) {
        this.$router.push({name: 'ReadArticle', params: {id: this.id}});
      }
    },
    clickBack() {
      this.$router.back();
    },
  },
});
</script>