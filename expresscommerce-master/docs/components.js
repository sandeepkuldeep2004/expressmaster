module.exports = {
    components: {
        securitySchemes: {
            BasicAuth: {
                type: 'http',
                scheme: 'basic'
            },
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
            OAuth2: {
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: 'https://example.com/oauth/authorize',
                        tokenUrl: 'https://example.com/oauth/token',
                        scopes: {
                            read: 'Grants read access',
                            write: 'Grants write access',
                            admin: 'Grants access to admin operations'
                        }
                    }
                }
            }
        },
        schemas: {
            UnauthorizedError: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        example:"Access token is missing or invalid"
                    }
                }
            },
            AuthRequest: {
                type: "object",
                properties: {
                    secretkey: {
                        type: "string"
                    },
                    clientkey: {
                        type: "string"
                    }
                }
            },
            AuthResponse: {
                type: "object",
                properties: {
                    accessToken: {
                        type: "string"
                    },
                    refreshToken: {
                        type: "string"
                    }
                }
            },
            Client: {
                type: "object",
                properties: {
                    clientkey: {
                        "type": "string"
                    },
                    secretkey: {
                        "type": "string"
                    }
                }
            },
            AuthInvalidResponse: {
                type: "object",
                properties: {
                    message: {
                        "type": "string"
                    }
                }
            },
            ProductSearchResponse: {
                type: "object",
                properties: {
                    total: {
                        type: "integer"
                    },
                    start: {
                        type: "integer"
                    },
                    products: {
                        type: "array",
                        items: {
                            "$ref": "#/components/schemas/ProductResponse"
                        }
                    },
                    error: {
                        "type": "string"
                    },
                    facets: {
                        "type": "object"
                    }
                }
            },
            ProductResponse: {
                type: "object",
                properties: {
                    id: {
                        "type": "string"
                    }
                }
            }
        },
    },
};