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
        v-model="pw.value"
        :rules="pw.rules"
        :type="pw.show ? 'text' : 'password'"
        @keyup.enter="clickLogin"
        counter
        required
    >
      <template v-slot:append>
        <v-icon @click="pw.show = !pw.show">
          <template v-if="pw.show">mdi-eye</template>
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
    <br>
    <v-btn
        @click="clickSignUp"
        block
    >
      회원가입
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import system from '@/api/system';
import { useStore } from '@/store';
import { VForm } from 'vuetify/components';
import { useUserStore } from '@/store/user';

export default defineComponent({
  setup() {
    const store = useStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
    };
  },
  data: () => ({
    formValid: true,
    email: {
      value: '',
      rules: [
        (v: string) => !!v || '이메일을 입력해주세요.',
        (v: string) => /.+@.+\..+/.test(v) || '이메일이 유효하지 않습니다.',
      ],
    },
    pw: {
      value: '',
      show: false,
      rules: [
        (v: string) => !!v || '패스워드를 입력해주세요.',
      ],
    },
  }),
  created() {
    this.userStore.logout();
  },
  methods: {
    async clickLogin() {
      this.validate();

      if (!this.formValid) {
        return;
      }

      const data = {
        email: this.email.value,
        pw: this.pw.value,
      };
      const res = await system.login(data);
      if (res.status !== 200) {
        return;
      }
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      this.userStore.setAccessToken(accessToken);
      this.userStore.setRefreshToken(refreshToken);
      this.userStore.setEmail(this.email.value);

      this.$toast.success('로그인 성공.');
      this.$router.push({path: '/'});
    },
    validate() {
      (this.$refs.form as typeof VForm).validate();
    },
    clickSignUp() {
      this.$router.push({name: 'SignUp'});
    },
  },
});
</script>