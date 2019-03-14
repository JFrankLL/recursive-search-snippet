const dataObj = {
  objects: {
    objectA: {
      name: "objectA",
      selected: true,
      objects: {
        subObjectA: {
          name: "subObjectA",
          selected: true,
          objects: {
            object1: { name: "object1", selected: false },
            object2: { name: "object2" },
            object3: { name: "object3", selected: true, cost: 100 },
            object4: { name: "object4", selected: false, cost: 100 },
            object5: {
              name: "object5",
              selected: true,
              objects: {
                obj: { name: "obj", selected: true, cost: 101 }
              }
            }
          }
        },
        subObjectsB: { name: "subObjectsB", selected: true, cost: 100 }
      }
    },
    objectB: { name: "objectB", selected: true, cost: 40 }
  }
};

// ----------------------------

function recursiveClosure(subObjectKey, condition) {
  return function(obj) {
    const objValues = Object.values(obj);

    const result = objValues
      .map(subObj => {
        if (subObj[subObjectKey]) {
          return Object.values(subObj)
            .map(internalObj =>
              recursiveClosure(subObjectKey, condition)(internalObj)
            )
            .reduce((a, b) => a.concat(b), []);
        } else if (condition(subObj)) {
          return subObj;
        } else {
          return null;
        }
      })
      .filter(obj => obj !== null)
      .reduce((a, b) => a.concat(b), []); // flat

    return result;
  };
}

// ----------------------------

function condition(obj) {
  return obj.cost > 100 || obj.cost < 50;
}

function recursive(object, fieldToRetrieve) {
  return recursiveClosure("objects", condition)(object);
}

const fieldToRetrieve = 'name';
const objects = recursive(dataObj.objects, "name");
const result = objects.map(({ [fieldToRetrieve]: field }) => field);

// ----------------------------

console.log(objects);
console.log(result);
