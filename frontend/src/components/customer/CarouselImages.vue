<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
    >
      <q-carousel-slide
        :name="1"
        img-src="https://cdn.shopify.com/s/files/1/0527/2577/6541/articles/bdd_1024x.jpg?v=1622003044"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://www.pouted.com/wp-content/uploads/2016/10/embellished-nails-5.jpg?x71148"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://image.enuchi.jp/upload/20211208/images/3coins-fukubukuro5.jpg"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://cdn.shopify.com/s/files/1/0069/7348/9222/articles/2022-02-07_Main_1600x.jpg?v=1647992507"
      />
      <q-carousel-slide
        :name="5"
        img-src="https://missminimalista.com/wp-content/uploads/2022/01/nail-art-for-valentines-day-3.jpg"
      />

      <template v-slot:control>
        <q-carousel-control
          position="top-right"
          :offset="[18, 18]"
          class="text-white rounded-borders"
          style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
        >
          <q-toggle
            dense
            dark
            color="green"
            v-model="autoplay"
            :label="$t('autoPlay')"
          />
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn
            push
            round
            dense
            color="green"
            text-color="black"
            icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push
            round
            dense
            color="green"
            text-color="black"
            icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const slide = ref(1);
    const autoplay = ref(false);
    return {
      slide,
      autoplay,
    };
  },
});
</script>
