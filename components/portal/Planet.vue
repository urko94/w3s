<template>
  <div
    ref="planetRef"
    :id="'planet' + name"
    class="planet absolute top-1/2 left-1/2 h-0 w-0"
    :class="cssClass"
    @mouseover="planetOnHover()"
  >
    <div class="relative h-fit w-fit -translate-x-1/2 -translate-y-1/2 p-4">
      <div class="planet-img relative z-10">
        <SvgInclude :name="imageName" />
      </div>

      <div
        v-show="showIntroduction"
        class="planet-introduction absolute w-[333px] max-w-[94vw] mobile:left-7 mobile:origin-top-left md:top-1/2 md:w-[454px] md:-translate-x-[20%] md:-translate-y-40 md:scale-100"
        :class="[
          isPlanetOnLeftSide
            ? 'md:left-[100%] md:-translate-x-10 md:pl-20'
            : 'md:right-[100%] md:translate-x-10 md:pr-20',
        ]"
      >
        <h4 class="mb-2">
          #{{ planetNumber }} Planet <span class="my-3" :class="'text-' + color">{{ name }}</span>
        </h4>
        <div class="planet-card relative min-h-[150px] rounded p-4">
          <p v-if="shortDescription" class="body-sm mb-3" v-html="shortDescription"></p>
          <ul v-if="events.length" class="body-sm my-3 list-disc pl-6">
            <li v-for="event in events">
              <strong v-if="event.name && event.date">{{ event.name }}</strong>
              <span v-else>{{ event.name }}</span>
              <span v-if="event.name && event.date">&nbsp;//&nbsp;</span>
              <span>{{ event.date }}</span>
            </li>
          </ul>
          <p v-if="description" class="body-sm mb-3" v-html="description"></p>
          <Btn :to="link" :class="color" width="100%" min-width="unset">Explore</Btn>
          <div
            class="absolute top-[110px] right-[100%] z-[-1] hidden w-24 border-b-[3px] md:block"
            :class="[isPlanetOnLeftSide ? 'rigth-[100%]' : 'left-[100%]']"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: { type: String, default: null },
  cssClass: { type: String, default: null },
  imageName: { type: String, default: '' },
  color: { type: String, default: null },
  shortDescription: { type: String, default: null },
  events: { type: Array<any>, default: [] },
  description: { type: String, default: null },
  link: { type: String, default: null },
  planetNumber: { type: Number, default: 0 },
  isPlanetPresented: { type: Boolean, default: false },
});

const { width } = useWindowSize();
const planetRef = ref(null);
const isPlanetOnLeftSide = ref(true);

const showIntroduction = computed(() => {
  return width.value >= 768 || props.isPlanetPresented;
});

function planetOnHover() {
  if (planetRef.value) {
    // @ts-ignore
    const { left } = planetRef.value.getBoundingClientRect();
    isPlanetOnLeftSide.value = left < width.value / 2;
  }
}
</script>

<style lang="postcss" scoped>
.planet-img {
  width: calc(40px + 7vw);
  max-width: 180px;
  svg {
    width: 100%;
    height: auto;
  }
}

.planet-card {
  background: rgba(255, 255, 255, 0.16);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@screen md {
  .planet {
    offset-rotate: 0deg;

    &.introdus {
      offset-path: path('M-545,41 C-575,-114 410,-189 470,-39 C470,121 -490,181 -545,41');
      animation: planetMovementIntrodus 24s infinite linear;

      .planet-img {
        animation: planetScale 24s infinite linear;
      }
    }
    &.amalin {
      offset-path: path('M-688,46 C-700,-144 530,-249 610,-49 C630,151 -630,241 -688,46');
      animation: planetMovementAmalin 30s infinite linear -7.5s;

      .planet-img {
        animation: planetScale 30s infinite linear -7.5s;
      }
    }
    &.trios {
      offset-path: path('M-824,56 C-835,-179 665,-299 747,-57 C740,191 -770,281 -824,56');
      animation: planetMovementTrios 36s infinite linear -18s;

      .planet-img {
        animation: planetScale 36s infinite linear -18s;
      }
    }
    &.opushop {
      offset-path: path('M-960,66 C-940,-224 770,-334 880,-74 C915,216 -880,341 -960,66');
      animation: planetMovementOpushop 42s infinite linear -31.5s;

      .planet-img {
        animation: planetScale 42s infinite linear -31.5s;
      }
    }

    &:hover {
      animation-play-state: paused !important;
      z-index: 20 !important;

      .planet-img {
        animation-play-state: paused !important;
      }

      .planet-introduction {
        display: block;
      }
    }
  }
  .planet-introduction {
    display: none;
  }
}

@screen mobile {
  .planet {
    &.introdus {
      left: 15vw;
      top: 10vmin;
      /** animation: float 19s linear infinite alternate; */
    }
    &.amalin {
      @apply scale-[.60];
      left: 20vw;
      top: -10vmin;
      /** animation: float 21s linear infinite alternate 6s; */

      .planet-introduction {
        @apply scale-[.5];
      }
    }
    &.trios {
      left: 90vw;
      top: 10vmin;
      /** animation: float 13s linear infinite alternate 4s; */
    }
    &.opushop {
      @apply scale-[.70];
      left: 90vw;
      top: -10vmin;
      /** animation: float 16s linear infinite alternate-reverse; */

      .planet-introduction {
        @apply scale-[.5];
      }
    }
  }

  .planet-introduction {
    @apply scale-[.35];
  }
}
</style>
