<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="15"
  ></v-data-table>
</template>
<script>
import articles from '@/api/articles';

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      headers: [
        {text: 'id', value: 'Id'},
        {text: 'title', value: 'Title'},
        {text: 'date', value: 'UpdatedAt'},
      ],
      desserts: [],
    };
  },
  methods: {
    async getData() {
      const res = await articles.a001();
      this.desserts = res.data;
    },
  },
};
</script>