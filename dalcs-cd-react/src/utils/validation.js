// Email validation - Must be @dal.ca
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@dal\.ca$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Must be a @dal.ca email address';
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return '';
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

// URL validation
export const validateURL = (url) => {
  if (!url) return ''; // URL is optional
  try {
    new URL(url);
    return '';
  } catch {
    return 'Must be a valid URL';
  }
};

// Rating validation (1-5)
export const validateRating = (value) => {
  const num = Number(value);
  if (isNaN(num) || num < 1 || num > 5) {
    return 'Rating must be between 1 and 5';
  }
  return '';
};

// Course form validation
export const validateCourseForm = (formData) => {
  const errors = {};
  
  errors.code = validateRequired(formData.code, 'Course code');
  errors.name = validateRequired(formData.name, 'Course name');
  
  if (formData.syllabusUrl) {
    errors.syllabusUrl = validateURL(formData.syllabusUrl);
  }
  
  // Return only errors that have values
  return Object.keys(errors)
    .filter(key => errors[key])
    .reduce((obj, key) => {
      obj[key] = errors[key];
      return obj;
    }, {});
};

// Register form validation
export const validateRegisterForm = (formData) => {
  const errors = {};
  
  errors.name = validateRequired(formData.name, 'Name');
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  
  // Return only errors that have values
  return Object.keys(errors)
    .filter(key => errors[key])
    .reduce((obj, key) => {
      obj[key] = errors[key];
      return obj;
    }, {});
};
