async function createPersonAssets(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const person = await this.getPerson({
      selection: {
        id: req.params.person_id,
      },
    });

    if (!person) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("personNotFound"),
      });
    }

    const datas = [];
    req.body.asset_id.forEach(async (data) => {
      datas.push({
        person_id: req.params.person_id,
        asset_id: data,
      });
    });

    await this.createPersonAssets({
      data: datas,
      options: { transaction },
    });

    await transaction.commit();
    return {
      statusCode: 200,
      message: this.lang("createSuccess"),
    };
  } catch (err) {
    await transaction.rollback();
    return res.code(400).send({ statusCode: 400, message: err.message });
  }
}

async function deletePersonAssets(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const person = await this.getPerson({
      selection: {
        id: req.params.person_id,
      },
    });

    if (!person) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("personNotFound"),
      });
    }

    req.body.asset_id.forEach(async (data) => {
      await this.deletePersonAssets({
        selection: {
          person_id: req.params.person_id,
          asset_id: data,
        },
        options: { transaction },
      });
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
  createPersonAssets,
  deletePersonAssets,
};
