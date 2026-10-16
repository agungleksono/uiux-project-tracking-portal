import { createVuetify } from 'vuetify'
import {
  VApp,
  VBtn,
  VCheckbox,
  VForm,
  VSnackbar,
  VTextField,
  VCard,
  VIcon,
  VThemeProvider,
  VDialog,
  VCardText,
  VCardActions,
  VSelect,
  VTextarea,
} from 'vuetify/components'

export default createVuetify({
  components: {
    VApp,
    VBtn,
    VCheckbox,
    VForm,
    VSnackbar,
    VTextField,
    VCard,
    VIcon,
    VThemeProvider,
    VDialog,
    VCardText,
    VCardActions,
    VSelect,
    VTextarea,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { dark: false, colors: { primary: '#1966fa' } },
      portal: {
        dark: true,
        colors: {
          primary: '#1966fa',
          background: '#002454',
          surface: '#214779',
        },
      },
    },
  },
})
