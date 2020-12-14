import { gql } from '@apollo/client';

export const typeDefs = gql`

    extend enum QueryCustomerOrderBy {
        name
        createdAt
    }
    extend enum QueryOrderByDirection {
        asc
        desc
    }
    extend enum DiscountType {
        fixed
        percentage
    }
    extend type GIS {
        _id: ID!
        name: String!
    }
    extend type SalePriceInRegionsInput {
        saleRegion: ID!
        salePrice: Int!
    }

    extend type AdminUpdateCouponInput {
        name: String
        code: String
        discountType: DiscountType
        discountValue: Int
        startDate: Date
        endDate: Date
        onlyForCustomers: [ID!]
        remainingCount: Int
        isActive: Boolean
    }

    extend type AdminCreateCouponInput {
        name: String!
        code: String!
        discountType: DiscountType!
        discountValue: Int!
        startDate: Date
        endDate: Date
        onlyForCustomers: [ID!]
        remainingCount: Int!
        isActive: Boolean!
    }

    extend type AdminUpdateCategoryInput {
        name: String
        code: String
        description: String
        parent: ID
    }
    extend type AdminCreateProductInput {
        name: String!
        description: String
        sku: String
        barcodeType: BarcodeType!
        quantity: Int!
        brand: ID
        category: ID
        subCategory: ID
        branches: [ID]
        allowManageInStock: Boolean
        minInventory: Int
        image: String
        video: String
        notForSale: Boolean
        weight: Float
        isNewProduct: Boolean!
        isFeatured: Boolean!
        relatedPost: String
        relatedProducts: [ID!]
        appliedTax: String
        productType: ProductType!
        variationProductId: ID
        buyPriceExcTax: Int!
        buyPriceIncTax: Int!
        profitMargin: Int
        salePriceType: SalePriceType!
        salePrice: Int!
        salePriceInRegions: [SalePriceInRegionsInput!]
    }
    extend type AdminUpdateProductInput {
        name: String
        description: String
        sku: String
        barcodeType: BarcodeType
        quantity: Int
        brand: ID
        category: ID
        subCategory: ID
        branches: [ID]
        allowManageInStock: Boolean
        minInventory: Int
        image: String
        video: String
        notForSale: Boolean
        weight: Float
        isNewProduct: Boolean
        isFeatured: Boolean
        relatedPost: String
        relatedProducts: [ID!]
        appliedTax: String
        productType: ProductType
        variationProductId: ID
        buyPriceExcTax: Int
        buyPriceIncTax: Int
        profitMargin: Int
        salePriceType: SalePriceType
        salePrice: Int
    }
    extend type AdminCreateCategoryInput {
        name: String!
        code: String
        description: String
        parent: ID
    }
    extend type AdminCreateCategoryInput {
        name: String!
        code: String
        description: String
        parent: ID
    }
`;