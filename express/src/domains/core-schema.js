class CoreSchema {
  get Id() {
      return this.id;
  }
  set Id(id) {
      this._id = id;
  }

  get CreatedAt() {
      return this.createdAt;
  }
  set CreatedAt(createdAt) {
      this.createdAt = createdAt;
  }

  // toString() print out schema in easy to read format
  toString() {
      const output = {
          Id: this._id,
          CreatedAt: this.createdAt,
      };
      return JSON.stringify(output, null, 2);
  }
}

module.exports = CoreSchema;