module.exports = {
    '/{baseSiteId}/users/{userId}/carts/{cartId}/deliveryAddress': {
        get: {
            tags: ["Checkout API"], // operation's tag
            summary: "Get delivery addresses for customer",
            description: "Get delivery addresses for customer", // short desc
            operationId: "deliveryAddress", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                                    AddressBook: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    },
                                    cardDetail: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/address/delivery': {
        post: {
            tags: ["Checkout API"], // operation's tag
            summary: "create deliveryAddress for checkout process",
            description: "create deliveryAddress for checkout process", // short desc
            operationId: "deliveryAddress", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                        firstName: {
                            type: "string"
                        },
                        lastName: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        fax: {
                            type: "string"
                        },
                        dateOfBirth: {
                            type: "string"
                        },
                        gender: {
                            type: "string"
                        },
                        pobox: {
                            type: "string"
                        },
                        cellphone: {
                            type: "string"
                        },
                        phone1: {
                            type: "string"
                        },
                        phone2: {
                            type: "string"
                        },
                        appartment: {
                            type: "string"
                        },
                        building: {
                            type: "string"
                        },
                        streetno: {
                            type: "string"
                        },
                        streetname: {
                            type: "string"
                        },
                        city: {
                            type: "string"
                        },
                        postalCode: {
                            type: "string"
                        },
                        countryIsoCode: {
                            type: "string"
                        },
                        regionIsoCode: {
                            type: "string"
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
                                    NewDeliveryAddress: {
                                        type: "object",
                                            properties: {
                                                uid: {
                                                    type: "string"
                                                },
                                                firstname: {
                                                    type: "string"
                                                },
                                                lastname: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                },
                                                _id: {
                                                    type: "string"
                                                }
                                            },    
                                        },
                                    cardDetail: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/delivery/modes': {
        get: {
            tags: ["Checkout API"], // operation's tag
            summary: "Get all delivery modes for the current store and delivery address.",
            description: "Get all delivery modes for the current store and delivery address.", // short desc
            operationId: "modes", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                                    DeliveryModes: {
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
                                                name: {
                                                    type: "string"
                                                },
                                                status: {
                                                    type: "boolean"
                                                },
                                                deliveryCost: {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },

                                    DeliveryAddress: {
                                            properties: {
                                                _id: {
                                                    type: "string"
                                                },
                                                firstname: {
                                                    type: "string"
                                                },
                                                lastname: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                }
                                            }
                                    },
                                    cardDetail: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/deliverymode': {
        post: {
            tags: ["Checkout API"], // operation's tag
            summary: "Sets the delivery mode for a cart.",
            description: "Sets the delivery mode for a cart.", // short desc
            operationId: "deliverymode", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                        deliveryMode: {
                            type: "string"
                        },
                        deliveryCost: {
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
                    description: "OK",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    
                                    DeliveryMode: {
                                        type: "string"
                                    },
                                    cardDetail: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/payment/details': {
        get: {
            tags: ["Checkout API"], // operation's tag
            summary: "get payment detail for customer",
            description: "get payment detail for customer", // short desc
            operationId: "paymentdetails", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                                    DeliveryAddress: {
                                        type: "object",
                                            properties: {
                                                uid: {
                                                    type: "string"
                                                },
                                                firstname: {
                                                    type: "string"
                                                },
                                                lastname: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                },
                                                _id: {
                                                    type: "string"
                                                }
                                            },    
                                        },
                                    cardDetail: {
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
    
    '/{baseSiteId}/users/{userId}/carts/{cartId}/paymentdetails': {
        post: {
            tags: ["Checkout API"], // operation's tag
            summary: "Defines and assigns details of a new credit card payment to the cart.",
            description: "Defines and assigns details of a new credit card payment to the cart.", // short desc
            operationId: "paymentdetails", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                        firstName: {
                            type: "string"
                        },
                        lastName: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        fax: {
                            type: "string"
                        },
                        dateOfBirth: {
                            type: "string"
                        },
                        gender: {
                            type: "string"
                        },
                        pobox: {
                            type: "string"
                        },
                        cellphone: {
                            type: "string"
                        },
                        phone1: {
                            type: "string"
                        },
                        phone2: {
                            type: "string"
                        },
                        appartment: {
                            type: "string"
                        },
                        building: {
                            type: "string"
                        },
                        streetno: {
                            type: "string"
                        },
                        streetname: {
                            type: "string"
                        },
                        city: {
                            type: "string"
                        },
                        postalCode: {
                            type: "string"
                        },
                        countryIsoCode: {
                            type: "string"
                        },
                        regionIsoCode: {
                            type: "string"
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
                                    PaymentAddress: {
                                        type: "object",
                                            properties: {
                                                uid: {
                                                    type: "string"
                                                },
                                                firstname: {
                                                    type: "string"
                                                },
                                                lastname: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                },
                                                _id: {
                                                    type: "string"
                                                }
                                            },    
                                        },
                                    
                                        DeliveryAddress: {
                                            type: "object",
                                                properties: {
                                                    uid: {
                                                        type: "string"
                                                    },
                                                    firstname: {
                                                        type: "string"
                                                    },
                                                    lastname: {
                                                        type: "string"
                                                    },
                                                    email: {
                                                        type: "string"
                                                    },
                                                    streetno: {
                                                        type: "string"
                                                    },
                                                    streetname: {
                                                        type: "string"
                                                    },
                                                    appartment: {
                                                        type: "string"
                                                    },
                                                    building: {
                                                        type: "string"
                                                    },
                                                    phone1: {
                                                        type: "string"
                                                    },
                                                    city: {
                                                        type: "string"
                                                    },
                                                    postalCode: {
                                                        type: "string"
                                                    },
                                                    region: {
                                                        type: "string"
                                                    },
                                                    country: {
                                                        type: "string"
                                                    },
                                                    owner: {
                                                        type: "string"
                                                    },
                                                    creationdate: {
                                                        type: "string"
                                                    },
                                                    isShippingAddress: {
                                                        type: "boolean"
                                                    },
                                                    isBillingAddress: {
                                                        type: "boolean"
                                                    },
                                                    _id: {
                                                        type: "string"
                                                    }
                                                },    
                                            },

                                    cardDetail: {
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

    '/{baseSiteId}/users/{userId}/carts/{cartId}/summary': {
        get: {
            tags: ["Checkout API"], // operation's tag
            summary: "Get summary details list for the cart.",
            description: "Get summary details list for the cart.", // short desc
            operationId: "summary", // unique operation id
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
                    type: "string",
                    default: 'expresscommerce'
                },
                {
                    name: "userId",
                    in: "path",
                    description: "userId identifier",
                    required: true,
                    type: "string"
                },
                {
                    name: "cartId",
                    in: "path",
                    description: "Card ID",
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
                                    PaymentAddress: {
                                        type: "object",
                                            properties: {
                                                uid: {
                                                    type: "string"
                                                },
                                                firstname: {
                                                    type: "string"
                                                },
                                                lastname: {
                                                    type: "string"
                                                },
                                                email: {
                                                    type: "string"
                                                },
                                                streetno: {
                                                    type: "string"
                                                },
                                                streetname: {
                                                    type: "string"
                                                },
                                                appartment: {
                                                    type: "string"
                                                },
                                                building: {
                                                    type: "string"
                                                },
                                                phone1: {
                                                    type: "string"
                                                },
                                                city: {
                                                    type: "string"
                                                },
                                                postalCode: {
                                                    type: "string"
                                                },
                                                region: {
                                                    type: "string"
                                                },
                                                country: {
                                                    type: "string"
                                                },
                                                owner: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                isShippingAddress: {
                                                    type: "boolean"
                                                },
                                                isBillingAddress: {
                                                    type: "boolean"
                                                },
                                                _id: {
                                                    type: "string"
                                                }
                                            },    
                                        },
                                    
                                        DeliveryAddress: {
                                            type: "object",
                                                properties: {
                                                    uid: {
                                                        type: "string"
                                                    },
                                                    firstname: {
                                                        type: "string"
                                                    },
                                                    lastname: {
                                                        type: "string"
                                                    },
                                                    email: {
                                                        type: "string"
                                                    },
                                                    streetno: {
                                                        type: "string"
                                                    },
                                                    streetname: {
                                                        type: "string"
                                                    },
                                                    appartment: {
                                                        type: "string"
                                                    },
                                                    building: {
                                                        type: "string"
                                                    },
                                                    phone1: {
                                                        type: "string"
                                                    },
                                                    city: {
                                                        type: "string"
                                                    },
                                                    postalCode: {
                                                        type: "string"
                                                    },
                                                    region: {
                                                        type: "string"
                                                    },
                                                    country: {
                                                        type: "string"
                                                    },
                                                    owner: {
                                                        type: "string"
                                                    },
                                                    creationdate: {
                                                        type: "string"
                                                    },
                                                    isShippingAddress: {
                                                        type: "boolean"
                                                    },
                                                    isBillingAddress: {
                                                        type: "boolean"
                                                    },
                                                    _id: {
                                                        type: "string"
                                                    }
                                                },    
                                            },

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
};
