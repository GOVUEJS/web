<template>
  <v-table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="header.value" class="text-left">
        {{ header.text }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in desserts"
        :key="item.id"
    >
      <td>{{ item.id }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.date }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import articles from '@/api/articles';

export default {
  data: () => ({
    dialogVisible: false,
    dialogDelete: false,
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Title', value: 'title'},
      {text: 'Date', value: 'date'},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      content: '',
    },
    defaultItem: {
      title: '',
      content: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const res = await articles.a001();
      this.desserts = res.data.articleList;
    },

    async clickEdit(item) {
      this.editedIndex = item.id;
      this.editedItem.title = item.title;
      this.editedItem.content = item.content;
      this.dialogVisible = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const res = await articles.a005(this.editedIndex);
      console.log(res);
      this.closeDelete();
      await this.getData();
    },
    initEditedItem() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    close() {
      this.dialogVisible = false;
      this.initEditedItem();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.initEditedItem();
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateArticle();
      } else {
        this.createArticle();
      }
      this.close();
    },
    async createArticle() {
      const res = await articles.a002(this.editedItem);
      console.log(res);
      await this.getData();
    },
    async updateArticle() {
      const res = await articles.a004(this.editedIndex, this.editedItem);
      console.log(res);
      await this.getData();
    },
  },
};
</script>