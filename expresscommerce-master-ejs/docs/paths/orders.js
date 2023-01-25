module.exports = {
    '/{baseSiteId}/orders/{code}': {
        get: {
            tags: ["Order API"], // operation's tag
            summary: "Get order details",
            description: "Returns information about orders.", // short desc
            operationId: "getOrder", // unique operation id
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
                },

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
                                    id: {
                                        type: "string",
                                    },
                                    MediaKeySession: {
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
                                    orderEntries: {
                                        type: "string",
                                    },
                                    paymentTransactions:
                                    {
                                        type: "string",
                                    }
                                    ,
                                    consignments:
                                    {
                                        type: "string",
                                        ref: "Consignment"
                                    }
                                    ,
                                    totalTaxValue: {
                                        type: "number",

                                    },
                                    totalDiscountValue: {
                                        type: "number",

                                    },
                                    deliveryCost: {
                                        type: "number",

                                    },
                                    currencyCode: {
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
                                    },
                                    omsOrderId: {
                                        type: "string",
                                    },
                                    omsShipmentId: {
                                        type: "string",
                                    },
                                    courierCompanyId: {
                                        type: "string",
                                    },
                                    courierName: {
                                        type: "string",
                                    },
                                    awbCode: {
                                        type: "string",
                                    },
                                    omsStatus: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/placeorder': {
        get: {
            tags: ["Order API"], // operation's tag
            summary: "Place a order.",
            description: "Place a order.", // short desc
            operationId: "placeorder", // unique operation id
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
                },

            ], // expected params

            requestBody: {
                // expected request body
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                termsCheck: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
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
                                    OrderSummary: {
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
                                                type: "array",
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        owner: { type: 'string' },
                                                        entryNumber: { type: 'number' }

                                                    }
                                                }

                                            }
                                            ,
                                            paymentTransactions: {
                                                type: "array",
                                                items: {
                                                    type: 'object',
                                                    properties: {

                                                    }
                                                }

                                            },
                                            consignments: {
                                                type: "array",
                                                items: {
                                                    type: 'object',
                                                    properties: {

                                                    }
                                                }

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
                                            },
                                            omsOrderId: {
                                                type: "string",
                                            },
                                            omsShipmentId: {
                                                type: "string",
                                            },
                                            courierCompanyId: {
                                                type: "string",
                                            },
                                            courierName: {
                                                type: "string",
                                            },
                                            awbCode: {
                                                type: "string",
                                            },
                                            omsStatus: {
                                                type: "string",
                                            }
                                        }
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
        }
    },

    '{baseSiteId}/users/{userId}/orders': {
        get: {
            tags: ["Order API"], // operation's tag
            summary: "Get all order details",
            description: "Returns information about orders.", // short desc
            operationId: "getAllOrders", // unique operation id
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
                                        id: {
                                            type: "string",
                                        },
                                        MediaKeySession: {
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
                                        orderEntries: {
                                            type: "string",
                                        },
                                        paymentTransactions:
                                        {
                                            type: "string",
                                        }
                                        ,
                                        consignments:
                                        {
                                            type: "string",
                                            ref: "Consignment"
                                        }
                                        ,
                                        totalTaxValue: {
                                            type: "number",

                                        },
                                        totalDiscountValue: {
                                            type: "number",

                                        },
                                        deliveryCost: {
                                            type: "number",

                                        },
                                        currencyCode: {
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
                                        },
                                        omsOrderId: {
                                            type: "string",
                                        },
                                        omsShipmentId: {
                                            type: "string",
                                        },
                                        courierCompanyId: {
                                            type: "string",
                                        },
                                        courierName: {
                                            type: "string",
                                        },
                                        awbCode: {
                                            type: "string",
                                        },
                                        omsStatus: {
                                            type: "string",
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

    }

};
