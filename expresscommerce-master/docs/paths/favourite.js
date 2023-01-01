module.exports = {

    '/{baseSiteId}/customers/{customerId}/favourites': {
        get: {
            tags: ["Wishlist API"], // operation's tag
            summary: "Get Wish List of customer", // short desc
            description: "Get Wish List of customer", // short desc
            operationId: "getFavourites", // unique operation id
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
                    name: "customerId",
                    in: "path",
                    description: "Customer UID",
                    required: true,
                    type: "string"
                }
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "Get Favorrite list",
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
                                        products: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    code: {
                                                        type: "string"
                                                    },
                                                    title: {
                                                        type: "string"
                                                    },
                                                    description: {
                                                        type: "string"
                                                    },
                                                    status: {
                                                        type: "string"
                                                    },
                                                    media: {
                                                        type: "object",
                                                        properties: {
                                                            thumbnail: {
                                                                type: "string"
                                                            },
                                                            main: {
                                                                type: "string"
                                                            },
                                                            type: {
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                },
                                            }
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
        post: {
            tags: ["Wishlist API"], // operation's tag
            summary: "Save product in Wish List of customer", // short desc
            description: "Save product in Wish List of customer", // short desc
            operationId: "saveFavourites", // unique operation id
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
                    name: "customerId",
                    in: "path",
                    description: "Customer UID",
                    required: true,
                    type: "string"
                }
            ], // expected params
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: "object",
                            properties: {
                                productCode: {
                                    type: "string"
                                },
                                name: {
                                    type: "string"
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                // response code
                200: {
                    description: "Updated Favourite list",
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
                                        products: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    code: {
                                                        type: "string"
                                                    },
                                                    title: {
                                                        type: "string"
                                                    },
                                                    description: {
                                                        type: "string"
                                                    },
                                                    status: {
                                                        type: "string"
                                                    },
                                                    media: {
                                                        type: "object",
                                                        properties: {
                                                            thumbnail: {
                                                                type: "string"
                                                            },
                                                            main: {
                                                                type: "string"
                                                            },
                                                            type: {
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                },
                                            }
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
        delete: {
            tags: ["Wishlist API"], // operation's tag
            summary: "Remove product from Wish List of customer", // short desc
            description: "Remove product from Wish List of customer", // short desc
            operationId: "removeFavourites", // unique operation id
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
                    name: "customerId",
                    in: "path",
                    description: "Customer UID",
                    required: true,
                    type: "string"
                }
            ], // expected params
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: "object",
                            properties: {
                                productCode: {
                                    type: "string"
                                },
                                name: {
                                    type: "string"
                                },
                            }

                        }
                    }
                }
            },
            responses: {
                // response code
                200: {
                    description: "Updated Favourite list",
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
                                        products: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    code: {
                                                        type: "string"
                                                    },
                                                    title: {
                                                        type: "string"
                                                    },
                                                    description: {
                                                        type: "string"
                                                    },
                                                    status: {
                                                        type: "string"
                                                    },
                                                    media: {
                                                        type: "object",
                                                        properties: {
                                                            thumbnail: {
                                                                type: "string"
                                                            },
                                                            main: {
                                                                type: "string"
                                                            },
                                                            type: {
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                },
                                            }
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
};