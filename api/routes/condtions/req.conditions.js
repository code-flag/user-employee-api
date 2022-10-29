let errors = [];

const verifyPassword = (data) => {
  if (data.length < 8) {
    errors.push("Your password must be at least 8 characters");
    return false;
  }
  if (data.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
    return false;
  }
  if (data.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
    return false;
  }

  return true;
};

const verifyEmail = (data) => {
  if (typeof data != "string") {
    error.push(
      "Invalid Password, must contain character and number and must be greater than 5"
    );
    return false;
  }
  if (data.length > 50) {
    errors.push("Email too long. Must be less than 50");
    return false;
  }

  return true;
};

const verifyName = (data) => {
  if (typeof data != "string") {
    errors.push("Name can only be string");
    return false;
  }
  if (data.length > 100) {
    errors.push("User name too long. Must be less than 100");
    return false;
  }
  return true;
};

const verifyGender = (data) => {
  if (typeof data != "string") {
    errors.push("Gender can only be string");
    return false;
  }
  if (data.length > 25) {
    errors.push("Gender character too long. Must be less than 25");
    return false;
  }
  return true;
};
const verifySalary = (data) => {
  if (typeof data != "number") {
    errors.push("Invalid! Salary must be number");
    return false;
  }
  return true;
};

const verifyUserRegPayload = (data) => {
  dataKey = Object.keys(data);
  if (
    dataKey.includes("name") &&
    dataKey.includes("email") &&
    dataKey.includes("password")
  ) {
    if (verifyName(data.name) && verifyEmail(data.email) && verifyPassword(data.password)) {
      return { status: true, error: null };
    } else {
      return { status: false, error: errors?.join("\n") };
    }
  } else {
    return { status: false, error: "incompleted parameter" };
  }
};
const verifyEmployeePayload = (data) => {
  dataKey = Object.keys(data);
  if (
    dataKey.includes("first_name") &&
    dataKey.includes("last_name") &&
    dataKey.includes("gender") &&
    dataKey.includes("email") &&
    dataKey.includes("salary")
  ) {
    if (
      verifyName(data.first_name) &&
      verifyName(data.last_name) &&
      verifyGender(data.gender) &&
      verifyEmail(data.email) &&
      verifySalary(data.salary)
    ) {
      return { status: true, error: null };
    } else {
      return { status: false, error: errors?.join("\n") };
    }
  } else {
    return { status: false, error: "incompleted parameter" };
  }
};
const verifyLoginPayload = (data) => {
  dataKey = Object.keys(data);
  if (dataKey.includes("username") && dataKey.includes("password")) {
    if (verifyName(data.username) && verifyPassword(data.password)) {
      return { status: true, error: null };
    } else {
      return { status: false, error: errors?.join("\n") };
    }
  } else {
    return { status: false, error: "incompleted parameter" };
  }
};

module.exports = {verifyEmployeePayload, verifyLoginPayload, verifyUserRegPayload}