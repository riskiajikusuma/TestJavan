module.exports.inputArray = (field1, field2, id_field1, arr) => {
  let result = [];
  if (arr !== [null]) {
    arr.forEach((data) => {
      result.push({
        [field1]: id_field1,
        [field2]: data,
      });
    });
  } else {
    return {
      [field1]: id_field1,
      [field2]: null,
    };
  }
  return result;
};
