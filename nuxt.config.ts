import { defineNuxtConfig } from 'nuxt';

const config = require(`./config/${process.env.ENV ? process.env.ENV : process.env.NODE_ENV}.ts`);

const meta: any = {
  title: 'Web3 Spaces',
  description: 'Web3 Spaces by Kalmia',
  url: 'https://web3spaces.academy',
  image: 'https://web3spaces.academy/images/og.jpg',
};

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: true,
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: false,
    },
  },
  typescript: { shim: false },
  build: {
    analyze: {
      filename: 'stats.html',
      open: true,
    },
    transpile: ['swiper'],
  },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],

  router: {
    prefetchLinks: true,
    middleware: ['auto-login', 'protected-routes'],
  },

  publicRuntimeConfig: {
    ENV: process.env.ENV || process.env.NODE_ENV,
    appUrl: config.appUrl || meta.url,
    metaTitle: ' – ' + meta.title,
    API_BASE: config.API_BASE || 'https://api.web3spaces.academy',
    GAME_BASE_URL: config.GAME_BASE_URL || 'https://nft-stg.web3spaces.academy',
    CHAIN_ID: config.CHAIN_ID || '0x4',
    GTAG: config.GTAG || '',
  },

  env: {
    API_BASE: config.API_BASE || 'https://api.web3spaces.academy',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate: `%s | ${meta.title}`,
      charset: 'utf-9',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1F1D2E' },
        { name: 'description', content: meta.description, hid: 'description' },
        { name: 'image', property: 'og:image', content: meta.image },
        { name: 'og:title', content: meta.title, hid: 'og:title' },
        { name: 'og:description', content: meta.description, hid: 'og:description' },
        { name: 'og:url', content: meta.url, hid: 'og:url' },
        { name: 'og:image', content: meta.image },
        { name: 'og:type', content: 'website' },
        { name: 'twitter:title', content: meta.title, hid: 'twitter:title' },
        { name: 'twitter:description', content: meta.description, hid: 'twitter:description' },
        { name: 'twitter:url', content: meta.url, hid: 'twitter:url' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: meta.image },
        { name: 'twitter:creator', content: meta.twitter },
        { name: 'twitter:site', content: meta.twitter },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        /* { rel: 'manifest', href: '/manifest.json' }, */
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'true',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'true',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
    },
  },
});
