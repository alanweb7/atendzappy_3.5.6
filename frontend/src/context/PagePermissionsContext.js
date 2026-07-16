import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import toastError from "../errors/toastError";
import { AuthContext } from "./Auth/AuthContext";

const PagePermissionsContext = createContext();

const PagePermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [availablePages, setAvailablePages] = useState({});
  const { user } = useContext(AuthContext);

  const loadUserPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user-accessible-pages");

      const userPermissions = {};
      Object.values(data.pages || {}).forEach((groupPages) => {
        groupPages.forEach((page) => {
          userPermissions[page.path] = true;
        });
      });

      setPermissions(userPermissions);
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAvailablePages = useCallback(async () => {
    try {
      const { data } = await api.get("/pages/list");
      setAvailablePages(data.pages || {});
    } catch (err) {
      toastError(err);
    }
  }, []);

  useEffect(() => {
    loadUserPermissions();
    loadAvailablePages();
  }, [loadUserPermissions, loadAvailablePages]);

  useEffect(() => {
    if (user && user.id) {
      loadUserPermissions();
    }
  }, [user, loadUserPermissions]);

  const canAccessPage = useCallback(
    (pagePath) => {
      if (loading) return true;

      if (!permissions || Object.keys(permissions).length === 0) {
        return true;
      }

      return permissions[pagePath] === true;
    },
    [loading, permissions]
  );

  const getUserPermissions = async (userId) => {
    try {
      const { data } = await api.get(`/users/${userId}/page-permissions`);
      return data;
    } catch (err) {
      toastError(err);
      throw err;
    }
  };

  const setUserPermissions = async (userId, permissionsData) => {
    try {
      const { data } = await api.post(`/users/${userId}/page-permissions`, permissionsData);

      if (userId === getCurrentUserId()) {
        await loadUserPermissions();
      }

      return data;
    } catch (err) {
      toastError(err);
      throw err;
    }
  };

  const getCurrentUserId = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    return userData.id;
  };

  const getAccessiblePages = useCallback(
    (pages) => {
      if (loading) return [];

      return Object.values(pages).filter((page) => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (userData.profile === "admin") {
          return true;
        }

        return permissions[page.path] || false;
      });
    },
    [loading, permissions]
  );

  const refreshPermissions = async () => {
    await loadUserPermissions();
  };

  return (
    <PagePermissionsContext.Provider
      value={{
        permissions,
        loading,
        availablePages,
        canAccessPage,
        getUserPermissions,
        setUserPermissions,
        getAccessiblePages,
        refreshPermissions,
        loadAvailablePages,
      }}
    >
      {children}
    </PagePermissionsContext.Provider>
  );
};

const usePagePermissions = () => {
  const context = useContext(PagePermissionsContext);
  if (!context) {
    throw new Error("usePagePermissions must be used within a PagePermissionsProvider");
  }
  return context;
};

export { PagePermissionsContext, PagePermissionsProvider, usePagePermissions };
