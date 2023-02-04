import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../services";

export function EditItem() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [tempItem, setTempItem] = useState(); 
  const [changed, setChanged] = useState(false); 

  useEffect(() => {
      console.log("item", item); 
      console.log("temp item", tempItem);
      console.log(changed);
  })

  useEffect(() => {
      const getItem = () => {
        services.productService
          .fetchOne(id)
          .then((item) => {
            setItem(item);
            setTempItem(item);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getItem();
    }, [id]);

    const updateItem = async (id) => {
        await fetch(`http://localhost:5050/items/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tempItem)
        });
        setChanged(false); 
        navigate("/admin?updated=1");
    } 


  return (
    <div className="page-container">
      <Header />
      {item ? (
      <article className="main">
        <div className="container">
          <Link to="/" className="back-link">
            {" "}
            &#171; BACK
          </Link>
          <div className="spacer-20"></div>
          <h2>Edit item</h2>
          <div className="form-control">
              <div>
                <label>TITLE</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.title}
                  name="title"
                  maxlength="50"
                  onChange={(e) => {
                      setChanged(true); 
                      setTempItem({
                        ...tempItem, 
                        title: e.target.value});
                      }}
                />
              </div>
              <div>
                <label>DESCRIPTION</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.description}
                  name="description"
                  maxlength="500"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      description: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>IMAGE</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.image}
                  name="image"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      image: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>LOCATION</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.location}
                  name="location"
                  maxlength="30"
                  onChange={(e) => {
                    setChanged(true); 
                    setTempItem({
                      ...tempItem, 
                      location: e.target.value});
                    }}
                />
              </div>
              <div>
                <label>CONTACT INFO</label>
              </div>
              <div>
                <input
                  type="text"
                  value={tempItem.contact}
                  name="contact"
                  maxlength="30"
                  onChange={(e) => {
                    setChanged(true);
                    setTempItem({
                      ...tempItem, 
                      contact: e.target.value});
                    }}
                />
              </div>
              { changed ? 
              <div>
                <button 
                    className="modal-cancel"
                    onClick={(e) => { 
                    setTempItem({...item});
                    setChanged(false);
                    }}
                >
                  Cancel
                </button>
                <button className="btn-taken" onClick={() => updateItem(tempItem.id)}>
                  Save changes
                </button>
                
              </div> : null }
          </div>
        </div>
      </article>
      ) : null}
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}
