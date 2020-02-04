<template>
    <div class="col-full"
      :class="$style.centered"
    >
      <h1 :class="$style.headingLarge">Not Found</h1>
      <p :class="$style.textLarge">Oops, we couldn't find what you are looking for. <br>Why don't you go to
        <router-link :to="{name: 'Home'}">homepage instead?</router-link>
      </p>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  created () {
    this.$emit('ready')
  }
}
</script>

<style module>
.headingLarge {
  font-size: 100px;
}

.textLarge {
  font-size: 50px;
  font-weight: 100;
}

.centered {
  padding-top: 20%;
}
</style>
