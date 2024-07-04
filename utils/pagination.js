const getPagination = (query) => {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    return {
      limit: parseInt(limit),
      offset,
      page: parseInt(page),
    };
  };
  
  module.exports = {
    getPagination,
  };
  