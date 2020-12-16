import { gql } from '@apollo/client';

export const ADMIN_LIST_CATEGORIES = gql`
    query AdminListCategories($page: Int, $perPage: Int) {
        adminListCategories(page: $page, perPage: $perPage) {
            docs {
                _id
                name
                code
                image
            }
            totalDocs
        }
    }
`;
export const LIST_SALE_REGIONS = gql`
    query ListSaleRegions {
        listSaleRegions {
            _id
            name
        }
    }
`;

export const AMIN_LIST_BRANCHES = gql`
    query AdminListBranches {
        adminListBranches {
            _id
            name
        }
    }
`;
export const ADMIN_LIST_CUSTOMER = gql`
    query AdminListCustomer($page: Int, $perPage: Int, $orderBy: QueryCustomerOrderBy, $orderDir: QueryOrderByDirection){
        adminListCustomer(page: $page, perPage: $perPage, orderBy: $orderBy, orderDir: $orderDir) {
            docs {
                _id
                email
                name
            }
            totalDocs
            totalPages
        }
    }
`;
export const ADMIN_SEARCH_CUSTOMER = gql`
    query AdminSearchCustomer($keyword: String!, $page: Int, $perPage: Int, $orderBy: QueryCustomerOrderBy, $orderDir: QueryOrderByDirection ) {
        adminSearchCustomer(keyword: $keyword, page: $page, perPage: $perPage, orderBy: $orderBy, orderDir: $orderDir){
            docs {
                _id
                name
                email
            }
        }
    }
`;
export const ADMIN_LIST_ORDERS = gql`
    query AdminListOrders {
        adminListOrders {
            totalDocs
            totalPages
            docs {
                _id
                orderCode
                discountCode
              	discountType
              	discountValue
                status
                totalAmount
                sellDate
                shippingAddress {
                    addressNo
                    ward {
                        _id
                        name
                    }
                    district {
                        _id
                        name
                    }
                    city {
                        _id
                        name
                    }
                }
                shippingStatus
                createdBy {
                    _id
                    name
                    email
                }
                customer {
                    _id
                    name
                }
                details {
                    product {
                        name
                    }
                    quantity
                }
            }
        }
    }
`;
export const LIST_PRODUCTS = gql`
    query ListProducts($category: ID!, $saleRegion: ID!, $page: Int!, $perPage: Int!) {
        listProducts(category: $category, saleRegion: $saleRegion, page: $page, perPage: $perPage){
            docs {
                _id
                name
                description
                sku
                salePrice
                category {
                    _id
                    name
                }
                images
                quantity
                appliedTax
                buyPriceExcTax
                buyPriceIncTax
                salePriceInRegions {
                    salePrice
                    saleRegion {
                        name
                        _id
                    }
                }
            }
        }
    }
`;
export const ADMIN_LIST_PRODUCTS = gql`
    query AdminListProducts($page: Int, $perPage: Int, $orderBy: QueryProductOrderBy, $orderDir: QueryOrderByDirection) {
        adminListProducts(page: $page, perPage: $perPage, orderBy: $orderBy, orderDir: $orderDir) {
            totalDocs
            docs {
                _id
                name
                description
                sku
                salePrice
                category {
                    _id
                    name
                }
                images
                quantity
                appliedTax
                buyPriceExcTax
                buyPriceIncTax
                salePriceInRegions {
                    salePrice
                    saleRegion {
                        _id
                        name
                    }
                }
        }
    }
    }
`;
export const ADMIN_CREATE_PRODUCT =  gql`
    mutation AddCreateProduct($adminCreateProductInput: AdminCreateProductInput!){
        adminCreateProduct(adminCreateProductInput: $adminCreateProductInput) {
            _id
            name
        }
    }
`;
export const ADMIN_UPDATE_PRODUCT =  gql`
    mutation AdminUpdateProduct($id: ID!, $adminUpdateProductInput: AdminUpdateProductInput!){
        adminUpdateProduct(id: $id, adminUpdateProductInput: $adminUpdateProductInput) {
            _id
            name
        }
    }
`;
// ========================= Category =========================

export const ADMIN_CREATE_CATEGORY = gql`
    mutation AdminCreateCategory($adminCreateCategoryInput: AdminCreateCategoryInput!){
        adminCreateCategory(adminCreateCategoryInput: $adminCreateCategoryInput){
            _id
            name
        }
    }
`;

