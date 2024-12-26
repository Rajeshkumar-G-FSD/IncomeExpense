async function getUserData() {
    var userData = await fetch(
      "https://676a4e69863eaa5ac0ddefcd.mockapi.io/users"
    );
    var users = await userData.json();
  
    var ul = document.createElement("ul");
  
    for (let index = 0; index < users.length; index++) {
      var li = document.createElement("li");
      li.innerHTML = users[index].name;
      ul.appendChild(li);
    }
  
    document.body.appendChild(ul);
  }
  
  async function postData() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
  
    await fetch(
      "https://676a4e69863eaa5ac0ddefcd.mockapi.io/users",
      {
        method: "POST",
        body: JSON.stringify({ name: name, age: age }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }
  
  getUserData();
  
  https://676a4e69863eaa5ac0ddefcd.mockapi.io/users