import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createColl } from "../redux/features/collSlice";
import { updateColl } from "../redux/features/collSlice";
import Spinner from "../components/Spinner"

const initialState = {
  title: "",
  description: "",
  topic: "",
  tags: [],
  items: [],
};

const AddColl = () => {
  const [collData, setCollData] = useState(initialState);
  const { error, loading, userColls } = useSelector((state) => ({
    ...state.coll,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, topic, tags , items} = collData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singelColl = userColls.find((coll) => coll._id === id);
      console.log(singelColl);
      setCollData({ ...singelColl });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && topic && tags && items) {
      const updatedCollData = { ...collData, name: user?.result?.name };

      if (!id) {
        dispatch(createColl({ updatedCollData, navigate, toast }));
      } else {
        dispatch(updateColl({ id, updatedCollData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCollData({ ...collData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setCollData({ ...collData, tags: [...collData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setCollData({ ...collData.tags.filter((tag) => tag !== deleteTag) });
  };

  const handleAddItem = (item) => {
    setCollData({ ...collData, items: [...collData.items, item] });
  };

  const handleDeleteItem = (deleteItem) => {
    setCollData({ ...collData.items.filter((item) => item !== deleteItem) });
  };

  const handleClear = () => {
    setCollData({ title: "", description: "", topic: "", tags: [] ,items: []});
  };

  if(loading){
    return <Spinner/>
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "80px",
        marginBottom: "115px"
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Collection" : "Add Collection"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Title"
                type="title"
                value={title}
                name="title"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <MDBTextArea
                label="Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                rows={3}
                required
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Topic"
                type="topic"
                value={topic}
                name="topic"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                placeholder="Enter tags"
                name="tags"
                variant="outlined"
                type="tags"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                placeholder="Enter items"
                name="items"
                variant="outlined"
                type="items"
                fullWidth
                value={items}
                onAdd={(item) => handleAddItem(item)}
                onDelete={(item) => handleDeleteItem(item)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setCollData({ ...collData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%",backgroundColor: "#355c7d" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" ,backgroundColor: "#ff7582"}}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddColl;
