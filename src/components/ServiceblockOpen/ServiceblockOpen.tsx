import "./ServiceblockOpen.scss";
import { useContext } from "react";
import { NewServiceBlockContext } from "../../context/ServiceBlockProvider";
// import { useNavigate } from "react-router-dom";
import { ServiceBlock } from "../../types/person";
import { useNavigate } from "react-router-dom";

function ServiceblockOpen() {
  const navigate = useNavigate();
  const { serviceBlockData } = useContext(NewServiceBlockContext);
  // const [test, setTest] = useState<ServiceBlock[]>();

  //   useEffect(() => {
  //     console.log("use effect by ServiceblockOpen");
  //     setTest(getServiceblockOpen());
  //     console.log(serviceBlockData);

  //     // setTest(serviceBlockData);
  //   }, [saveUpdatedServiceBlock]);

  function getServiceblockOpen(): ServiceBlock[] {
    const serviceblockOpen = serviceBlockData.filter((block) => {
      // return block.technician === null || block.date_of_action === null;
      // return block.technician === null || block.date_of_action === null || block.technician === 0 || block.date_of_action === "";
      return block.technician === null || block.date_of_action === null;
    });
    console.log(serviceblockOpen);
    // setTest(serviceBlockData);

    return serviceblockOpen;
  }

  //   function getServiceblockOpen() {
  //     const serviceblockOpen = serviceBlockData.filter((block) => {
  //       return block.technician === null || block.date_of_action === null;
  //     });
  //     // console.log(serviceblockOpen);
  //     setTest(serviceblockOpen);
  //     // return serviceblockOpen;
  //   }

  function serviceblockOpenSelect(block: number) {
    console.log("Block", block);
    navigate("/edit/serviceblock/" + block);
  }

  return (
    // <div>
    //   {test?.map((block) => {
    //     return <div key={block.id}>SB{block.id}</div>;
    //   })}
    // </div>
    <>
      {getServiceblockOpen().map((block) => {
        return (
          <div className="serviceblock-open" key={block.id} onClick={() => serviceblockOpenSelect(block.id)}>
            <div className="serviceblock-open__info">
              <p>SB{block.id}</p>
              <hr></hr>
              <p className="serviceblock-open__customer">{block.customer}</p>
              <p>{block.location}</p>
              <p>{block.note}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ServiceblockOpen;
