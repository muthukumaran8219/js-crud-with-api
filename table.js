window.onload = () => {
    table();
  };
  let student = [];
  let editvalue;
  let studentDetails = {};
  
  
  async function table(){
    let url = "https://6676a0e9145714a1bd725083.mockapi.io/student";
      await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((Result) => Result.json())
        .then((res) => {
          console.log(res);
          student = res;
          console.log(student);
        })
        .catch((errorMsg) => {
          console.log(errorMsg);
        });
  
      let k=""
      for( i = 0; i < student.length; i++){
        k += "<tr>"
        k += "<td>" + student[i].name + "</td>"
        k += "<td>" + student[i].email + "</td>"
        k += "<td>" + student[i].number + "</td>"
        k += "<td>" + student[i].password+ "</td>"
        k += "<td>" + student[i].c_password+ "</td>"
        k += "<td>" + student[i].gender+ "</td>"
        k += "<td>" + student[i].language+ "</td>"
        k += "<td>" + student[i].date+ "</td>"
        k += '<td> <button type="button" class="btn btn-primary" onclick= "edit('+ student[i].id +')">Edit</button>   <button type="button" class="btn btn-danger" onclick= "Delete('+ student[i].id +')">Delete</button></td>';
        k += "</tr>"
      }
      document.getElementById("tabledata").innerHTML = k;
    }
  
    
  
  function edit(id) {
      editvalue = id;
      window.location.href = "form.html?id=" + id;
  }
  function back(){
    window.location.replace('form.html');
  }
  function add(){
    window.location.replace('form.html');
  }
  
  function Delete(id) {
    let url ="https://6676a0e9145714a1bd725083.mockapi.io/student" ;
    fetch(url + "/" + id , {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((Result) => Result.json())
      .then((string) => {
        console.log(string);
        table();
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  }