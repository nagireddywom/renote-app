// import React from 'react';

// const InputField = ({ label, type, value, onChange, required, error }) => {
//   return (
//     <div className="input-field">
//       <label className="input-label">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className={`input-control ${error ? 'input-error' : ''}`}
//       />
//       {error && <span className="error-text">{error}</span>}
//     </div>
//   );
// };

// export default InputField;
// src/Components/common/InputField.js
import React from 'react';

const InputField = ({ label, type, name, value, onChange, error, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;