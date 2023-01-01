module.exports = {
  // operation's method
  '/{baseSiteId}/auth/token': {
    post: {
      tags: ["Auth API"], // operation's tag
      summary: "Create Auth Token", // short desc
      description: "Create Auth Token", // short desc
      operationId: "getToken", // unique operation id
      parameters: [
        {
          name: "baseSiteId",
          in: "path",
          description: "Base site identifier",
          required: true,
          type: "string"
        },

      ], // expected params
      security: [],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AuthRequest", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Auth Token Result",
          content: {
            'application/json': {
              schema: {
                $ref: "#/components/schemas/AuthResponse"
              }
            }
          }
        },
        // response code
        404: {
          description: "Auth Token is not found",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthInvalidResponse',
                example: {
                  message: "We can't find the Auth",
                }
              }
            }
          }
        }
      },
    },
  },

  '/{baseSiteId}/auth/token/refresh': {
    post: {
      tags: ["Auth API"], // operation's tag
      summary: "Refresh Auth Token", // short desc
      description: "Refresh Auth Token", // short desc
      operationId: "getRefreshToken", // unique operation id
      parameters: [
        {
          name: "baseSiteId",
          in: "path",
          description: "Base site identifier",
          required: true,
          type: "string"
        },

      ], // expected params
      security: [],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string"
                }
              }
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Auth Token Result",
          content: {
            'application/json': {
              schema: {
                type: "object",
                properties: {
                  accessToken: {
                    type: "string"
                  }
                }
              }
            }
          }
        },
        // response code
        404: {
          description: "Auth Token is not found",
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthInvalidResponse',
                example: {
                  message: "We can't find the Auth",
                }
              }
            }
          }
        }
      },
    },
  }
};