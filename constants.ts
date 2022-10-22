const list = new Array(10).fill(undefined).map((val, index) => ({
  id: index,
  name: `name${index}`,
}));

export {list};
