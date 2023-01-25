module.exports = {
    '/{baseSiteId}/user/{userId}/cart': {
        get: {
            tags: ["Cart API"], // operation's tag
            summary: "get  cart",
            description: "get cart details", // short desc
            operationId: "getCart", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
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
                                    owner: {
                                        type: "string",

                                    },
                                    baseSite: {
                                        type: "string",

                                    },
                                    baseStore: {
                                        type: "string",

                                    },
                                    name: {
                                        type: "string",

                                    },
                                    sessionId: {
                                        type: "string",
                                    },
                                    purchaseOrderNumber: {
                                        type: "string",

                                    },
                                    attachedPdfUri: {
                                        type: "string",

                                    },
                                    appliedCouponCodes: {
                                        type: "string",

                                    },
                                    paymentType: {
                                        type: "string",

                                    },
                                    cartEntries: {
                                        type: "string",

                                    }
                                    ,
                                    paymentTransactions: {
                                        type: "string",

                                    },
                                    consignments: {
                                        type: "string",

                                    },
                                    totalTaxValue: {
                                        type: "number",

                                    },
                                    totalDiscountValue: {
                                        type: "number",

                                    },
                                    deliveryCost: {
                                        type: "number",
                                    },
                                    currency: {
                                        type: "string",
                                    },
                                    totalPrice: {
                                        type: "number",

                                    },
                                    isCalculated: {
                                        type: "boolean",

                                    },
                                    deliveryAddress: {
                                        type: "string",

                                    },
                                    paymentAddress: {
                                        type: "string",

                                    },
                                    deliveryPOS: {
                                        type: "string",
                                    },
                                    deliveryMode: {
                                        type: "string",
                                    },
                                    expectedDeliveryDate: {
                                        type: "string",

                                    },
                                    deliveryComment: {
                                        type: "string",

                                    },
                                    creationdate: {
                                        type: "string",
                                    },
                                    modificationdate: {
                                        type: "string",
                                    },
                                    referenceQuote: {
                                        type: "string",

                                    },
                                    erpOrderId: {
                                        type: "string",

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
        },

        post: {
            tags: ["Cart API"], // operation's tag
            summary: "add to cart",
            description: "add products to cart", // short desc
            operationId: "addToCart", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
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
                                productCode: {
                                    type: "string",

                                },
                                quantity: {
                                    type: "integer",
                                },
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
                                    status: {
                                        type: "string",

                                    },
                                    message: {
                                        type: "string",

                                    },
                                    cartId: {
                                        type: "string",

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
        },
    },

    '/{baseSiteId}/user/{userId}/cart/{cart_id}/deleteentry': {
        delete: {
            tags: ["Cart API"], // operation's tag
            summary: "delete from cart",
            description: "delete cart based on cart id", // short desc
            operationId: "deleteCart", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cart_id",
                    in: "path",
                    description: "cart id identifier",
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
                                type: "string"

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

    '/{baseSiteId}/user/{userId}/minicart': {
        get: {
            tags: ["Cart API"], // operation's tag
            summary: "get mini cart",
            description: "get mini cart details", // short desc
            operationId: "minicart", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
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
                                    Id: {
                                        type: "string",

                                    },
                                    totalQty: {
                                        type: "integer",

                                    },
                                    totalPrice: {
                                        type: "number",

                                    },
                                    cartId: {
                                        type: "string",

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

    '/{baseSiteId}/user/{userId}/cart/{cart_id}/redeemVoucher': {
        post: {
            tags: ["Cart API"], // operation's tag
            summary: "redeem voucher",
            description: "redeem voucher", // short desc
            operationId: "redeemVoucher", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cart_id",
                    in: "path",
                    description: "cart id identifier",
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
                                voucherCode: {
                                    type: "string",
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
                                type: "string"
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

    '/{baseSiteId}/user/{userId}/cart/{cart_id}/updateentry': {
        put: {
            tags: ["Cart API"], // operation's tag
            summary: "add to cart",
            description: "update  the  cart", // short desc
            operationId: "updateCart", // unique operation id
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
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cart_id",
                    in: "path",
                    description: "cart id identifier",
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
                                quantity: {
                                    type: "number"
                                },
                                entryNumber: {
                                    type: "number"
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
                                type: "string",

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
