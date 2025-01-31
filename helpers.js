//Define helpers for common operators and expressions

const mongo_query_operators = [
  "gt",
  "gte",
  "lt",
  "lte",
  "not",
  "ne",
  "in",
  "nin",
  "and",
  "regex",
  "or",
  "nor",
  "exists",
  "elemMatch",
  "expr",
  "jsonSchema",
  "size",
  "type",
];

for (let op of mongo_query_operators) {
  this[op] = function () {
    if (arguments.length == 1) {
      return { [`$${op}`]: arguments[0] };
    } else {
      return { [`$${op}`]: [...arguments] };
    }
  };
}
