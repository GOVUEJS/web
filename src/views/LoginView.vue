<template>
  <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
  >
    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-text-field
        v-model="password.value"
        :rules="[password.rules.required, password.rules.min]"
        :type="password.show ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        counter
    >
      <template v-slot:append>
        <v-icon @click="password.show = !password.show">
          <template v-if="password.show">mdi-eye</template>
          <template v-else>mdi-eye-off</template>
        </v-icon>
      </template>
    </v-text-field>

    <v-btn
        color="success"
        @click="clickLogin"
        block
    >
      LOG IN
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    formValid: true,
    email: '',
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: {
      value: '',
      show: false,
      rules: {
        required: (value: string) => !!value || 'Required.',
        min: (v: string) => v.length >= 8 || 'Min 8 characters',
      }
    },
  }),

  methods: {
    clickLogin() {
      this.validate();

      if (!this.formValid) {
        return;
      }

      this.$router.push({name: 'Articles'});
    },
    validate() {
      // eslint-disable-next-line
      (this.$refs.form as any).validate();
    },
  },
});
</script>