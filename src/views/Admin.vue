<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Кабинет администратора</h1>
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
                            <input class="form-control" type="text" id="book-author-${formId}" v-model="book.auhor">
                            <h5 class="card-subtitle mb-2 text-muted">Описание</h5>
                            <input class="form-control" type="text" id="book-description-${formId}"
                                v-model="book.description">
                            <h5 class="card-subtitle mb-2 text-muted">Статус</h5>
                            <p class="form-control" id="book-status-${formId}">{{book.is_public ? 'Доступно' :
                                'недоустпено'}}</p>
                            <!-- <button class="btn btn-warning btn-sm" onclick="editBook()">Редактировать</button> -->
                            <!-- <button class="btn btn-danger btn-sm" onclick="deleteBook()">Удалить</button> -->
                            <button class="btn btn-secondary btn-sm" @click.prevent="toggleStatus(book)">Изменить
                                статус</button>
                        </div>
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
                newBooks: [
                    {
                        title: '',
                        auhtor: '',
                        description: '',
                    }
                ],
                books: '',
                errors: {},
                user: {
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                },
            }
        },
        methods: {
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
            async toggleStatus(book) {
                try {


                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer " + this.$token.value);

                    const raw = JSON.stringify({
                        "is_public": !book.is_public ? true : false
                    });

                    const requestOptions = {
                        method: "PUT",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books/${book.id}/change-visibility`, requestOptions)
                    this.fetchBooks()
                } catch (error) {
                    alert(error)
                }
            },
            async editBook(index) {
                if (confirm('Уверен что хочешь зменитб?')) {

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

                        const result = await fetch(`${this.$url} / books / ${this.books[index].id}`, requestOptions)
                        if (result.status > 199 && result.status < 300) {
                            this.fetchBooks();
                        }
                    } catch (error) {
                        alert(error)
                    }
                }

            },
            async deleteBook(index) {
                if (confirm('Уверен что хочешь удалить?')) {

                    try {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer  " + this.$token.value);


                        const requestOptions = {
                            method: "DELETE",
                            headers: myHeaders,
                            redirect: "follow"
                        };

                        const result = await fetch(`${this.$url} / books / ${this.books[index].id}`, requestOptions)
                        if (result.status > 199 && result.status < 300) {
                            this.fetchBooks();
                        }
                    } catch (error) {
                        alert(error)
                    }
                }

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