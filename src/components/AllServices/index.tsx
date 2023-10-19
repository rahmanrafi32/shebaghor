import ServiceCard from "@/components/ServiceCard";
import {Service} from "@/interfaces/common";

type AllServicesProps = {
    allServices: Service[]; // Array of Service type
};

const AllServices = ({allServices}: AllServicesProps) => {
    return (
        <ServiceCard serviceType={'All Services'} serviceData={allServices}/>
    );
};

export default AllServices;
