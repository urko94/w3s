<template>
  <footer class="absolute bottom-0 left-0 right-0">
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
  </footer>
</template>

<style lang="postcss" module>
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
