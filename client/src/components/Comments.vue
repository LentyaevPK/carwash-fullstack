<template>
  <div class="feedback">
    <h1 class="feedback__title title">Поделитесь впечатлениями</h1>
    <Loader class="feedback__loader" v-if="isLoading"/>
    <main v-else class="feedback-container">
      <ul v-if="posts.length" class="feedback-container__list">
        <Post v-for="(post, index) in posts" :key="index" :post="post" />
      </ul>
      <p v-else class="post__text">Комментариев пока нет.</p>
      <form v-if="isLoggedIn" class="feedback-container__form form" @submit.prevent="createPost">
        <div class="form__group">
          <input type="text" name="message" required class="form__input" placeholder=" " autocomplete="off" v-model="text"/>
          <label class="form__label">Сообщение</label>
        </div>
        <button type="submit" class="feedback__button button">Оставить отзыв</button>
      </form>
      <p v-else class="post__text" style="text-align: center;">Авторизуйтесь, чтобы оставлять комментарии.</p>
    </main>
  </div>
</template>

<script>
import Loader from './Loader'
import {mapGetters, mapActions} from 'vuex'
import Post from './Post'

export default {
  name: 'Posts',
  components: {
    Loader, Post
  },
  data() {
    return {
      error: '',
      text: '',
      isLoading: true
    }
  },
  async created() {
    await this.getPosts()
    this.isLoading = false
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn', 'posts'])
  },
  methods: {
    async createPost() {
      let newPost = {
        name: this.user.username,
        text: this.text
      }
      await this.insertPost(newPost)
      this.text = ''
    },
    ...mapActions(['getPosts', 'insertPost'])
  }
};
</script>

<style lang="scss">
.feedback {
  padding: 30px;
  background: #000C1D;
  min-height: 100vh;

  @include component-size(tl) {
    padding: 100px 50px;
  }

  &__title {
    color: #fff;

    &::before {
      background-color: #fff;
    }
  }

  &__button {
    border: 2px solid #0057FF;
    margin: 20px auto;
    transition: 0.3s;
    color: #fff;
    background: transparent;

    &:hover {
      background-color: #0057FF;
    }

    @include component-size(tablet) {
      margin: 40px auto;
    }
  }

  &__loader {
    margin: 50px auto;
  }
}

.feedback-container {
  margin: auto;
  
  @include component-size(tl) {
    width: 70%;
  }

  &__list {
    padding: 0;
    list-style: none;
  }

  &__form {
    margin: 20px auto;
    width: 75%;

    @include component-size(mp) {
      width: 100%;
    }
  }
}

.post {
  margin: 15px 0;
  padding: 20px;
  border-top: 1px solid #666666;

  &:first-child {
    border-top: none;
  }

  &__title {
    color: #fff;

    @include component-size(mp) {
      font-size: 14px;
      line-height: 18px;
    }

    @include component-size(bigdesktop) {
      font-size: 26px;
      line-height: 34px;
    }

    & span {
      color: #858585;
      margin-left: 10px;
    }
  }

  &__text {
    color: #858585;
    margin: 15px 0;
    
    @include component-size(mp) {
      font-size: 14px;
      line-height: 18px;
    }

    @include component-size(tablet) {
      font-size: 20px;
      line-height: 24px;
    }

    @include component-size(bigdesktop) {
      font-size: 26px;
      line-height: 34px;
    }
  }

  &__likes {
    display: flex;
    & img {
      cursor: pointer;
    }
  }

  &__like-counter {
    color: #858585;
    padding: 0 10px;
    font-size: 24px;
  }
}
</style>
