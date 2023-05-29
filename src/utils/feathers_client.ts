import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { root } from '@constants/routes.constants'

const app = feathers()

// Connect to the same as the browser URL (only in the browser)
// const restClient = rest()

// Connect to a different URL
const restClient = rest(root)

// Configure an AJAX library (see below) with that client

if (typeof window !== 'undefined') {
  // Code that depends on the window object
  app.configure(restClient.fetch(window.fetch.bind(window)))
}

export default app
