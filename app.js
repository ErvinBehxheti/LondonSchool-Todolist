const inputField = document.querySelector("#inputField");
const form = document.querySelector("#myForm");
const ul = document.querySelector("#myList");
let inputValue;
const storedValue = JSON.parse(localStorage.getItem("inputValue"));
const todosArray = [...storedValue];
inputField.addEventListener("input", function (event) {
  inputValue = event.target.value;
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Vlera e inputit: " + inputValue);
  inputField.value = "";
  const li = document.createElement("li");
  li.setAttribute("class", "list-item");
  li.textContent = inputValue;
  ul.appendChild(li);
  todosArray.push(inputValue);
  localStorage.setItem("inputValue", JSON.stringify(todosArray));
});

for (let i = 0; i < storedValue.length; i++) {
  const li = document.createElement("li");
  li.setAttribute("class", "list-item");
  li.textContent = storedValue[i];
  ul.appendChild(li);
}
