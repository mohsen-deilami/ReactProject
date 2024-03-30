import React, { useEffect, useState } from "react";
import "./Category.css";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from 'sweetalert'
import Input from '../../../Components/Form/Input'
import {useForm} from '../../../hooks/useForm'
import { minValidator, maxValidator} from "../../../validators/Rules"

export default function Category() {
  const [allCategory, setAllCategory] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories()
  }, []);

function getAllCategories (){
  fetch("http://localhost:4000/v1/category", {})
  .then((res) => res.json())
  .then(categories => 
    setAllCategory(categories)
  );
}

  const updateCategory = (categoryId)=>{    
    console.log(categoryId);
    const localStorageData = JSON.parse(localStorage.getItem("user"));                                 //// update
    swal({
        title:'New title',
        content:'input',
       icon:'warning',
       buttons:'Submit'
    }).then((result)=>{
      if(result){
      if (result.trim().length) {
      fetch(`http://localhost:4000/v1/category/${categoryId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Beare ${localStorageData.token}`
        },
        body:JSON.stringify({
            title: result,
            name:result
          })
          
        })
        .then((res) => res.json())
        .then(res=>{
            swal({
              title: "Category updated successfully  ",
              icon: "success",
              buttons: "Ok",
            })
           
            getAllCategories()
         
          
        })
      }}
    }
    )
  } 

       

  const createNewCategory = (event) => {                         /////  add category
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

  const newCategoryInfo = {
    title: formState.inputs.title.value,
    name: formState.inputs.shortname.value,
  }

  fetch("http://localhost:4000/v1/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageData.token}`,
    },
    body: JSON.stringify(newCategoryInfo),
  })
    .then((res) => res.json())
    .then(() => {
     
      swal({
        title: "Category has successfully registered on the site",
        icon: "success",
        buttons: "Ok",
      }).then(() => {
        getAllCategories();
      });
    });
};
const removeCategory =(categoryId)=>{                                ///////////  delete
  const localStorageData = JSON.parse(localStorage.getItem("user"));    
swal({
  title:'Are you sure to delete this category?',
  icon:'warning',
  buttons:['No' ,'Yes']
}).then(result => {
  if (result) {
fetch(`http://localhost:4000/v1/category/${categoryId}`,{
  method:'DELETE',
  headers:{
"Authorization": `Beare ${localStorageData.token}`
},
}).then((res) => res.json())
.then((result) => {
    swal({
      title: "Category deleted successfully  ",
      icon: "success",
      buttons: "Ok",
    }).then(() => {
      getAllCategories();
    });
  });
}
});
}

  return (
    <>
        <div class="container">
    <div class="container-fluid" id="home-content">
          <div class="home-title">
            <span>Add New Category</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
          
                <label class="input-title">Title</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="Please enter title..."
                  validations={[ minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">Short Name </label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="Please enter short name..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form category__btns">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="Add"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="Categories">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCategory &&
              allCategory.map((category , index) => (
                <tr>
             
                  <td>{index +1}</td>
                  <td>{category.title}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={()=>updateCategory(category._id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={()=>removeCategory(category._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
