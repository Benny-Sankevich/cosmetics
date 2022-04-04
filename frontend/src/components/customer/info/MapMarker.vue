<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 290px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="markerOption" />
  </GoogleMap>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { ILocation, IMarkerOptions } from '../../../models/general-models';

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const apiKey = process.env.apiKey;

    const center: ILocation = {
      lat: 32.09499956166754,
      lng: 34.83600686893388,
    };

    const markerOption: IMarkerOptions = {
      position: center,
      label: 'S',
    };

    return {
      apiKey,
      markerOption,
      center,
    };
  },
});
</script>
