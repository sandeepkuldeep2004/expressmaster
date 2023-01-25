module.exports = {

    '/{baseSiteId}/languages': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get all languages", // short desc
            description: "get all languages", // short desc
            operationId: "getLanguage result", // unique operation id
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
                    description: "get languages",
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
                                        isocode: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        fallbacklanguage: {
                                            type: "string"
                                        },
                                        status: {
                                            type: "string"
                                        },

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
            },
        },
    },
    '/{baseSiteId}/languages/{isocode}': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get language based on isocode", // short desc
            description: "get language based on isocode", // short desc
            operationId: "getLanguageViaIsocode", // unique operation id
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
                    name: "isocode",
                    in: "path",
                    description: "Isocode of Language",
                    required: true,
                    type: "string"
                }

            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get languages",
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
                                        isocode: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        fallbacklanguage: {
                                            type: "string"
                                        },
                                        status: {
                                            type: "string"
                                        },

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
            },
        },
    }
};