<template>
    <nav>
        <h1>Awesome Weather App</h1>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NavBar",
    setup(){

    },
})
</script>

<style>
    nav{
        background-color: rgb(207, 249, 255);
        border-radius: 1rem;
        margin: 1rem;
    }
    h1{
        display: flex;
        justify-content:center;
        align-items: center;
        padding: 1rem;
    }
</style>