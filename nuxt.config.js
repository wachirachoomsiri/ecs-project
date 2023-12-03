export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'esc-project',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'preload', href: '/fonts/bootstrap-icons.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/fonts/-W_8XJnvUD7dzB2Cy_gIfWMuQ5Q.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/fonts/-W_8XJnvUD7dzB2Cy_gIaWMu.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/fonts/materialdesignicons-webfont.woff2?v=5.8.55', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/css/css2.css', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/css/bootstrap-icons.min.css', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/css/materialdesignicons.min.css', as: 'style', crossorigin: 'anonymous' },

      { rel: 'stylesheet', href: '/css/css2.css', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: '/css/bootstrap-icons.min.css', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: '/css/materialdesignicons.min.css', crossorigin: 'anonymous' },

      { rel: 'stylesheet', href: '/css/su-font.css', crossorigin: 'anonymous' },

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    'nuxt-socket-io'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://127.0.0.1:3001/',
  },

  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3001',
      default: true,
    }]
  },

  buefy: {
    materialDesignIcons: false,
    css: false,
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'th'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  generate: { fallback: true }
}
