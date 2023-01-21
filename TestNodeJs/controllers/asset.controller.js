const { resource, resources } = require("../transforms/asset.transform");

async function getAssets(req, res) {
  try {
    const assets = await this.getAssets();
    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: resources(assets),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function getAsset(req, res) {
  try {
    const asset = await this.getAsset({
      selection: { id: req.params.id },
    });

    if (!asset) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    return {
      statusCode: 200,
      message: this.lang("getSuccess"),
      data: resource(asset),
    };
  } catch (err) {
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function createAsset(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    await this.createAsset({
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

async function updateAsset(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const asset = await this.getAsset({
      selection: { id: req.params.id },
    });

    if (!asset) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    await this.updateAsset({
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

async function deleteAsset(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const asset = await this.getAsset({
      selection: { id: req.params.id },
    });

    if (!asset) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("dataNotFound"),
      });
    }

    await this.deleteAsset({
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
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
