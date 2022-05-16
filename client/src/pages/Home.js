import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColls } from "../redux/features/collSlice";
import CardColl from "../components/CollCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const { colls, loading } = useSelector((state) => ({ ...state.coll }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColls());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="back">
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "1000px",
          alignContent: "center",
          marginBottom: "57.6px",
        }}
      >
        <MDBRow className="mt-5">
          {colls.lenght === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Collections Found
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {colls &&
                  colls.map((item, index) => (
                    <CardColl key={index} {...item} />
                  ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default Home;
