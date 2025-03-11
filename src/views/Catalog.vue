<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Каталог книг</h1>
            </div>
        </div>
        <div class="row" id="book-list" v-if="books">

            <div class="col-md-4" v-for="book, index in books">
                <div class="card book-card">
                    <div class="card-body">
                        <h5 class="card-title">{{book.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{book.author}}</h6>
                        <p class="card-text">{{book.desciption}}</p>
                        <a href="book.html" class="btn btn-primary" @click.prevent="toBook(book.id)">Читать</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center">
                <!-- Пагинация -->
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" id="prev-page"><a class="page-link" href="#"
                                @click.prevent=(fetchBooks(page--)) v-if="page > 1">Предыдущая</a></li>
                        <li class="page-item" id="next-page"><a class="page-link" href="#"
                                @click.prevent=(fetchBooks(page++))>Следующая</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                books: '',
                page: '1',
            }
        },
        methods: {
            async fetchBooks() {
                try {

                    const myHeaders = new Headers();
                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books?page=${this.page > 1 ? this.page : 1}&count=6`, requestOptions);
                    const data = await result.json()
                    if (result.status > 199 && result.status < 300) {
                        this.books = data.data.books
                    }
                } catch (error) {
                    alert(error)

                }

            },
            toBook(id) {
                if (this.$token.value) {
                    this.$router.push({ 'name': 'read', params: { 'id': id } })
                } else {
                    this.$alertState.value = true
                    this.$router.push('/')
                }
            }
        },
        mounted() {
            this.fetchBooks()
        }
    }
</script>