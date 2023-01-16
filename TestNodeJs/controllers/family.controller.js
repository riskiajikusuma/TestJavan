const { resource, resources } = require("../transforms/family.transform");

async function getFamilies(req, res) {
  try {
    const families = await this.getFamilies({
      includes: [
        {
          model: this.db.models.Person,
          as: "people",
        },
      ],
    });
    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: resources(families),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function getFamily(req, res) {
  try {
    const family = await this.getFamily({
      selection: { id: req.params.id },
      options: {
        order: [["created_at", "DESC"]],
      },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: resource(family),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function createFamily(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    await this.createFamily({
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

async function updateFamily(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    await this.updateFamily({
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

async function deleteFamily(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const family = await this.getFamily({
      selection: { id: req.params.id },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    await this.deleteFamily({
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
  getFamilies,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
};
