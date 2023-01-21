async function createFamilyAssets(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const family = await this.getFamily({
      selection: {
        id: req.params.family_id,
      },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("familyNotFound"),
      });
    }

    const datas = [];
    req.body.asset_id.forEach(async (data) => {
      datas.push({
        family_id: req.params.family_id,
        asset_id: data,
      });
    });

    await this.createFamilyAssets({
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

async function deleteFamilyAssets(req, res) {
  let transaction = await this.db.transaction({ autocommit: false });

  try {
    const family = await this.getFamily({
      selection: {
        id: req.params.family_id,
      },
    });

    if (!family) {
      return res.code(400).send({
        statusCode: 400,
        message: this.lang("familyNotFound"),
      });
    }

    req.body.asset_id.forEach(async (data) => {
      await this.deleteFamilyAssets({
        selection: {
          family_id: req.params.family_id,
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
    return res.code(400).send({ statusCode: 400, message: err.messag });
  }
}

module.exports = {
  createFamilyAssets,
  deleteFamilyAssets,
};
