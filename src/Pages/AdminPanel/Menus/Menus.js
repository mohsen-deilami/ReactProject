import React, { useEffect, useState } from "react";
import "./Menus.css";
import swal from "sweetalert";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import { requiredValidator, minValidator} from "../../../validators/Rules";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
export default function Menus() {
  const [allCategory, setAllCategory] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuParent, setmenuParent] = useState("-1");
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const clearinput = () => {
    formState.inputs.title.value = "";
    formState.inputs.href.value = "";
  };
  useEffect(() => {
    getAllMenu();
  }, []);

  function getAllMenu() {
                                                                             //// Get All menu
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/menus/all`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allMenus) => {
        setMenus(allMenus);
      
      });
  }
  const deleteMenu = (menuId) => {
    /// Delete menu
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for delete this menu ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Beare ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "User deleted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              getAllMenu();
            });
          }
        });
      }
    });
  };

  const addNewMenu = (event) => {
                                                                                    /////add new menu
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newMenu = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === '-1' ? undefined : menuParent,
    };
  
    fetch("http://localhost:4000/v1/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newMenu),
    })
      .then((res) => {res.json()
      if(res.ok){
        swal({
          title: "Menu has successfully sumited",
          icon: "success",
          buttons: "Ok",
        }).then(() => {
          clearinput()
          getAllMenu();
        });
      }
    
    })
     
  };
  return (
    <div>
        <div className="container">
      <div className="home-content-edit" id="home-content">
      
          <div className="home-title">
            <span> Add a new Menu</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  Menu title
                </label>
                <Input
                  id="title"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(5)]}
                  type="text"
                  placeholder="Please enter the menu name..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">Menu duration</label>
                <Input
                  id="href"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(3)]}
                  type="text"
                  placeholder="Please enter the menu href..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="number input category__input">
                <label className="input-title category-title">category: </label>
                <select onChange={(event) => setmenuParent(event.target.value)}>
                  <option value={-1}>Please select your desired Menu</option>
                  {menus.map(
                    (menu) =>
                      !Boolean(menu.parent) && (
                        <option value={menu._id}>{menu.title}</option>
                      )
                  )}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    accept="video/*"
                    value="Add"
                    onClick={addNewMenu}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title=" Menues">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name and Famili</th>
              <th>Link</th>
              <th>Parent</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menus.length !== 0
              ? menus.map((menu, index) => (
                  <tr>
                    <td> {index + 1}</td>
                    <td>{menu.title}</td>
                    <td>{menu.href}</td>
                    <td>
                      {" "}
                      {menu.parent ? (
                        menu.parent.title
                      ) : (
                        <i className="fa fa-check"></i>
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => deleteMenu(menu._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
