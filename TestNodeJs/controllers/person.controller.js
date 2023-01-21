const { resource, resources } = require("../transforms/person.transform");

async function getPeople(req, res) {
  try {
    const people = await this.getPeople({
      includes: [
        {
          model: this.db.models.Family,
          as: "family",
        },
      ],
    });
    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: resources(people),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function getPerson(req, res) {
  try {
    const person = await this.getPerson({
      selection: { id: req.params.id },
      includes: [
        {
          model: this.db.models.Family,
          as: "family",
        },
        {
          model: this.db.models.Asset,
          as: "assets",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!person) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    let total_price = 0;
    person.assets.forEach((data) => {
      total_price += data.harga;
    });

    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: {
        ...resource(person),
        assets_price: total_price,
      },
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function createPerson(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const family = await this.getFamily({
      selection: { id: req.body.family_id },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("familyNotFound"),
      });
    }

    await this.createPerson({
      data: {
        ...req.body,
      },
      options: transaction,
    });

    await transaction.commit();
    return {
      statusCode: 200,
      message: this.lang("createSuccess"),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function updatePerson(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const person = await this.getPerson({
      selection: { id: req.params.id },
    });

    if (!person) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    const family = await this.getFamily({
      selection: { id: req.body.family_id },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("familyNotFound"),
      });
    }

    await this.updatePerson({
      selection: { id: req.params.id },
      data: {
        ...req.body,
      },
      options: { transaction },
    });

    await transaction.commit();
    return {
      statusCode: 200,
      message: this.lang("updateSuccess"),
    };
  } catch (err) {
    await transaction.rollback();
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function deletePerson(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const person = await this.getPerson({
      selection: { id: req.params.id },
    });

    if (!person) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    await this.deletePerson({
      selection: { id: req.params.id },
      options: { transaction },
    });

    await transaction.commit();
    return {
      statusCode: 200,
      message: this.lang("deleteSuccess"),
    };
  } catch (err) {
    await transaction.rollback();
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

module.exports = {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
