export interface IMeta {
    limit: number
    page: number
    size: number
}
export type Service = {
    _id: string;
    name: string;
    image: string;
    price: string;
    category: string;
    whatsInclude: string[];
    whatsExclude: string[];
    details: string;
    serviceType: string;
    ratings: string;
    reviews: {
        reviewer: string,
        review: string
    }[];
    createdAt: string;
    updatedAt: string;
    id: string;
};
