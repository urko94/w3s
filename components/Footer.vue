<template>
  <footer class="relative mx-auto mt-20 md:mt-32 lg:mt-40">
    <!-- BG details -->
    <div class="z-1 absolute h-full w-full">
      <img
        class="absolute left-0 bottom-[120%] hidden md:block"
        src="/assets/icons/purple-triangle.svg"
        alt="icon-triangle"
      />
      <img
        class="absolute right-0 bottom-[85%] hidden md:block"
        src="/assets/icons/blue-circle-line.svg"
        alt="icon-circle"
      />
    </div>
    <div class="relative z-[2] mx-auto max-w-[1344px] px-5 lg:px-10" data-aos="fade-down">
      <div class="text-center">
        <div class="mb-20 md:mb-16">
          <a href="mailto:info@kalmia.si" :class="$style.email">info@kalmia.si</a>
        </div>
        <div
          :class="$style.linksSocial"
          class="mx-auto mb-5 grid max-w-[468px] grid-cols-3 text-left sm:mb-28 md:mb-20 md:text-center"
        >
          <div class="col-span-12 mb-6 sm:col-span-1 sm:mb-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/kalmialtd/"
            >
              LinkedIn
            </a>
          </div>
          <div class="col-span-12 mb-6 sm:col-span-1 sm:mb-0">
            <a target="_blank" rel="noopener noreferrer" href="https://www.pangea.ai/vendors/kalmia"
              >Pangea
            </a>
          </div>
          <div class="col-span-12 sm:col-span-1">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/kalmialtd/"
              >Facebook
            </a>
          </div>
        </div>
        <div :class="$style.links" class="mb-20 flex w-full items-center justify-center md:mb-8">
          <h6 class="mr-4">Powered by</h6>
          <a href="https://www.kalmia.si" target="_blank" title="Kalmia">
            <img
              src="/assets/images/logo/kalmia.svg"
              class="mx-auto"
              alt="Kalmia Logo"
              width="126"
              height="15"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" module>
.email {
  @apply text-white;
  font-size: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 0.24em;
  font-weight: 600;

  @screen sm {
    font-size: 1.75rem;
  }

  @screen md {
    font-size: 2rem;
  }
}

.linksSocial {
  @apply text-white;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.4em;
  font-weight: 600;
  text-align: center;

  a {
    transition: letter-spacing 0.4s;
    &:hover {
      letter-spacing: 0.1rem;
    }
  }
}

.links {
  @apply text-white;
  opacity: 1;
  font-size: 0.875rem;
  line-height: 1.75rem;

  a {
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
