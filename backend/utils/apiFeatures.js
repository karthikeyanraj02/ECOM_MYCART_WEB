const { search } = require("../app");

class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const copyqueryStr = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((fields) => delete copyqueryStr[fields]);

    let queryStr = JSON.stringify(copyqueryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
