module.exports = {

    '/{baseSiteId}/category': {
        get: {
            tags: ["Product and Category API"], // operation's tag
            summary: "Get a  Category",
            description: "Returns  Category with versions defined for the base store.", // short desc
            operationId: "getCategory", // unique operation id
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "baseSiteId",
                    in: "path",
                    description: "Base site identifier",
                    required: true,
                    type: "string"
                }

            ], // expected params

            responses: {
                // response code
                200: {
                    description: "OK",
                    content: {
                        'application/json': {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string"
                                        },
                                        code: {
                                            type: "string"
                                        },
                                        title: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        superCategories: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string"
                                                    },
                                                    code: {
                                                        type: "string"
                                                    },
                                                    title: {
                                                        type: "string"
                                                    },
                                                    description: {
                                                        type: "string"
                                                    },
                                                    superCategories: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {

                                                            },
                                                        },
                                                    },

                                                    categories: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {

                                                            },
                                                        },
                                                    },
                                                    catalog: {
                                                        type: "string"
                                                    },
                                                    status: {
                                                        type: "string"
                                                    },
                                                    localizedName: {
                                                        type: "array",
                                                        items: {
                                                            type: "string",
                                                        },

                                                    },
                                                    creationdate: {
                                                        type: "string"
                                                    },
                                                    modificationdate: {
                                                        type: "string"
                                                    },
                                                },
                                            },
                                        },

                                        categories: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {

                                                },
                                            },
                                        },
                                        catalog: {
                                            type: "string"
                                        },
                                        status: {
                                            type: "string"
                                        },
                                        localizedName: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },

                                        },
                                        creationdate: {
                                            type: "string"
                                        },
                                        modificationdate: {
                                            type: "string"
                                        },

                                    }
                                }

                            }
                        }
                    },
                    // response code
                    500: {
                        description: "Server error", // response desc
                    },
                    401: {
                        $ref: "#/components/schemas/UnauthorizedError"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    404: {
                        description: "Not Found"
                    }
                },
            },
        }
    },

    '/{baseSiteId}/categories': {
        get: {
            tags: ["Product and Category API"], // operation's tag
            summary: "Get a list of Category",
            description: "Returns all Categories with versions defined for the base store.", // short desc
            operationId: "getCategories", // unique operation id
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "baseSiteId",
                    in: "path",
                    description: "Base site identifier",
                    required: true,
                    type: "string"
                }

            ], // expected params

            responses: {
                // response code
                200: {
                    description: "OK",
                    content: {
                        'application/json': {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string"
                                        },
                                        code: {
                                            type: "string"
                                        },
                                        title: {
                                            type: "string"
                                        },
                                        sections: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string"
                                                    },
                                                    code: {
                                                        type: "string"
                                                    },
                                                    title: {
                                                        type: "string"
                                                    },
                                                    items: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                code: {
                                                                    type: "string",
                                                                },
                                                                title: {
                                                                    type: "string",
                                                                },
                                                                id: {
                                                                    type: "string",
                                                                }

                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },

                                    }
                                }

                            }
                        }
                    },
                    // response code
                    500: {
                        description: "Server error", // response desc
                    },
                    401: {
                        $ref: "#/components/schemas/UnauthorizedError"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    404: {
                        description: "Not Found"
                    }
                },
            },
        }
    },

    '/{baseSiteId}/category/{code}': {
        get: {
            tags: ["Product and Category API"], // operation's tag
            summary: "Get a  Category by code",
            description: "Returns  Category based on code", // short desc
            operationId: "getCategoryByCode", // unique operation id
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "baseSiteId",
                    in: "path",
                    description: "Base site identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "code",
                    in: "path",
                    description: "code identifier",
                    required: true,
                    type: "string"
                }

            ], // expected params

            responses: {
                // response code
                200: {
                    description: "OK",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: {
                                        type: "string"
                                    },
                                    code: {
                                        type: "string"
                                    },
                                    title: {
                                        type: "string"
                                    },
                                    description: {
                                        type: "string"
                                    },
                                    superCategories: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string"
                                                },
                                                code: {
                                                    type: "string"
                                                },
                                                title: {
                                                    type: "string"
                                                },
                                                description: {
                                                    type: "string"
                                                },
                                                superCategories: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {

                                                        },
                                                    },
                                                },

                                                categories: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {

                                                        },
                                                    },
                                                },
                                                catalog: {
                                                    type: "string"
                                                },
                                                status: {
                                                    type: "string"
                                                },
                                                localizedName: {
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                    },

                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                modificationdate: {
                                                    type: "string"
                                                },
                                            },
                                        },
                                    },

                                    categories: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {

                                            },
                                        },
                                    },
                                    catalog: {
                                        type: "string"
                                    },
                                    status: {
                                        type: "string"
                                    },
                                    localizedName: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                        },

                                    },
                                    creationdate: {
                                        type: "string"
                                    },
                                    modificationdate: {
                                        type: "string"
                                    },

                                }


                            }
                        }
                    },
                    // response code
                    500: {
                        description: "Server error", // response desc
                    },
                    401: {
                        $ref: "#/components/schemas/UnauthorizedError"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    404: {
                        description: "Not Found"
                    }
                },
            },
        },

        patch: {
            tags: ["Product and Category API"], // operation's tag
            summary: "update a  Category by code",
            description: "update  Category based on code", // short desc
            operationId: "updateCategory", // unique operation id
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "baseSiteId",
                    in: "path",
                    description: "Base site identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "code",
                    in: "path",
                    description: "code identifier",
                    required: true,
                    type: "string"
                }

            ], // expected params
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: {
                                    type: "string"
                                }
                            }
                        },
                    },
                },
            },

            responses: {
                // response code
                200: {
                    description: "OK",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: {
                                        type: "string"
                                    },
                                    code: {
                                        type: "string"
                                    },
                                    title: {
                                        type: "string"
                                    },
                                    description: {
                                        type: "string"
                                    },
                                    superCategories: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string"
                                                },
                                                code: {
                                                    type: "string"
                                                },
                                                title: {
                                                    type: "string"
                                                },
                                                description: {
                                                    type: "string"
                                                },
                                                superCategories: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {

                                                        },
                                                    },
                                                },

                                                categories: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {

                                                        },
                                                    },
                                                },
                                                catalog: {
                                                    type: "string"
                                                },
                                                status: {
                                                    type: "string"
                                                },
                                                localizedName: {
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                    },

                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                modificationdate: {
                                                    type: "string"
                                                },
                                            },
                                        },
                                    },

                                    categories: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {

                                            },
                                        },
                                    },
                                    catalog: {
                                        type: "string"
                                    },
                                    status: {
                                        type: "string"
                                    },
                                    localizedName: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                        },

                                    },
                                    creationdate: {
                                        type: "string"
                                    },
                                    modificationdate: {
                                        type: "string"
                                    },

                                }


                            }
                        }
                    },
                    // response code
                    500: {
                        description: "Server error", // response desc
                    },
                    401: {
                        $ref: "#/components/schemas/UnauthorizedError"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    404: {
                        description: "Not Found"
                    }
                },
            },
        },

    },
}