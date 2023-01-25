module.exports = {

    '/{baseSiteId}/catalogs': {
        get: {
            tags: ["Catalogs API"], // operation's tag
            summary: "Get a list of catalogs",
            description: "Returns all catalogs with versions defined for the base store.", // short desc
            operationId: "getCatalogs", // unique operation id
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
                                        code: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        status: {
                                            type: "string"
                                        },
                                        creationdate: {
                                            type: "string"
                                        },
                                        modificationdate: {
                                            type: "string"
                                        }

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
    '/{baseSiteId}/catalogs/{code}': {
        get: {
            tags: ["Catalogs API"], // operation's tag
            summary: "Get a catalog",
            description: "Returns information about a catalog based on its ID, along with the versions defined for the current base store.", // short desc
            operationId: "getCatalogById", // unique operation id
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
                    name: "catalogId",
                    in: "path",
                    description: "Catalog identifier",
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
                                    code: {
                                        type: "string"
                                    },
                                    name: {
                                        type: "string"
                                    },
                                    description: {
                                        type: "string"
                                    },
                                    status: {
                                        type: "string"
                                    },
                                    creationdate: {
                                        type: "string"
                                    },
                                    modificationdate: {
                                        type: "string"
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
    }
};
