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
                                <input type="text" class="form-control" id="name" name="name" v-model="name"
                                    :class="errors?.name || nameError ? 'is-invalid' : ''" @blur="nameValidate">
                                <div id="nameError" class="text-danger">{{errors?.name}}</div>
                            </div>

                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" v-model="email"
                                    :class="errors?.email || emailError ? 'is-invalid' : ''" @blur="emailValidate">
                                <div id="emailError" class="text-danger">{{errors?.email}}</div>
                            </div>

                            <!-- Возраст -->
                            <div class="mb-3">
                                <label for="age" class="form-label">Возраст</label>
                                <input type="number" class="form-control" id="age" name="age" min="0" v-model="age"
                                    :class="errors?.age || ageError ? 'is-invalid' : ''">
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
                                    :class="errors?.password || passwordError ? 'is-invalid' : ''" v-model="password"
                                    @blur="passwordValidate">
                                <div id="passwordError" class="text-danger">{{errors?.password}}</div>
                            </div>

                            <!-- Повтор пароля -->
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Повторите пароль</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                                    @blur.prevent="repeatValidate" v-model="password_repeat"
                                    :class="errors?.password_repeat ? 'is-invalid' : ''">
                                <div id="confirmPasswordError" class="text-danger">{{errors?.password_repeat}}</div>
                            </div>

                            <!-- Согласие на обработку данных -->
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="agree" name="agree"
                                    :class="errors?.confnirm ? 'is-invalid' : ''" v-model="confirm"
                                    @blur="confirmValidate">
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
                passwordInvalid: true,
                password_repeatInvalid: true,
                nameInvalid: true,
                ageInvalid: true,
                confirmInvalid: true,
                emailInvalid: true,
                errors: {},
            }
        },

        methods: {
            passwordValidate() {
                if (!this.password) {
                    this.errors.password = 'Пустое поле'
                    this.passwordInvalid = true
                } else {
                    this.errors.password = ''
                    this.passwordInvalid = false
                }
            },
            emailValidate() {
                if (!this.email) {
                    this.errors.email = 'Пустое поле'
                    this.emailInvalid = true
                } else {
                    const reg = /$\w+\@{1}\w+\.{1}\w+^/
                    if (reg.text(this.email)) {
                        this.errors.email = ''
                        this.emailValid = false

                    } else {
                        this.errors.email = 'Неверный формат'
                        this.emailValid = true

                    }
                }
            },
            passwordValidate() {
                if (!this.email) {
                    this.errors.email = 'Пустое поле'
                    this.emailInvalid = true
                } else {
                    const reg = /$\w+\@{1}\w+\.{1}\w+^/
                    if (reg.text(this.email)) {
                        this.errors.email = ''
                        this.emailValid = false

                    } else {
                        this.errors.email = 'Неверный формат'
                        this.emailValid = true

                    }
                }
            },
            nameValidate() {
                if (!this.name) {
                    this.errors.name = 'Пустое поле'
                    this.nameInvalid = true
                } else {
                    const reg = /$[A-ZА-ЯЁ]{1}([a-zа-яё])*^/u
                    if (reg.text(this.name)) {
                        this.errors.name = ''
                        this.nameInvalid = false

                    } else {
                        this.errors.name = 'Неверный формат'
                        this.nameInvalid = true

                    }
                }
            },
            confirmValidate() {
                if (!this.confirm) {
                    this.errors.confirm = 'Надо заполнить'
                    this.confirmInvalid = true
                } else {

                    this.errors.confirm = ''
                    this.confirmInvalid = false


                }
            },
            allValidate() {
                return (
                    !this.nameInvalid &&
                    !this.emailValid &&
                    !this.confirmInvalid &&
                    !this.nameInvalid &&
                    !this.password_repeatInvalid
                );
            },
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