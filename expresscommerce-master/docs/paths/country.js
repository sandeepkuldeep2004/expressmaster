module.exports = {

    '/{baseSiteId}/countries': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get all Country List",
            description: "get all Country List", // short desc
            operationId: "getCountry", // unique operation id
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
                    description: "get Country",
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
                                        }
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
    '/{baseSiteId}/countries/{isocode}': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get Country details based on isocode",
            description: "get Country details based on isocode", // short desc
            operationId: "getCountryViaIsocode", // unique operation id
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
                    description: "Isocode of country",
                    required: true,
                    type: "string"
                }
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get Country",
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
                                        }
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
    '/{baseSiteId}/countries/{isocode}/regions': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get Regions of Country based on country isocode",
            description: "get Regions of Country based on country isocode", // short desc
            operationId: "getRegionsViaCountryIsocode", // unique operation id
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
                    description: "Isocode of country",
                    required: true,
                    type: "string"
                }
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get Regions",
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
                                        country: {
                                            type: "string"
                                        }
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
    '/{baseSiteId}/regions/{isocode}': {
        get: {
            tags: ["Essential API"], // operation's tag
            summary: "Get Region based on isocode", // short desc
            description: "get Region based on isocode", // short desc
            operationId: "getRegionViaIsocode", // unique operation id
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
                    description: "Isocode of Region",
                    required: true,
                    type: "string"
                }
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get Region Based on Isocode",
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
                                        country: {
                                            type: "string"
                                        }
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