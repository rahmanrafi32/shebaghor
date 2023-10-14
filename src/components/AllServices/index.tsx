import ServiceCard from "@/components/ServiceCard";

const AllServices = ({allServices}: any) => {
    return (
        <ServiceCard serviceType={'All Services'} serviceData={allServices}/>
    );
};

export default AllServices;
