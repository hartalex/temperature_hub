export async function isTypeObject(val, valueName) {
  if (val === null || typeof val !== "object") {
    throw valueName + " is not an object";
  }
}

export async function isTypeString(val, valueName) {
  if (typeof val !== "string") {
    throw valueName + " is not a string";
  }
}

export async function isTypeNumber(val, valueName) {
  if (val === null || typeof val !== "number") {
    throw valueName + " is not a number";
  }
}

export async function isTypeBoolean(val, valueName) {
  if (val === null || typeof val !== "boolean") {
    throw valueName + " is not a boolean";
  }
}

export async function isNotNull(val, valueName) {
  if (val === null) {
    throw valueName + " is null";
  }
}

export async function isNotUndefined(val, valueName) {
  if (typeof val === "undefined") {
    throw valueName + " is undefined";
  }
}

export async function stringHasLength(val, valueName) {
  if (!val || !val.length || val.length <= 0) {
    throw valueName + " is an empty string";
  }
}

export async function hasProperty(val, property) {
  if ((!val && typeof val !== "boolean") || !(property in val)) {
    throw "Property " + property + " is missing";
  }
}
