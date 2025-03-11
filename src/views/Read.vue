<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Чтение книги</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <!-- Элементы управления параметрами чтения -->
                <form class="mb-3">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="fontFamily" class="form-label">Шрифт</label>
                            <select class="form-select" id="fontFamily" onchange="updateStyles()">
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="Times New Roman, serif">Times New Roman</option>
                                <option value="Courier New, monospace">Courier New</option>
                                <option value="Georgia, serif">Georgia</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="fontSize" class="form-label">Размер текста</label>
                            <select class="form-select" id="fontSize" onchange="updateStyles()">
                                <option value="12px">12px</option>
                                <option value="14px">14px</option>
                                <option value="16px">16px</option>
                                <option value="18px">18px</option>
                                <option value="20px">20px</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="backgroundColor" class="form-label">Цвет фона</label>
                            <select class="form-select" id="backgroundColor" onchange="updateStyles()">
                                <option value="#ffffff">Белый</option>
                                <option value="#f8f9fa">Светло-серый</option>
                                <option value="#e9ecef">Серый</option>
                                <option value="#343a40">Темный</option>
                                <option value="#fff3cd">Светло-желтый</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="textColor" class="form-label">Цвет текста</label>
                            <select class="form-select" id="textColor" onchange="updateStyles()">
                                <option value="#000000">Черный</option>
                                <option value="#343a40">Темно-серый</option>
                                <option value="#ffffff">Белый</option>
                                <option value="#007bff">Синий</option>
                                <option value="#dc3545">Красный</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" v-if="book">
                <!-- Область для чтения книги -->
                <iframe :src="book.file_url" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                book: '',
            }
        },
        methods: {
            async fetchBook() {
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + this.$token.value);
                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    const result = await fetch(`${this.$url}/books/${this.$route.params.id}`, requestOptions);
                    const data = await result.json()
                    if (result.status > 199 && result.status < 300) {
                        this.book = data.data.book
                    } else {
                        if (result.status == 404) {
                            this.$router.push({ 'name': 'notFound' })
                        } else if (result.status == 403) {
                            this.$router.push({ 'name': 'denied' })
                        }
                    }
                } catch (error) {
                    alert(error)

                }

            }
        },
        mounted() {
            this.fetchBook()
        }
    }
</script>
<style>
    iframe {
        width: 70vw;
    }
</style>