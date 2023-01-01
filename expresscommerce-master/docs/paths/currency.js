module.exports = {

    '/{baseSiteId}/currences': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get all Currency List", // short desc
            description: "get all Currency List", // short desc
            operationId: "getCurrency result", // unique operation id
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
                    description: "get Currency",
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
                                        conversion: {
                                            type: "string"
                                        },
                                        digit: {
                                            type: "number"
                                        },
                                        symbol: {
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
    '/{baseSiteId}/currences/{isocode}': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary:"Get Currency Based on isocode", // short desc
            description: "get Currency Based on isocode", // short desc
            operationId: "getCurrencyViaISOCODE", // unique operation id
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
                    description: "isocode",
                    required: true,
                    type: "string"
                }


            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get Currency",
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
                                        conversion: {
                                            type: "string"
                                        },
                                        digit: {
                                            type: "number"
                                        },
                                        symbol: {
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