export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, messages: [err] });
};

export default { errorHandler };
