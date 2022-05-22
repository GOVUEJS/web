<template>
  <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
  >
    <v-text-field
        v-model="user.email"
        :rules="rules.email"
        label="E-mail"
        required
    ></v-text-field>

    <v-text-field
        v-model="user.pw"
        :append-icon="show.pw ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.pw"
        :type="show.pw ? 'text' : 'password'"
        label="비밀번호"
        counter
        @click:append="show.password = !show.pw"
    ></v-text-field>

    <v-text-field
        v-model="user.pwChk"
        :append-icon="show.pwChk ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.pwChk"
        :type="show.pwChk ? 'text' : 'password'"
        label="비밀번호 확인"
        counter
        @click:append="show.passwordCheck = !show.pwChk"
    ></v-text-field>

    <v-btn
        :disabled="!formValid"
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
import { defineComponent } from 'vue';
import { VForm } from 'vuetify/components';
import system from '@/api/system';


export default defineComponent({
  data: () => ({
    formValid: true,
    user: {
      email: '',
      pw: '',
      pwChk: '',
    },
    show: {
      pw: false,
      pwChk: false,
    },
  }),
  computed: {
    rules() {
      return {
        email: [
          (value: string) => !!value || 'E-mail is required',
          (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
        ],
        pw: [
          (value: string) => !!value || 'Required.',
          (value: string) => value.length >= 8 || 'Min 8 characters',
        ],
        pwChk: [
          (value: string) => !!value || 'Required.',
          (value: string) => value.length >= 8 || 'Min 8 characters',
          () => this.user.pw === this.user.pwChk ? true : (`The email and password you entered don't match`)
        ],
      };
    }
  },
  methods: {
    async clickSubmit() {
      (this.$refs.form as typeof VForm).validate();

      if (!this.formValid) {
        return;
      }

      const data = {
        ...this.user
      };
      const res = await system.signup(data);
      if (res.status !== 201) {
        return;
      }

      this.$router.push({name: 'Login'});
    },
    clickReset() {
      (this.$refs.form as typeof VForm).reset();
    },
  },
});
</script>