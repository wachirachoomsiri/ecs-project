<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div class="box-border bg-white h-auto w-96 p-4 rounded-md shadow-2xl">
                <h1 class="title is-4 has-text-centered">
                    <b-icon icon="account-arrow-right" size="is-small">
                    </b-icon> เข้าสู่ระบบ
                </h1>
                <form @submit.prevent="login_func">
                    <b-field>
                        <b-input v-model="login.email" placeholder="อีเมล" type="email" icon="email" autocomplete="email" required>
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="login.password" placeholder="รหัสผ่าน" icon="key" type="password" minlength="8"
                            maxlength="32" password-reveal :has-counter="false" required>
                        </b-input>
                    </b-field>

                    <div class="buttons">
                        <b-button native-type="submit" type="is-primary" expanded>เข้าสู่ระบบ</b-button>
                    </div>

                </form>
                <hr class="mt-3 mb-3">
                <p class="has-text-centered">
                    ยังไม่ได้ลงทะเบียน <NuxtLink to="/auth/register">ลงทะเบียน</NuxtLink>
                </p>

            </div>
        </div>
    </section>
</template>
<script>
export default {
    auth: 'guest',
    data() {
        return {
            login: {
                email: null,
                password: null,
            }
        }
    },
    methods: {
        async login_func() {
            const loadingComponent = this.$buefy.loading.open({ container: null })
            try {
                const response = await this.$auth.loginWith('local', { data: this.login })
                this.clear_form(this.login);
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${response?.data?.message}`,
                    type: 'is-success',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                })
            } catch (err) {
                await this.$buefy.notification.open({
                    duration: 5000,
                    message: `${err?.response?.data?.message || err}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                })
            } finally {
                await loadingComponent.close();
            }
        },
        clear_form(form) {
            Object.keys(form).forEach(function (key, index) {
                form[key] = null;
            });
        }
    }
}
</script>