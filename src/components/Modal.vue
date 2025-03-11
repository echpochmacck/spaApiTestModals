<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :class='colorText'>
                        {{title}}
                    </h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal" v-if="!isDelete"
                        @click.prevent="$emit('editBook')">Редактировать</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" v-if="isDelete"
                        @click.prevent="$emit('deleteBook')">Удалить</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click.prevent="close">Закрыть</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['colorText', 'isDelete', "title"],
        methods: {
            close() {
                this.$modalState.value = false;
            },

        },
    }

</script>

<style>
    .modal {
        display: block;
    }
</style>