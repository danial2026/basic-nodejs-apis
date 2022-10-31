const CoreSchema = require("./core-schema");

class ItemSchema extends CoreSchema {
  
  get Title() {
      return this.title;
  }
  set Title(title) {
      this.title = title;
  }

  // toString() print out schema in easy to read format
  toString() {
      const output = {
          Id: this._id,
          Title: this.title,
          CreatedAt: this.createdAt,
      };
      return JSON.stringify(output, null, 2);
  }
}

module.exports = ItemSchema;