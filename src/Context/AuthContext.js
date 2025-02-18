// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const value = {
//     user,
//     setUser,
//     loading
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };





// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error('Error loading user from localStorage:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = (userData) => {
//     try {
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//     } catch (error) {
//       console.error('Error saving user to localStorage:', error);
//     }
//   };

//   const logout = () => {
//     try {
//       setUser(null);
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const updateUser = (userData) => {
//     try {
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const value = {
//     user,
//     setUser: login,
//     logout,
//     updateUser,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };



// // src/context/AuthContext.js// src/Context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const updateUser = (userData) => {
//     setUser(userData);
//     if (userData) {
//       localStorage.setItem('user', JSON.stringify(userData));
//     } else {
//       localStorage.removeItem('user');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   const value = {
//     user,
//     setUser: updateUser,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    console.log('AuthContext - Stored user data:', storedUser);
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthContext - Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (userData) => {
    console.log('AuthContext - Updating user with:', userData);
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('AuthContext - User stored in localStorage');
    } else {
      localStorage.removeItem('user');
      console.log('AuthContext - User removed from localStorage');
    }
  };

  const logout = () => {
    console.log('AuthContext - Logging out');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('currentOrder');
    window.location.href = '/login';
  };

  const value = {
    user,
    setUser: updateUser,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};