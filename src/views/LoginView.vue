<template>
  <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
  >
    <v-text-field
        label="E-mail"
        v-model="email.value"
        :rules="email.rules"
        @keyup.enter="clickLogin"
        counter
        required

    ></v-text-field>

    <v-text-field
        label="Password"
        v-model="password.value"
        :rules="password.rules"
        :type="password.show ? 'text' : 'password'"
        @keyup.enter="clickLogin"
        counter
        required
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
import system from '@/api/system';
import { useStore } from '@/store';
import { VForm } from 'vuetify/components';

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store
    };
  },
  data: () => ({
    formValid: true,
    email: {
      value: '',
      rules: [
        (v: string) => !!v || '이메일을 입력해주세요.',
        (v: string) => /.+@.+\..+/.test(v) || '이메일이 유효하지 않습니다.',
      ]
    },
    password: {
      value: '',
      show: false,
      rules: [
        (v: string) => !!v || '패스워드를 입력해주세요.',
      ]
    },
  }),
  created() {
    this.store.logout();
  },
  methods: {
    async clickLogin() {
      this.validate();

      if (!this.formValid) {
        return;
      }

      const data = {
        email: this.email.value,
        pw: this.password.value
      };
      const res = await system.login(data);
      if (res.status !== 200) {
        return;
      }
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      this.store.setAccessToken(accessToken);
      this.store.setRefreshToken(refreshToken);

      this.$router.push({path: '/'});
    },
    validate() {
      (this.$refs.form as typeof VForm).validate();
    },
  },
});
</script>