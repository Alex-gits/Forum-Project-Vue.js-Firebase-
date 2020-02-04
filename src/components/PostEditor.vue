<template>
  <div>
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"
        ></textarea>
      </div>
      <div class="form-actions">
        <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn-blue">{{ isUpdate ? 'Update post' : 'Submit post'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid

        if (!keyIsValid) {
          return console.error('The post prop object must include a `key` attribute :<')
        }
        if (!textIsValid) {
          return console.error('The post prop object must include a `text` attribute :<')
        }

        return valid
      }
    }
  },
  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'updatePost']),

    save () {
      this.persist().then(post => {
        this.$emit('save', { post })
      })
    },
    cancel () {
      this.$emit('cancel')
    },
    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }

      this.text = ''

      this.$emit('save', { post })
      return this.createPost(post)
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }

      return this.updatePost(payload)
    },
    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>

<style scoped>

</style>
