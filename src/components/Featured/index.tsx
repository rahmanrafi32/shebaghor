import ServiceCard from "@/components/ServiceCard";
import {Service} from "@/interfaces/common";

type FeaturedServicesProps = {
    featuredServices: Service[];
};

const FeaturedService = ({featuredServices}: FeaturedServicesProps) => {
    return (
        <ServiceCard
            serviceType={'Featured Services'}
            serviceData={featuredServices}
        />
    );
};

export default FeaturedService;
