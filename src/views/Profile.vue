<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Профиль пользователя</h1>
            </div>
        </div>

        <!-- Информация о пользователе -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Информация о пользователе</h5>
                        <p class="card-text"><strong>Имя:</strong> {{user.name}} </p>
                        <p class="card-text"><strong>Email:</strong>{{user.email}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Список книг пользователя -->
        <div class="row mt-4">
            <div class="col-md-12">
                <h3>Мои книги</h3>
                <div id="user-books" v-if="books">

                    <div class="card book-card" v-for="book, index in books">
                        <div class="card-body">
                            <h5 class="card-title">Название книги</h5>
                            <input class="form-control" type="text" id="book-title-${formId}" v-model="book.title">
                            <h5 class="card-subtitle mb-2 text-muted">Автор</h5>
                            <input class="form-control" type="text" id="book-author-${formId}" v-model="book.author">
                            <h5 class="card-subtitle mb-2 text-muted">Описание</h5>
                            <input class="form-control" type="text" id="book-description-${formId}"
                                v-model="book.description">
                            <button class="btn btn-warning btn-sm"
                                @click.prevent="showModal('text-warning', false, 'Вы точно хотите редактировать?', index)">Редактировать</button>
                            <button class="btn btn-danger btn-sm"
                                @click.prevent="showModal('text-danger', true, 'Вы точно хотите удалить?', index)">Удалить</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <!-- Форма для добавления книг -->
        <div class="row mt-4">
            <div class="col-md-12">
                <h3>Добавить книги</h3>
                <div id="add-books-form">
                    <!-- Поля для добавления книг будут отображаться здесь -->
                </div>
                <button class="btn btn-secondary mt-2" @click.prevent="addBook">Добавить еще одну книгу</button>
                <button class="btn btn-primary mt-2" @click.prevent="save">Загрузить все книги</button>
                <div id="error-messages" class="text-danger mt-2"></div>
            </div>
        </div>

        <div>
            <div class="add-book-form" id="form-${formId}" v-for="book , index in newBooks">
                <div class="mb-3">
                    <label for="title-${formId}" class="form-label">Название книги</label>
                    <input type="text" class="form-control" id="title-${formId}" v-model="book.title">
                    <p class="text-danger">{{errors[index]?.title}}</p>
                </div>
                <div class="mb-3">
                    <label for="author-${formId}" class="form-label">Автор</label>
                    <input type="text" class="form-control" id="author-${formId}" v-model="book.author">
                </div>
                <div class="mb-3">
                    <label for="description-${formId}" class="form-label">Описание</label>
                    <textarea class="form-control" id="description-${formId}" v-model="book.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="file-${formId}" class="form-label">Загрузить файл</label>
                    <input type="file" class="form-control" id="file-${formId}" :ref="`book`">
                    <p class="text-danger">{{errors[index]?.file}}</p>

                </div>
                <button class="btn btn-danger btn-sm" @click.prevent="removeBook(index)">Удалить эту
                    книгу</button>
            </div>
        </div>

    </div>
    <modal v-if="$modalState.value" :colorText="colorText" :title="modalTitle" :isDelete="isDelete"
        @deleteBook="deleteBook" @editBook="editBook"> </modal>
</template>

<script>
    import Modal from '../components/Modal.vue';
    export default {

        data() {
            return {
                newBooks: [
                    {
                        title: '',
                        auhtor: '',
                        description: '',
                    }
                ],
                colorText: '',
                modalTitle: '',
                isDelete: false,
                books: '',
                selected: '',
                errors: {},
                user: {
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                },
            }
        },
        components: {
            Modal
        },
        methods: {
            showModal(color, isDelete, title, index) {
                this.colorText = color
                this.isDelete = isDelete
                this.modalTitle = title
                this.selected = index
                this.$modalState.value = true;
            },
            async fetchBooks() {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + this.$token.value);
                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books`, requestOptions);
                    const data = await result.json()
                    if (result.status > 199 && result.status < 300) {
                        this.books = data.data.books
                    }
                } catch (error) {
                    alert(error)

                }

            },
            async editBook(index) {
                index = this.selected

                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer  " + this.$token.value);

                    const raw = JSON.stringify({
                        "title": this.books[index].title,
                        "author": this.books[index].auhor,
                        "description": this.books[index].description
                    });

                    const requestOptions = {
                        method: "PATCH",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books/${this.books[index].id}`, requestOptions)
                    if (result.status > 199 && result.status < 300) {
                        this.fetchBooks();
                    }
                } catch (error) {
                    alert(error)
                }
                this.colorText = ''
                this.isDelete = ''
                this.modalTitle = ''
                this.selected = ''
                this.$modalState.value = '';

            },
            async deleteBook(index) {
                index = this.selected


                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer  " + this.$token.value);


                    const requestOptions = {
                        method: "DELETE",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books/${this.books[index].id}`, requestOptions)
                    if (result.status > 199 && result.status < 300) {
                        this.fetchBooks();
                    }
                } catch (error) {
                    alert(error)
                }
                this.colorText = ''
                this.isDelete = ''
                this.modalTitle = ''
                this.selected = ''
                this.$modalState.value = '';

            },
            async save() {
                for (let [index, book] of this.newBooks.entries()) {
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer " + this.$token.value);

                        const formdata = new FormData();
                        formdata.append("title", book.title);
                        formdata.append("author", book.author);
                        formdata.append("description", book.description);
                        formdata.append("file", this.$refs.book[index].files[0])

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: formdata,
                            redirect: "follow"
                        };

                        const result = await fetch("http://api-book3/api/books/upload", requestOptions)
                        const data = await result.json()
                        if (result.status > 199 && result.status < 300) {
                            this.fetchBooks()
                        } else {
                            if (result.status == 422) {
                                this.downloadErrors(data.error.errors, index)
                            }
                        }

                    } catch (error) {
                        alert(error)
                    }
                }
            },
            addBook() {
                this.newBooks.push({
                    title: '',
                    auhtor: '',
                    description: '',
                })
            },
            removeBook(index) {
                this.newBooks.splice(index, 1)

            },
            toBook(id) {
                if (this.$token.value) {
                    this.$router.push({ 'name': 'read', params: { 'id': id } })
                } else {
                    this.$alertState.value = true
                    this.$router.push('/')
                }
            },
            downloadErrors(errors, index) {
                for (let attr in errors) {
                    if (!this.errors[index]) {
                        this.errors[index] = {}
                    }
                    this.errors[index][attr] = errors[attr][0];
                }
            },
            clear(errors) {
                for (let attr in this.errors) {
                    this.errors[attr] = {};
                }
            }
        },
        mounted() {
            this.fetchBooks()
        }
    }
</script>