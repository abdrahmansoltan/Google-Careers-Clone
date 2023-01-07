const nextElementInList = (list, value) => {
  const currentValueIndex = list.indexOf(value);
  const nextValueIndex = (currentValueIndex + 1) % list.length; // to make sure we have an index in the range of the list array
  return list[nextValueIndex];
};

export default nextElementInList;
