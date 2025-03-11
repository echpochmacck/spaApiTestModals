<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Регистрация</h3>
                    </div>
                    <div class="card-body">
                        <!-- Форма регистрации -->
                        <form id="Form">
                            <!-- Имя -->
                            <div class="mb-3">
                                <label for="name" class="form-label">Имя</label>
                                <input type="text" class="form-control" id="name" name="name" v-model="name">
                                <div id="nameError" class="text-danger">{{errors?.name}}</div>
                            </div>

                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" v-model="email">
                                <div id="emailError" class="text-danger">{{errors?.email}}</div>
                            </div>

                            <!-- Возраст -->
                            <div class="mb-3">
                                <label for="age" class="form-label">Возраст</label>
                                <input type="number" class="form-control" id="age" name="age" min="0" v-model="age">
                                <div id="ageError" class="text-danger">{{errors?.age}}</div>
                            </div>

                            <!-- Пол -->
                            <div class="mb-3">
                                <label class="form-label">Пол</label>
                                <div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="male"
                                            v-model="gender" value="1">
                                        <label class="form-check-label" for="male">Мужской</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="female"
                                            v-model="gender" value="0">
                                        <label class="form-check-label" for="female">Женский</label>
                                    </div>
                                </div>
                                <div id="genderError" class="text-danger">{{errors?.gender}}</div>
                            </div>

                            <!-- Пароль -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    v-model="password">
                                <div id="passwordError" class="text-danger">{{errors?.password}}</div>
                            </div>

                            <!-- Повтор пароля -->
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Повторите пароль</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                                    @blur.prevent="repeatValidate" v-model="password_repeat">
                                <div id="confirmPasswordError" class="text-danger">{{errors?.password_repeat}}</div>
                            </div>

                            <!-- Согласие на обработку данных -->
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="agree" name="agree"
                                    v-model="confirm">
                                <label class="form-check-label" for="agree">Я согласен на обработку персональных
                                    данных</label>
                                <div id="agreeError" class="text-danger">{{errors?.confirm}}</div>
                            </div>

                            <!-- Кнопка регистрации -->
                            <button type="submit" class="btn btn-primary w-100"
                                @click.prevent="register">Зарегистрироваться</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                password: '123Da',
                password_repeat: '123Da',
                name: 'Jhon',
                gender: '1',
                age: '123',
                confirm: '1',
                email: 'u1@u.com',
                errors: {},
            }
        },
        methods: {
            repeatValidate() {
                if (this.password_repeat != this.password) {
                    this.errors.password_repeat = 'Поле равно паролю надо';
                    this.password_repeatInvalid = true
                } else {
                    this.errors.password_repeat = '';
                    this.password_repeatInvalid = false

                }
            },
            async register() {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        "email": this.email,
                        "password": this.password,
                        "name": this.name,
                        "age": this.age,
                        "gender": this.gender,
                        // "password": this.password,
                        // "password": this.password
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/registration`, requestOptions)
                    const data = await result.json();
                    if (result.status > 199 && result.status < 300) {
                        this.$router.push({ 'name': 'home' })

                    } else {
                        if (result.status == 422) {

                            this.downloadErrors(data.error.errors);
                        } else {
                            // this.errors['password'] = 'login failed'
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