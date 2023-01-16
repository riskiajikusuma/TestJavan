const personTransform = require("./person.transform");

const resource = (data) => {
  return {
    id: data.id,
    kepala_keluarga: data.kepala_keluarga,
    anggota_keluarga: data.people,
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
    kepala_keluarga: { type: "string" },
    anggota_keluarga: {
      type: "array",
      items: personTransform,
    },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    deleted_at: { type: "string" },
  },
  resource,
  resources,
};
