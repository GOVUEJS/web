<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="user.email"
        :rules="rules.email"
        label="E-mail"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.password"
        :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.password.required, rules.password.min]"
        :type="show.password ? 'text' : 'password'"
        label="비밀번호"
        hint="At least 8 characters"
        counter
        @click:append="show.password = !show.password"
    ></v-text-field>

    <v-text-field
        v-model="user.passwordCheck"
        :append-icon="show.passwordCheck ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.password"
        :type="show.passwordCheck ? 'text' : 'password'"
        label="비밀번호 확인"
        hint="At least 8 characters"
        counter
        @click:append="show.passwordCheck = !show.passwordCheck"
    ></v-text-field>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="clickSubmit"
    >
      회원가입
    </v-btn>

    <v-btn
        class="mr-4"
        @click="clickReset"
    >
      초기화
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VForm } from "vuetify/lib/components";

export default defineComponent({
  data: () => ({
    valid: true,
    user: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    rules: {
      email: [
        (value: string) => !!value || 'E-mail is required',
        (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],
      password: [
        (value: string) => !!value || 'Required.',
        (value: string) => value.length >= 8 || 'Min 8 characters',
        () => (`The email and password you entered don't match`),
      ],
    },
    show: {
      password: false,
      passwordCheck: false,
    },
  }),
  methods: {
    clickSubmit() {
      (this.$refs.form as typeof VForm).validate();
    },
    clickReset() {
      (this.$refs.form as typeof VForm).reset();
    },
  },
});
</script>