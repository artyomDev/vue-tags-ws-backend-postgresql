const client = require("./db.js");


const Tag = function() {
  this.name = "Valiu Tag";
}

Tag.create = async (newTag, result) => {
  try {
    const max = await client.query('SELECT max(id) FROM tags');
    let maxid = 1;
    if (max.rowCount == 1) {
      maxid = max.rows[0].max + 1;
    }
    
    const res = await client.query(
      "INSERT INTO tags VALUES ('"+maxid+"', '"+newTag.name+"', '"+newTag.color+"', NOW())"
    );
    
    result(null, { id: maxid, ...newTag });
  } catch (err) {
    result(err, null);
  };
};

Tag.updateById = async (Tag, result) => {
  try {
    const res = await client.query(
      "UPDATE tags SET name='"+Tag.name+"', created = NOW() WHERE  id=" + Tag.id
    );

    console.log(res);
    
    if (res.rowCount == 0) {
      throw { kind: "not_found" };
    }
    
    result(null, { id: Tag.id, ...Tag });
  } catch (err) {
    result(err, null);
  }
};

Tag.remove = async (TagId, result) => {
  try {
    const res = await client.query("DELETE FROM tags WHERE id = " + TagId);

    if (res.rowCount == 0) {
      throw { kind: "not_found" };
    }

    result(null, { message: `'Tag' was deleted successfully!` });
  } catch (err) {
    result(err, null);
  }
};


module.exports = Tag;
