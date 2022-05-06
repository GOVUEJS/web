<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="id"
      :sort-desc="true"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialogVisible"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.content"
                        label="Content"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          @click="clickEdit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="getData"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import articles from '@/api/articles';

export default {
  data: () => ({
    dialogVisible: false,
    dialogDelete: false,
    headers: [
      {text: 'id', value: 'id'},
      {text: 'title', value: 'title'},
      {text: 'date', value: 'date'},
      {text: 'Actions', value: 'actions', sortable: false},
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
      this.desserts = res.data;
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