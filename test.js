let obj = [
  { id: 1, descripcion: "Uno" },
  { id: 2, descripcion: "Dos" },
  { id: 3, descripcion: "Tres" },
];

let newObj = [];

for (let i = 0; i < obj.length; i++) {
  newObj.push(obj[i].id);
}

console.log(newObj);
