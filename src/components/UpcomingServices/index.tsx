import ServiceCard from "@/components/ServiceCard";
import {Service} from "@/interfaces/common";

type UpcomingServicesProps = {
    upcomingServices: Service[]; // Array of Service type
};

const UpcomingServices = ({upcomingServices}:UpcomingServicesProps) => {
    return (
        <ServiceCard
            serviceType={'Upcoming Services'}
            serviceData={upcomingServices}
        />
    );
};

export default UpcomingServices;
