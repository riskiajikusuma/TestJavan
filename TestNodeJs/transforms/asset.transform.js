const resource = (data) => {
  return {
    id: data.id,
    asset: data.asset,
    harga: data.harga,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at: data.deleted_at,
  };
};

const resources = (datas) => {
  const result = [];
  datas.forEach((data) => {
    result.push(resource(data));
  });
  return result;
};

module.exports = {
  type: "object",
  properties: {
    id: { type: "integer" },
    asset: { type: "string" },
    harga: { type: "integer" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    deleted_at: { type: "string" },
  },
  resource,
  resources,
};
