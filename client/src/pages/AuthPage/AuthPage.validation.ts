export const validation = {
  username: {
    required: "This field is required",
    minLength: {
      value: 4,
      message: "Please enter at least 4 characters",
    },
  },
  email: {
    required: "This field is required",
    minLength: {
      value: 8,
      message: "Please enter at least 8 characters",
    },
  },
  password: {
    required: "This field is required",
    minLength: {
      value: 8,
      message: "Please enter at least 8 characters",
    },
  },
};
