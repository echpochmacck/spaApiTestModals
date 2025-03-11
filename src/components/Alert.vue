<template>
    <div class="alert alert-warning fade show" role="alert" :class="alertColor" ref="alert">
        <div class="d-flex justify-content-between">

            <div>
                <strong :class="textColor"><slot>не знаю</slot></strong>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click.prevent="close"></button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['alertColor', 'textColor'],
        methods: {
            close() {
                this.$alertState.value = false;
            },
            timeClose() {
                const el = this.$refs.alert;
                el.style.opacity = 1
                el.style.transition = 'opacity 1s'
                setTimeout(() => {
                    el.style.opacity = 0
                    // el.style.display = 'none'
                }, 1000)
            }
        },
        mounted() {
            this.timeClose()
        }
    } 
</script>
<style>
    .alert {
        width: 50vw;
    }
</style>