const getUsers = async () => {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await resp.json();
    return users;
  } catch (error) {
    return undefined;
  }
};

const getFilter = () => document.getElementById("filters").value;

const getText = () => document.getElementById("textInput").value;

window.onload = () => {
  getUsers();
};

const displayResults = async () => {
  const users = await getUsers();
  document.getElementById("results").innerHTML = await users
    .map((user) =>
      user[getFilter()].includes(getText())
        ? `<li>${user[getFilter()]}</li>`
        : ""
    )
    .join("");
};

const displayResults2 = async () => {
  const users = await getUsers();
  document.getElementById("results2").innerHTML = await users
    .map(
      (user) =>
        `<li><a href="https://jsonplaceholder.typicode.com/users/${user.id}" target="_blank">${user.name}</a></li>`
    )
    .join("");
};

const displayResults3 = async () => {
  const users = await getUsers();
  document.getElementById("results3").innerHTML = await users
    .map(
      (user) =>
        `<li>${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})</li>`
    )
    .join("");
};
