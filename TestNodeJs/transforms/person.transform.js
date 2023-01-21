const assetTransform = require("./asset.transform");

const resource = (data) => {
  return {
    id: data.id,
    nama: data.nama,
    jenis_kelamin: data.jenis_kelamin,
    keluarga: data.family,
    assets: data.assets,
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
    nama: { type: "string" },
    jenis_kelamin: { type: "string" },
    keluarga: { type: "object" },
    assets: {
      type: "array",
      items: {
        assetTransform,
      },
    },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    deleted_at: { type: "string" },
  },
  resource,
  resources,
};
