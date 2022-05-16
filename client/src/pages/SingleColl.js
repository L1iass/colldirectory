import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getColl } from "../redux/features/collSlice";
import Spinner from "../components/Spinner";
import DisqusThread from "../components/DisqusThread";

const SingleColl = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { coll , loading } = useSelector((state) => ({ ...state.coll }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getColl(id));
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MDBContainer style={{marginBottom: "150px" ,marginTop:"50px"}}>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={coll.imageFile}
            alt={coll.title}
          />
          <MDBCardBody>
            <h3>{coll.title}</h3>
            <span>
              <p className="text-start collName">Created By: {user?.result?.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {coll && coll.tags && coll.tags.map((item) => `#${item}`)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-start mt-2">
                {moment(coll.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {coll.description}
            </MDBCardText>
            <br/>
            <span>
              <p className="text-start collName">Items: {coll && coll.items && coll.items.map((item) => ` ${item}`)}</p>
            </span>
          </MDBCardBody>
        </MDBCard>
        <DisqusThread id={id} title={coll.title} path={`/coll/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleColl;
