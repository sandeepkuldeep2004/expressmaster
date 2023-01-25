module.exports = {

    '/{baseSiteId}/registration': {
        post: {
            tags: ["Customer API"], // operation's tag
            summary: "Create New Customer",
            description: "create customer ", // short desc
            operationId: "createCustomer", // unique operation id
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

            ], // expected params
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string"
                                },
                                email: {
                                    type: "string"
                                },
                                body: {
                                    type: "string"
                                },
                                password: {
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
                    description: "create customer",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "object",
                                        properties: {
                                            uid: {
                                                type: "string"
                                            },
                                            name: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            sessionLanguage: {
                                                type: "number"
                                            },
                                            sessionCurrency: {
                                                type: "string"
                                            },
                                            baseSite: {
                                                type: "string"
                                            },
                                            _id: {
                                                type: "string",
                                            },
                                            creationDate: {
                                                type: "string"
                                            },
                                            modificationDate: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string",
                                            },
                                            token: {
                                                type: "string"
                                            },
                                            defaultPaymentAddress: {
                                                type: "string"
                                            },
                                            defaultShipmentAddress: {
                                                type: "string"
                                            },
                                            phone: {
                                                type: "string"
                                            }
                                        }
                                    },
                                    error: {
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
            },
        },
    },

    '/{baseSiteId}/customers': {
        get: {
            tags: ["Customer API"], // operation's tag
            summary: "Get all customers",
            description: "returns customer details", // short desc
            operationId: "getAllCustomer", // unique operation id
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
                                        uid: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string"
                                        },
                                        sessionLanguage: {
                                            type: "number"
                                        },
                                        sessionCurrency: {
                                            type: "string"
                                        },
                                        baseSite: {
                                            type: "string"
                                        },
                                        _id: {
                                            type: "string",
                                        },
                                        creationDate: {
                                            type: "string"
                                        },
                                        modificationDate: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string",
                                        },
                                        token: {
                                            type: "string"
                                        },
                                        defaultPaymentAddress: {
                                            type: "string"
                                        },
                                        defaultShipmentAddress: {
                                            type: "string"
                                        },
                                        phone: {
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

    '/{baseSiteId}/users/{userId}': {
        post: {
            tags: ["Customer API"], // operation's tag
            summary: "Update Customer Detail",
            description: "update customer ", // short desc
            operationId: "updateCustomer", // unique operation id
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
                    description: "update based on userId",
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
                                name: {
                                    type: "string"
                                },
                                email: {
                                    type: "string"
                                },
                                body: {
                                    type: "string"
                                },
                                password: {
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
                    description: "update customer",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    uid: {
                                        type: "string"
                                    },
                                    name: {
                                        type: "string"
                                    },
                                    email: {
                                        type: "string"
                                    },
                                    sessionLanguage: {
                                        type: "number"
                                    },
                                    sessionCurrency: {
                                        type: "string"
                                    },
                                    baseSite: {
                                        type: "string"
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    creationDate: {
                                        type: "string"
                                    },
                                    modificationDate: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string",

                                    },
                                    token: {
                                        type: "string"
                                    },
                                    defaultPaymentAddress: {
                                        type: "string"
                                    },
                                    defaultShipmentAddress: {
                                        type: "string"
                                    },
                                    phone: {
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
            },
        }
    },

    '/{baseSiteId}/users/{userId}/forgotPassword': {
        post: {
            tags: ["Customer API"], // operation's tag
            summary: "Forgot password",
            description: "forgot Password ", // short desc
            operationId: "forgotPassword", // unique operation id
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
                    description: "retrive based on userId",
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

                            }
                        },
                    },
                },
            },
            responses: {
                // response code
                200: {
                    description: "forgot password",
                    content: {
                        'application/json': {
                            schema: {
                                description: {
                                    type: "string",
                                    example: "a system generated password will be sent to your registerd email"
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

    '/{baseSiteId}/changePassword': {

        post: {
            tags: ["Customer API"], // operation's tag
            description: "change Password ", // short desc
            summary: "Change Password",
            operationId: "changePassword", // unique operation id
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
            ], // expected params
            requestBody: {
                // expected request body
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string"
                                },
                                oldpassword: {
                                    type: "string"
                                },
                                newpassword: {
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
                    description: "change password",
                    content: {
                        'application/json': {
                            schema: {
                                description: {
                                    type: "string",
                                    example: "Password has been updated successfully for email"
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

    '/{baseSiteId}/users/{userId}/myAccount': {
        get: {
            tags: ["Customer API"], // operation's tag
            summary: "Get Account details",
            description: "Returns information about account.", // short desc
            operationId: "getMyAccountDetails", // unique operation id
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
                    description: "user identifier",
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
                                    uid: {
                                        type: "string"
                                    },
                                    name: {
                                        type: "string"
                                    },
                                    email: {
                                        type: "string"
                                    },
                                    sessionLanguage: {
                                        type: "number"
                                    },
                                    sessionCurrency: {
                                        type: "string"
                                    },
                                    baseSite: {
                                        type: "string"
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    creationDate: {
                                        type: "string"
                                    },
                                    modificationDate: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    token: {
                                        type: "string"
                                    },
                                    defaultPaymentAddress: {
                                        type: "string"
                                    },
                                    defaultShipmentAddress: {
                                        type: "string"
                                    },
                                    phone: {
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
    },

    '/{baseSiteId}/users/{userId}/addresses': {
        get: {
            tags: ["Customer API"], // operation's tag
            summary: "Get list of addresses",
            description: "Returns all addresses for a particular customer", // short desc
            operationId: "getAddresses", // unique operation id
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
                                type: "array",
                                items: {
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
                                        fax: {
                                            type: "string"
                                        },
                                        dateofbirth: {
                                            type: "string"
                                        },
                                        gender: {
                                            type: "string"
                                        },
                                        streetno: {
                                            type: "string"
                                        },
                                        streetname: {
                                            type: "string"
                                        },
                                        pobox: {
                                            type: "string"
                                        },
                                        appartment: {
                                            type: "string"
                                        },
                                        building: {
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
                                        modificationdate: {
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
            tags: ["Customer API"], // operation's tag
            summary: "add a addresses",
            description: "add address for a particular customer", // short desc
            operationId: "addAddress", // unique operation id
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
                                token: {
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
                                type: "array",
                                items: {
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
                                        fax: {
                                            type: "string"
                                        },
                                        dateofbirth: {
                                            type: "string"
                                        },
                                        gender: {
                                            type: "string"
                                        },
                                        streetno: {
                                            type: "string"
                                        },
                                        streetname: {
                                            type: "string"
                                        },
                                        pobox: {
                                            type: "string"
                                        },
                                        appartment: {
                                            type: "string"
                                        },
                                        building: {
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
                                        modificationdate: {
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
    '/{baseSiteId}/users/{userId}/addresses/{addressId}': {
        get: {
            tags: ["Customer API"], // operation's tag
            summary: "Fetch Address",
            description: "Fetch the address for a particular customer", // short desc
            operationId: "fetchAddress", // unique operation id
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
                    name: "addressId",
                    in: "path",
                    description: "addressId identifier",
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
                                    fax: {
                                        type: "string"
                                    },
                                    dateofbirth: {
                                        type: "string"
                                    },
                                    gender: {
                                        type: "string"
                                    },
                                    streetno: {
                                        type: "string"
                                    },
                                    streetname: {
                                        type: "string"
                                    },
                                    pobox: {
                                        type: "string"
                                    },
                                    appartment: {
                                        type: "string"
                                    },
                                    building: {
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
                                    city: {
                                        type: "string"

                                    },
                                    postalCode: {
                                        type: "string"

                                    },
                                    region: {
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
                                    },
                                    country: {
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
                                    },
                                    owner: {
                                        type: "string"
                                    },
                                    creationdate: {
                                        type: "string"
                                    },
                                    modificationdate: {
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
        put: {
            tags: ["Customer API"], // operation's tag
            summary: "update the existing address",
            description: "update address for a particular customer", // short desc
            operationId: "updateAddress", // unique operation id
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
                    name: "addressId",
                    in: "path",
                    description: "addressId identifier",
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
                                    fax: {
                                        type: "string"
                                    },
                                    dateofbirth: {
                                        type: "string"
                                    },
                                    gender: {
                                        type: "string"
                                    },
                                    streetno: {
                                        type: "string"
                                    },
                                    streetname: {
                                        type: "string"
                                    },
                                    pobox: {
                                        type: "string"
                                    },
                                    appartment: {
                                        type: "string"
                                    },
                                    building: {
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
                                    modificationdate: {
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
        delete: {
            tags: ["Customer API"], // operation's tag
            summary: "Remove the address",
            description: "Remove the address for a particular customer", // short desc
            operationId: "removeAddress", // unique operation id
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
                    name: "addressId",
                    in: "path",
                    description: "addressId identifier",
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
                                    message: {
                                        type: "string"
                                    },
                                    error: {
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
    },
};