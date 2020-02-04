<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link class="text-xlarge" :to="{name: 'Forum', params: {id: forum['.key']}}">
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p><span class="count">{{ threadsCount }}</span>
        {{ threadsCount === 1 ? 'thread' : 'threads' }}
      </p>
    </div>

    <div class="last-thread">
      <!-- TODO!  -->
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from '@/utils'

export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },
  computed: {
    threadsCount () {
      return countObjectProperties(this.forum.threads)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
