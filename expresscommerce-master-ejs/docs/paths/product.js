module.exports = {

    '/{baseSiteId}/products/search': {
        get: {
            tags: ["Product API"], // operation's tag
            summary: "Search the product based on keywords", // short desc
            description: "Search the product based on keywords", // short desc
            operationId: "searchProduct", // unique operation id
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
                },
                {
                    in: "query",
                    name: "currentPage",
                    description: "CurrentPage",
                    required: true,
                    type: "string",
                    default: '0'
                },
                {
                    in: "query",
                    name: "pageSize",
                    description: "PageSize",
                    required: true,
                    type: "string",
                    default: '10'
                },
                {
                    in: "query",
                    name: "sort",
                    description: "Sort",
                    required: false,
                    type: "string",
                    default: 'asc'
                },
                {
                    in: "query",
                    name: "query",
                    description: "Query",
                    required: true,
                    type: "string",
                },
                {
                    in: "query",
                    name: "fields",
                    description: "Fields",
                    required: false,
                    type: "string",
                    default: 'DEFAULT'
                }
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "Product search result",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    facets: {
                                        type: "object",
                                        properties: {}
                                    },
                                    total: {
                                        type: "number"
                                    },
                                    start: {
                                        type: "number"
                                    },
                                    products: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string"
                                                },
                                                code: {
                                                    type: "string"
                                                },
                                                code_string: {
                                                    type: "string"
                                                },
                                                name: {
                                                    type: "string"
                                                },
                                                description: {
                                                    type: "string"
                                                },
                                                productType: {
                                                    type: "string"
                                                },
                                                unit: {
                                                    type: "string"
                                                },
                                                catalogCode: {
                                                    type: "string"
                                                },
                                                productApprovalstatus: {
                                                    type: "string"
                                                },
                                                inUseStatus: {
                                                    type: "string"
                                                },
                                                fsnStatus: {
                                                    type: "string"
                                                },
                                                onSale: {
                                                    type: "boolean"
                                                },
                                                isPerishable: {
                                                    type: "boolean"
                                                },
                                                isPickupAvailable: {
                                                    type: "boolean"
                                                },
                                                multidimensional: {
                                                    type: "boolean"
                                                },
                                                price: {
                                                    type: "number"
                                                },
                                                currency: {
                                                    type: "string"
                                                }
                                                ,
                                                inStock: {
                                                    type: "boolean"
                                                },
                                                availableQtyInStock: {
                                                    type: "number"
                                                },
                                                inStockstatus: {
                                                    type: "string"
                                                },
                                                categoryCode: {
                                                    type: "number"
                                                },
                                                categoryName: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                categoryCode_string: {
                                                    type: "string"
                                                },
                                                rate: {
                                                    type: "number"
                                                },
                                                total: {
                                                    type: "number"
                                                },
                                                summary: {
                                                    type: "string"
                                                },

                                            }
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

    '/{baseSiteId}/products/search/{categoryCode}': {
        get: {
            tags: ["Product API"], // operation's tag
            summary: "Search products based on category code", // short desc
            description: "Search products based on category code", // short desc
            operationId: "searchProductWithCategoryCode", // unique operation id
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
                },
                {
                    name: "categoryCode",
                    in: "path",
                    description: "Category Code",
                    required: true,
                    type: "string",
                },
                {
                    in: "query",
                    name: "currentPage",
                    description: "CurrentPage",
                    required: true,
                    type: "string",
                    default: '0'
                },
                {
                    in: "query",
                    name: "pageSize",
                    description: "PageSize",
                    required: true,
                    type: "string",
                    default: '10'
                },
                {
                    in: "query",
                    name: "sort",
                    description: "Sort",
                    required: false,
                    type: "string",
                    default: 'asc'
                },
                {
                    in: "query",
                    name: "query",
                    description: "Query",
                    required: false,
                    type: "string",
                },
                {
                    in: "query",
                    name: "fields",
                    description: "Fields",
                    required: false,
                    type: "string",
                    default: 'DEFAULT'
                },
            ], // expected params

            responses: {
                // response code
                200: {
                    description: "Product search result",
                    content: {
                        'application/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    facets: {
                                        type: "object",
                                        properties: {}
                                    },
                                    total: {
                                        type: "number"
                                    },
                                    start: {
                                        type: "number"
                                    },
                                    products: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string"
                                                },
                                                code: {
                                                    type: "string"
                                                },
                                                code_string: {
                                                    type: "string"
                                                },
                                                name: {
                                                    type: "string"
                                                },
                                                description: {
                                                    type: "string"
                                                },
                                                productType: {
                                                    type: "string"
                                                },
                                                unit: {
                                                    type: "string"
                                                },
                                                catalogCode: {
                                                    type: "string"
                                                },
                                                productApprovalstatus: {
                                                    type: "string"
                                                },
                                                inUseStatus: {
                                                    type: "string"
                                                },
                                                fsnStatus: {
                                                    type: "string"
                                                },
                                                onSale: {
                                                    type: "boolean"
                                                },
                                                isPerishable: {
                                                    type: "boolean"
                                                },
                                                isPickupAvailable: {
                                                    type: "boolean"
                                                },
                                                multidimensional: {
                                                    type: "boolean"
                                                },
                                                price: {
                                                    type: "number"
                                                },
                                                currency: {
                                                    type: "string"
                                                }
                                                ,
                                                inStock: {
                                                    type: "boolean"
                                                },
                                                availableQtyInStock: {
                                                    type: "number"
                                                },
                                                inStockstatus: {
                                                    type: "string"
                                                },
                                                categoryCode: {
                                                    type: "number"
                                                },
                                                categoryName: {
                                                    type: "string"
                                                },
                                                creationdate: {
                                                    type: "string"
                                                },
                                                categoryCode_string: {
                                                    type: "string"
                                                },
                                                rate: {
                                                    type: "number"
                                                },
                                                total: {
                                                    type: "number"
                                                },
                                                summary: {
                                                    type: "string"
                                                },

                                            }
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
        }
    },
    '/{baseSiteId}/products/{productCode}': {
        get: {
            tags: ["Product API"], // operation's tag
            summary: "Get Product detail based on product code", // short desc
            description: "Get Product detail based on product code", // short desc
            operationId: "productDetails", // unique operation id
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
                    name: "productCode",
                    in: "path",
                    description: "Product Code",
                    required: true,
                    type: "string"
                }

            ], // expected params

            responses: {
                // response code
                200: {
                    description: "get Product Detail",
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
                                        name: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        productType: {
                                            type: "string"
                                        },
                                        unit: {
                                            type: "string"
                                        },
                                        productApprovalstatus: {
                                            type: "string"
                                        },
                                        inUseStatus: {
                                            type: "string"
                                        },
                                        fsnStatus: {
                                            type: "string"
                                        },
                                        onSale: {
                                            type: "string"
                                        },
                                        isPerishable: {
                                            type: "string"
                                        },
                                        creationdate: {
                                            type: "string"
                                        },
                                        thumbnailImage: {
                                            type: "string"
                                        },
                                        mainImage: {
                                            type: "string"
                                        },
                                        baseProduct: {
                                            type: "string"
                                        },
                                        price: {
                                            type: "string"
                                        },
                                        currency: {
                                            type: "string"
                                        },
                                        reviewAvgRating: {
                                            type: "string"
                                        },
                                        hostUrl: {
                                            type: "string"
                                        },
                                        medias: {
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
                                                    main: {
                                                        type: "string"
                                                    },
                                                    thumbnail: {
                                                        type: "string"
                                                    },
                                                    priority: {
                                                        type: "number"
                                                    },
                                                    catalog: {
                                                        type: "object",
                                                        properties: {
                                                            code: {
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        categories: {
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
                                                    }
                                                }
                                            }
                                        },
                                        price: {
                                            type: "object",
                                            properties: {
                                                currencyIso: {
                                                    type: "string"
                                                },
                                                formattedValue: {
                                                    type: "string"
                                                },
                                                value: {
                                                    type: "number"
                                                }
                                            }
                                        },
                                        stock: {
                                            type: "object",
                                            properties: {
                                                stockLevelStatus: {
                                                    type: "string"
                                                },
                                                stockLevel: {
                                                    type: "number"
                                                }
                                            }
                                        },
                                        productReviews: {
                                            type: "object",
                                            properties: {
                                                total: {
                                                    type: "number"
                                                },
                                                rate: {
                                                    type: "number"
                                                }
                                            }
                                        },
                                        catalog: {
                                            type: "object",
                                            properties: {
                                                code: {
                                                    type: "string"
                                                }
                                            }
                                        },
                                        variantOptions: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: {
                                                        type: "string"
                                                    },
                                                    code: {
                                                        type: "string"
                                                    },
                                                    color: {
                                                        type: "string"
                                                    },
                                                    size: {
                                                        type: "string"
                                                    },
                                                    price: {
                                                        type: "object",
                                                        properties: {
                                                            currencyIso: {
                                                                type: "string"
                                                            },
                                                            formattedValue: {
                                                                type: "string"
                                                            },
                                                            value: {
                                                                type: "number"
                                                            }
                                                        }
                                                    },
                                                    stock: {
                                                        type: "object",
                                                        properties: {
                                                            stockLevelStatus: {
                                                                type: "string"
                                                            },
                                                            stockLevel: {
                                                                type: "number"
                                                            }
                                                        }
                                                    },
                                                    medias: {
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
                                                                main: {
                                                                    type: "string"
                                                                },
                                                                thumbnail: {
                                                                    type: "string"
                                                                },
                                                                priority: {
                                                                    type: "number"
                                                                },
                                                                catalog: {
                                                                    type: "object",
                                                                    properties: {
                                                                        code: {
                                                                            type: "string"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        baseOptions: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    variantType: {
                                                        type: "string"
                                                    },
                                                    options: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                name: {
                                                                    type: "string"
                                                                },
                                                                code: {
                                                                    type: "string"
                                                                },
                                                                color: {
                                                                    type: "string"
                                                                },
                                                                size: {
                                                                    type: "string"
                                                                },
                                                                price: {
                                                                    type: "object",
                                                                    properties: {
                                                                        currencyIso: {
                                                                            type: "string"
                                                                        },
                                                                        formattedValue: {
                                                                            type: "string"
                                                                        },
                                                                        value: {
                                                                            type: "number"
                                                                        }
                                                                    }
                                                                },
                                                                stock: {
                                                                    type: "object",
                                                                    properties: {
                                                                        stockLevelStatus: {
                                                                            type: "string"
                                                                        },
                                                                        stockLevel: {
                                                                            type: "number"
                                                                        }
                                                                    }
                                                                },
                                                                medias: {
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
                                                                            main: {
                                                                                type: "string"
                                                                            },
                                                                            thumbnail: {
                                                                                type: "string"
                                                                            },
                                                                            priority: {
                                                                                type: "number"
                                                                            },
                                                                            catalog: {
                                                                                type: "object",
                                                                                properties: {
                                                                                    code: {
                                                                                        type: "string"
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    selected: {
                                                        type: "object",
                                                        properties: {
                                                            name: {
                                                                type: "string"
                                                            },
                                                            code: {
                                                                type: "string"
                                                            },
                                                            color: {
                                                                type: "string"
                                                            },
                                                            size: {
                                                                type: "string"
                                                            },
                                                            price: {
                                                                type: "object",
                                                                properties: {
                                                                    currencyIso: {
                                                                        type: "string"
                                                                    },
                                                                    formattedValue: {
                                                                        type: "string"
                                                                    },
                                                                    value: {
                                                                        type: "number"
                                                                    }
                                                                }
                                                            },
                                                            stock: {
                                                                type: "object",
                                                                properties: {
                                                                    stockLevelStatus: {
                                                                        type: "string"
                                                                    },
                                                                    stockLevel: {
                                                                        type: "number"
                                                                    }
                                                                }
                                                            },
                                                            medias: {
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
                                                                        main: {
                                                                            type: "string"
                                                                        },
                                                                        thumbnail: {
                                                                            type: "string"
                                                                        },
                                                                        priority: {
                                                                            type: "number"
                                                                        },
                                                                        catalog: {
                                                                            type: "object",
                                                                            properties: {
                                                                                code: {
                                                                                    type: "string"
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
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
    }
};