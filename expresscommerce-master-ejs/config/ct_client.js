
  const { createClient } = require('@commercetools/sdk-client')
  const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
  const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
  const { createRequestBuilder } = require('@commercetools/api-request-builder');
  const fetch = require('node-fetch')

  const projectKey = 'jmj'

  
const getClient = () => {
 // let fetch = await import('node-fetch')

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.australia-southeast1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: 'oi6T78gZ5w-gMpvst3fBy11d',
      clientSecret: 'N2OkiwNXcvqSoRdCbS2JHX-4dfHjkYu-',
    },
    scopes: ['manage_project:jmj'],
    fetch,
  })
  const httpMiddleware = createHttpMiddleware({
    host: 'https://api.australia-southeast1.gcp.commercetools.com',
    fetch,
  })
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  
  
  return client;
    
};

const getCustomObjectByContainerAndKey = (container, key) =>
    getClient().execute({     
      uri: `/${projectKey}/custom-objects/${container}/${key}`,  
      // uri: createRequestBuilder({ projectKey }).customObjects.byContainer(container).byKey(key).build(), // ToDo: get with requestbuilder
      method: 'GET'
});


module.exports.getClient = getClient;
module.exports.projectKey = projectKey;
module.exports.getCustomObjectByContainerAndKey = getCustomObjectByContainerAndKey;

