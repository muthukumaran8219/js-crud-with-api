let editvalue;

window.onload = () => {
    edit();
}

function male() {
    document.getElementById("female").checked = false;
}

function female() {
    document.getElementById("male").checked = false;
}

async function edit() {
    try {
        const urlString = window.location.href.toLowerCase();
        const url = new URL(urlString);
        editvalue = url.searchParams.get("id");

        if (!editvalue) {
            console.error("No ID found in the URL");
            return;
        }

        const apiUrl = `https://6676a0e9145714a1bd725083.mockapi.io/student/${editvalue}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error fetching student data: ${response.statusText}`);
        }

        const student = await response.json();
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("number").value = student.number;
        document.getElementById("password").value = student.password;
        document.getElementById("c_password").value = student.c_password;

        if (student.gender === "male") {
            document.getElementById("male").checked = true;
        } else if (student.gender === "female") {
            document.getElementById("female").checked = true;
        } else {
            document.getElementById("male").checked = false;
            document.getElementById("female").checked = false;
        }

        document.getElementById("language").value = student.language;
        document.getElementById("date").value = student.date;
    } catch (error) {
        console.error('Error:', error);
    }
}

function submit() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const password = document.getElementById("password").value.trim();
    const c_password = document.getElementById("c_password").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const language = document.getElementById("language").value.trim();
    const date = document.getElementById("date").value;

    let hasError = false;

    if (name.length < 3) {
        document.getElementById("name_req").innerHTML = "Name required**";
        document.getElementById("name").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("name_req").innerHTML = "";
        document.getElementById("name").style.border = "2px solid green";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("email_req").innerHTML = "Email required**";
        document.getElementById("email").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("email_req").innerHTML = "";
        document.getElementById("email").style.border = "2px solid green";
    }

    if (number.length !== 10) {
        document.getElementById("num_req").innerHTML = "Number required**";
        document.getElementById("number").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("num_req").innerHTML = "";
        document.getElementById("number").style.border = "2px solid green";
    }

    if (password.length < 5 || password.length > 20) {
        document.getElementById("password_req").innerHTML = "Password must be between 5 and 20 characters**";
        document.getElementById("password").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("password_req").innerHTML = "";
        document.getElementById("password").style.border = "2px solid green";
    }

    if (c_password !== password) {
        document.getElementById("c_password_req").innerHTML = "Password does not match**";
        document.getElementById("c_password").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("c_password_req").innerHTML = "";
        document.getElementById("c_password").style.border = "2px solid green";
    }

    if (!gender) {
        document.getElementById("gender_req").innerHTML = "Gender required**";
        hasError = true;
    } else {
        document.getElementById("gender_req").innerHTML = "";
    }

    if (!language) {
        document.getElementById("lang_req").innerHTML = "Language required**";
        document.getElementById("language").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("lang_req").innerHTML = "";
        document.getElementById("language").style.border = "2px solid green";
    }

    if (!date) {
        document.getElementById("dob_req").innerHTML = "Date of birth required**";
        document.getElementById("date").style.border = "2px solid red";
        hasError = true;
    } else {
        document.getElementById("dob_req").innerHTML = "";
        document.getElementById("date").style.border = "2px solid green";
    }

    if (hasError) {
        return false;
    }

    const studentData = {
        name,
        email,
        number,
        password,
        c_password,
        gender,
        language,
        date
    };

    sendData(studentData);
    return false;
}

async function sendData(data) {
    try {
        const apiUrl = editvalue 
            ? `https://6676a0e9145714a1bd725083.mockapi.io/student/${editvalue}`
            : "https://6676a0e9145714a1bd725083.mockapi.io/student";
        
        const method = editvalue ? "PUT" : "POST";
        const response = await fetch(apiUrl, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        window.location.href = "table.html";
    } catch (error) {
        console.error('Error:', error);
    }
}

function cancel() {
    window.location.href = "table.html";
}
