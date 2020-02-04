<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Editing <i>{{ thread.title }}</i></h1>

    <ThreadEditor
      ref="threadEditor"
      @save='save'
      @cancel='cancel'
      :title="thread.title"
      :text="text"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    ThreadEditor
  },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    thread () {
      return this.$store.state.threads.items[this.id]
    },
    text () {
      const post = this.$store.state.posts.items[this.thread.firstPostId]
      return post ? post.text : null
    },
    hasUnsavedChanges () {
      return this.$refs.threadEditor.form.title !== this.thread.title || this.$refs.threadEditor.form.text !== this.text
    }
  },
  methods: {
    ...mapActions('threads', ['updateThread', 'fetchThread']),
    ...mapActions('posts', ['fetchPost']),
    save ({ title, text }) {
      this.updateThread({
        title,
        text,
        id: this.id
      }).then(thread => {
        this.$router.push({ name: 'PageThreadShow', params: { id: this.id } })
      })
    },
    cancel () {
      this.$router.push({ name: 'PageThreadShow', params: { id: this.thread['.key'] } })
    }
  },

  created () {
    this.fetchThread({ id: this.id })
      .then(thread => this.fetchPost({ id: thread.firstPostId }))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure you want to leave the page before editing the thread?')

      if (confirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }

}
</script>

<style scoped>
.info {
  font-size: 14px;
  font-weight: normal;
}

.class-t {
  display: flex;
  flex-direction: row;
}

.class-a {
  display: inline;
  font-weight: 700;
}
</style>