export const ADMIN_UPDATE_CATEGORY = gql`
    mutation AdminUpdateCategory($id: ID!, $adminUpdateCategoryInput: AdminUpdateCategoryInput!){
        adminUpdateCategory(id: $id, adminUpdateCategoryInput: $adminUpdateCategoryInput){
            _id
            name
        }
    }

`;

// ========================= Coupon =========================
export const GET_COUPONS = gql`
    query AdminListCoupon {
        adminListCoupon {
            docs {
                _id
                name
                code
                discountType
                discountValue
                startDate
                endDate
                isActive
                remainingCount
                createdAt
                onlyForCustomers {
                    _id
                    email
                }
            }
            totalDocs
  	        totalPages
        }
    }
`;
export const ADMIN_CREATE_COUPON = gql`
    mutation AdminCreateCoupon($adminCreateCouponInput: AdminCreateCouponInput!){
        adminCreateCoupon(adminCreateCouponInput: $adminCreateCouponInput){
            _id
            name
            code
        }
    }
`;

export const ADMIN_UPDATE_COUPON = gql`
    mutation AdminUpdateCoupon($id: ID!, $adminUpdateCouponInput: AdminUpdateCouponInput!){
        adminUpdateCoupon(id: $id, adminUpdateCouponInput: $adminUpdateCouponInput){
            _id
            name
            isActive
        }
    }
`;
export const ADMIN_DELETE_COUPON = gql`
    mutation AdminDeleteCoupon($id: ID!) {
        adminDeleteCoupon(id: $id)
    }
`;

export const ADMIN_ADD_CUSTOMER_TO_COUPON = gql`
    mutation AdminAddCutomerToCoupon($id: ID!, $customer: ID!) {
        adminAddCustomerToCoupon(id: $id, customer: $customer){
            _id
            onlyForCustomers {
                _id
                name
            }
            name
        }
    }
`;
export const ADMIN_REMOVE_CUSTOMER_FROM_COUPON = gql`
    mutation AdminRemoveCutomerFromCoupon($id: ID!, $customer: ID!) {
        adminRemoveCustomerFromCoupon(id: $id, customer: $customer){
            _id
            onlyForCustomers {
                _id
                name
            }
            name
        }
    }
`;
// ========================= End Coupon =========================
export const ADMIN_GET_PRODUCT = gql`
    query AdminGetProduct($id: ID!){
        adminGetProduct(id: $id){
            _id
            name
            description
            sku
            barcodeType
            salePriceType
            salePrice
            branches {
                _id
                name
            }
            category {
                _id
                name
            }
            images
            quantity
            appliedTax
            buyPriceExcTax
            buyPriceIncTax
            salePriceInRegions {
                salePrice
                saleRegion {
                        name
                        _id
                }
            }
        }
    }
`;

export const ADMIN_LIST_DRIVERS = gql`
    query AdminListDrivers($page: Int, $perPage: Int, $orderBy: QueryUserOrderBy,$orderDir: QueryOrderByDirection){
        adminListDrivers(page: $page, perPage: $perPage, orderBy: $orderBy, orderDir: $orderDir){
            docs {
                _id
                email
                name
                phone
            }
            totalDocs
        }
    }
`;

export const ADMIN_ASSIGN_BRANCH_TO_ORDER = gql`
    mutation AdminAssignBranchToOrder($id: ID!, $branch: ID!){
        adminAssignBranchToOrder(id: $id, branch:$branch){
            branch {
                name
                address {
                    addressNo
                ward {
                    name
                }
                district {
                    name
                }
                city {
                    name
                }
              }
            }
        }
    }
`

export const ADMIN_ASSIGN_ORDER_TO_DRIVER = gql`
    mutation AdminAssignOrderToDriver($id: ID!, $driver: ID!){
        adminAssignOrderToDriver(id: $id, driver: $driver){
                driver {
                    _id
                    name
                    email
                }
            }
    }
`;
export const ADMIN_GET_ORDER = gql`
    query AdminGetOrder($id: ID!) {
        adminGetOrder(id: $id){
            orderCode
            saleRegion {
                name
            }
            discountCode
            discountType
            discountValue
            details {
            product {
                _id
                images
                name
                salePrice
            }
            quantity 
            }
            totalAmount
            totalAmountAfterDiscounted
            branch {
                name
                address {
                    addressNo
                ward {
                    name
                }
                district {
                    name
                }
                city {
                    name
                }
              }
            }
            shippingAddress {
                addressNo
                ward {
                    name
                }
                district{
                    name
                }
                city {
                    name
                }
                }
            driver {
                _id
                name
                email
            }
            
        }
    }
`;
