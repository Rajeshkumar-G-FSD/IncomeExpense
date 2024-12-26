var isEdit = false;
var currentUserId = null;

async function postData() {
  try {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var state = document.getElementById("state").value;
    var city = document.getElementById("city").value;

    if (isEdit == false) {
      await fetch("https://676a4e69863eaa5ac0ddefcd.mockapi.io/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          country: country,
          state: state,
          city: city,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      var content = document.getElementById("content");
      content.innerHTML = "";
      getData();
    } else {
      await fetch(
        `https://676a4e69863eaa5ac0ddefcd.mockapi.io/users/${currentUserId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: name,
            email: email,
            country: country,
            city: city,
            state: state,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      isEdit = false;
      currentUserId = null;
      getData();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("country").value = "IN";
      document.getElementById("state").value = "";
      document.getElementById("city").value = "";
    }
  } catch (error) {
    alert("Something Wentwrong");
  }
}

async function getData() {
  try {
    var userData = await fetch(
      "https://676a4e69863eaa5ac0ddefcd.mockapi.io/users"
    );
    var users = await userData.json();
    console.log(users);

    var filter = document.querySelector('input[name="filter"]:checked').value;
    
    // Filter users based on selected radio button
    if (filter === "in") {
      users = users.filter(user => user.country === "IN" && ["TN", "KL"].includes(user.state));
    } else if (filter === "us") {
      users = users.filter(user => user.country === "US" && ["Must", "Optional"].includes(user.state));
    }

    var content = document.getElementById("content");
    content.innerHTML = "";

    if (users.length == 0) {
      content.innerHTML = "No Users";
    }

    for (let index = 0; index < users.length; index++) {
      content.innerHTML += `<div class="bg-white rounded-lg shadow-md p-4 mb-3">
                <div class="flex justify-between items-center text-gray-600">
                  <div>
                    <p>Name : ${users[index].name}</p>
                    <p>Email : ${users[index].email}</p>
                    <p>Country : ${users[index].country}</p>
                    <p>State : ${users[index].state}</p>
                    <p>City : ${users[index].city}</p>
                  </div>
                  <div>
                    <button class="bg-blue-500 p-2 rounded-md text-white" onclick="getUserById(${users[index].id})">
                      Edit
                    </button>
                    <button class="bg-red-500 p-2 rounded-md text-white" onclick="deleteUser(${users[index].id})">
                      Delete
                    </button>
                  </div>
                </div>
              </div>`;
    }
  } catch (error) {
    alert("Something went wrong");
  }
}

async function getUserById(userId) {
  try {
    var userData = await fetch(
      `https://676a4e69863eaa5ac0ddefcd.mockapi.io/users/${userId}`
    );
    var user = await userData.json();

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("country").value = user.country;
    document.getElementById("state").value = user.state;
    document.getElementById("city").value = user.city;
    isEdit = true;
    currentUserId = userId;
  } catch (error) {
    alert("Something went wrong");
  }
}

async function deleteUser(userId) {
  try {
    var resp = confirm("Are you sure do you want to delete?");
    if (resp) {
      await fetch(
        `https://676a4e69863eaa5ac0ddefcd.mockapi.io/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      getData();
    }
  } catch (error) {
    alert("Something went wrong");
  }
}

getData();