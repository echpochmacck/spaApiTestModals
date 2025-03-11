<template>
    <div class="d-flex flex-column g-3 align-items-center">
        <alert :textColo="'text-danger'" :alertColor="'alert-danger'" v-if="$alertState.value">Вход был запрещен</alert>

        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-center">Авторизация</h3>
                        </div>
                        <div class="card-body">
                            <form id="loginForm">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email" v-model="email">
                                    <div id="emailError" class="text-danger">{{errors?.email}}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Пароль</label>
                                    <input type="password" class="form-control" id="password" name="password"
                                        v-model="password">
                                    <div id="passwordError" class="text-danger">{{errors?.password}}</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100"
                                    @click.prevent='login'>Войти</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Alert from '../components/Alert.vue';
    export default {
        data() {
            return {
                password: '',
                email: '',
                errors: {},
            }
        },
        components: {
            Alert
        },
        methods: {
            async login() {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "email": this.email,
                        "password": this.password
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/login`, requestOptions)
                    const data = await result.json();
                    if (result.status > 199 && result.status < 300) {
                        this.$token.value = data.data.token;
                        this.$role.value = data.data.user.role;
                        localStorage.setItem('token', data.data.token);
                        localStorage.setItem('role', data.data.user.role);
                        localStorage.setItem('email', data.data.user.email);
                        localStorage.setItem('name', data.data.user.name);
                        this.$router.push({ 'name': 'profile' })


                    } else {
                        if (result.status == 422) {

                            this.downloadErrors(data.error.errors);
                        } else {
                            this.errors['password'] = 'login failed'
                        }
                    }

                } catch (error) {

                    alert(error)
                }
            },
            downloadErrors(errors) {
                for (let attr in errors) {
                    this.errors[attr] = errors[attr][0];
                }
            },
            clear(errors) {
                for (let attr in this.errors) {
                    this.errors[attr] = '';
                }
            }

        }
    }
</script>