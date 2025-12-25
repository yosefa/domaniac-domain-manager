// src/index.tsx
import React8 from "react";
import ReactDOM from "react-dom/client";

// src/App.tsx
import { useState as useState6, useEffect as useEffect5, useMemo } from "react";

// src/components/StatsOverview.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var StatsOverview = ({ stats }) => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx("i", { className: "fas fa-globe fa-4x text-blue-500" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium", children: "Total Domains" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mt-2", children: stats.totalDomains })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx("i", { className: "fas fa-coins fa-4x text-green-500" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium", children: "Est. Annual Cost" }),
      /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-bold text-white mt-2", children: [
        "$",
        stats.totalCost.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx("i", { className: "fas fa-clock fa-4x text-yellow-500" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium", children: "Expiring Soon (30 days)" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-yellow-400 mt-2", children: stats.expiringSoon })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx("i", { className: "fas fa-exclamation-triangle fa-4x text-red-500" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium", children: "Expired" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-red-400 mt-2", children: stats.expired })
    ] })
  ] });
};
var StatsOverview_default = StatsOverview;

// src/components/DomainCard.tsx
import { useState } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DomainCard = ({ domain, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const getDaysRemaining = (expiryDate) => {
    const now = /* @__PURE__ */ new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  };
  const daysRemaining = getDaysRemaining(domain.expiryDate);
  let statusLevel = "SAFE" /* SAFE */;
  let statusColor = "border-l-4 border-green-500";
  let badgeColor = "bg-green-500/20 text-green-400";
  if (daysRemaining < 0) {
    statusLevel = "EXPIRED" /* EXPIRED */;
    statusColor = "border-l-4 border-red-600";
    badgeColor = "bg-red-500/20 text-red-400";
  } else if (daysRemaining <= 30) {
    statusLevel = "WARNING" /* WARNING */;
    statusColor = "border-l-4 border-yellow-500";
    badgeColor = "bg-yellow-500/20 text-yellow-400";
  } else if (daysRemaining <= 60) {
    statusColor = "border-l-4 border-blue-400";
  }
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: `bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group ${statusColor}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { className: "text-xl font-bold text-white tracking-tight", children: domain.name }),
            /* @__PURE__ */ jsx2("p", { className: "text-gray-400 text-xs mt-1 uppercase tracking-wider", children: domain.registrar })
          ] }),
          /* @__PURE__ */ jsx2("span", { className: `px-2 py-1 rounded text-xs font-bold ${badgeColor}`, children: daysRemaining < 0 ? "EXPIRED" : `${daysRemaining} DAYS` })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-gray-500", children: "Expires" }),
            /* @__PURE__ */ jsx2("span", { className: "text-gray-300 font-mono", children: new Date(domain.expiryDate).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-gray-500", children: "Cost" }),
            /* @__PURE__ */ jsxs2("span", { className: "text-gray-300 font-medium", children: [
              domain.currency,
              " ",
              domain.price
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-sm items-center", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-gray-500", children: "Auto-Renew" }),
            /* @__PURE__ */ jsx2("span", { className: domain.autoRenew ? "text-green-400" : "text-gray-500", children: /* @__PURE__ */ jsx2("i", { className: `fas fa-${domain.autoRenew ? "check-circle" : "times-circle"}` }) })
          ] })
        ] }),
        domain.tags.length > 0 && /* @__PURE__ */ jsx2("div", { className: "flex flex-wrap gap-1 mb-4", children: domain.tags.map((tag, idx) => /* @__PURE__ */ jsxs2("span", { className: "px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 text-[10px]", children: [
          "#",
          tag
        ] }, idx)) }),
        /* @__PURE__ */ jsxs2("div", { className: "flex gap-2 pt-2 border-t border-gray-700 mt-2", children: [
          /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: () => onEdit(domain),
              className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm transition-colors",
              children: [
                /* @__PURE__ */ jsx2("i", { className: "fas fa-edit mr-2" }),
                " Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            "button",
            {
              onClick: () => onDelete(domain.id),
              className: "w-10 bg-gray-700 hover:bg-red-900/50 hover:text-red-400 text-gray-400 py-2 rounded text-sm transition-colors flex items-center justify-center",
              children: /* @__PURE__ */ jsx2("i", { className: "fas fa-trash" })
            }
          )
        ] })
      ]
    }
  );
};
var DomainCard_default = DomainCard;

// src/components/Modal.tsx
import { useEffect, useRef } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx3("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity", children: /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: modalRef,
      className: "bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-lg overflow-hidden animate-fade-in-up",
      style: { maxHeight: "90vh", overflowY: "auto" },
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center p-5 border-b border-gray-700", children: [
          /* @__PURE__ */ jsx3("h2", { className: "text-xl font-bold text-white", children: title }),
          /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: onClose,
              className: "text-gray-400 hover:text-white transition-colors",
              children: /* @__PURE__ */ jsx3("i", { className: "fas fa-times text-xl" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "p-6", children })
      ]
    }
  ) });
};
var Modal_default = Modal;

// src/components/DomainForm.tsx
import { useState as useState2, useEffect as useEffect2 } from "react";
import DatePicker from "react-datepicker";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var DomainForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState2({
    name: "",
    registrar: "",
    expiryDate: /* @__PURE__ */ new Date(),
    price: 0,
    currency: "USD",
    autoRenew: false,
    notes: "",
    tags: ""
  });
  useEffect2(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        registrar: initialData.registrar,
        expiryDate: new Date(initialData.expiryDate),
        price: initialData.price,
        currency: initialData.currency,
        autoRenew: initialData.autoRenew,
        notes: initialData.notes || "",
        tags: initialData.tags.join(", ")
      });
    }
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value
    }));
  };
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      expiryDate: date
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.expiryDate) return;
    onSubmit({
      ...formData,
      expiryDate: formData.expiryDate.toISOString(),
      price: Number(formData.price),
      tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
    });
  };
  return /* @__PURE__ */ jsxs4("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Domain Name" }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "text",
          name: "name",
          required: true,
          value: formData.name,
          onChange: handleChange,
          placeholder: "example.com",
          className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Registrar" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "text",
            name: "registrar",
            required: true,
            value: formData.registrar,
            onChange: handleChange,
            placeholder: "GoDaddy, Namecheap...",
            className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Expiry Date" }),
        /* @__PURE__ */ jsxs4("div", { className: "relative", children: [
          /* @__PURE__ */ jsx4(
            DatePicker,
            {
              selected: formData.expiryDate,
              onChange: handleDateChange,
              dateFormat: "yyyy-MM-dd",
              className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer",
              wrapperClassName: "w-full",
              placeholderText: "Select expiration date",
              showPopperArrow: false,
              required: true
            }
          ),
          /* @__PURE__ */ jsx4("div", { className: "absolute right-3 top-2.5 pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx4("i", { className: "fas fa-calendar-alt" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Price" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "number",
            name: "price",
            required: true,
            min: "0",
            step: "0.01",
            value: formData.price,
            onChange: handleChange,
            className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Currency" }),
        /* @__PURE__ */ jsxs4(
          "select",
          {
            name: "currency",
            value: formData.currency,
            onChange: handleChange,
            className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500",
            children: [
              /* @__PURE__ */ jsx4("option", { value: "USD", children: "USD" }),
              /* @__PURE__ */ jsx4("option", { value: "EUR", children: "EUR" }),
              /* @__PURE__ */ jsx4("option", { value: "IDR", children: "IDR" }),
              /* @__PURE__ */ jsx4("option", { value: "GBP", children: "GBP" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx4("label", { className: "block text-sm font-medium text-gray-400 mb-1", children: "Tags (comma separated)" }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "text",
          name: "tags",
          value: formData.tags,
          onChange: handleChange,
          placeholder: "personal, business, project x",
          className: "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxs4("div", { className: "relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in", children: [
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "checkbox",
            name: "autoRenew",
            id: "autoRenew",
            checked: formData.autoRenew,
            onChange: handleChange,
            className: "absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-600",
            style: { right: formData.autoRenew ? "0" : "unset", left: formData.autoRenew ? "unset" : "0" }
          }
        ),
        /* @__PURE__ */ jsx4("label", { htmlFor: "autoRenew", className: `block overflow-hidden h-6 rounded-full cursor-pointer ${formData.autoRenew ? "bg-indigo-600" : "bg-gray-700"}` })
      ] }),
      /* @__PURE__ */ jsx4("label", { htmlFor: "autoRenew", className: "text-sm font-medium text-gray-300", children: "Auto Renew Enabled" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "pt-4 flex gap-3", children: [
      /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx4(
        "button",
        {
          type: "submit",
          className: "flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors font-medium shadow-lg shadow-indigo-500/30",
          children: initialData ? "Update Domain" : "Add Domain"
        }
      )
    ] })
  ] });
};
var DomainForm_default = DomainForm;

// src/components/LoginPage.tsx
import { useState as useState4, useEffect as useEffect4 } from "react";

// src/contexts/AuthContext.tsx
import { createContext, useContext, useState as useState3, useEffect as useEffect3 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var AuthContext = createContext(void 0);
var useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
var AuthProvider = ({ children }) => {
  const [user, setUser] = useState3(null);
  const [token, setToken] = useState3(null);
  const [loading, setLoading] = useState3(true);
  useEffect3(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);
  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch("/api/auth/verify", {
        headers: {
          "Authorization": `Bearer ${tokenToVerify}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(tokenToVerify);
      } else {
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }
    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth_token", data.token);
  };
  const register = async (email, password) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }
    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth_token", data.token);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };
  return /* @__PURE__ */ jsx5(
    AuthContext.Provider,
    {
      value: {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      },
      children
    }
  );
};

// src/components/LoginPage.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var LoginPage = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState4("");
  const [password, setPassword] = useState4("");
  const [error, setError] = useState4("");
  const [loading, setLoading] = useState4(false);
  const [registrationEnabled, setRegistrationEnabled] = useState4(false);
  useEffect4(() => {
    fetch("/api/settings").then((res) => res.json()).then((data) => setRegistrationEnabled(data.registrationEnabled)).catch(() => setRegistrationEnabled(false));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx6("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs5("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ jsxs5("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxs5("div", { className: "inline-flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx6("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30", children: /* @__PURE__ */ jsx6("i", { className: "fas fa-network-wired text-white text-xl" }) }),
        /* @__PURE__ */ jsx6("span", { className: "font-bold text-3xl tracking-tight text-white", children: "Domaniac" })
      ] }),
      /* @__PURE__ */ jsx6("p", { className: "text-gray-400 text-sm", children: "Sign in to manage your domains" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700", children: [
      /* @__PURE__ */ jsxs5("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        error && /* @__PURE__ */ jsxs5("div", { className: "bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm", children: [
          /* @__PURE__ */ jsx6("i", { className: "fas fa-exclamation-circle" }),
          /* @__PURE__ */ jsx6("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-2", children: "Email Address" }),
          /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
            /* @__PURE__ */ jsx6("i", { className: "fas fa-envelope absolute left-4 top-3.5 text-gray-500" }),
            /* @__PURE__ */ jsx6(
              "input",
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                className: "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
                placeholder: "you@example.com"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-2", children: "Password" }),
          /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
            /* @__PURE__ */ jsx6("i", { className: "fas fa-lock absolute left-4 top-3.5 text-gray-500" }),
            /* @__PURE__ */ jsx6(
              "input",
              {
                id: "password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true,
                className: "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
                placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx6(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            children: loading ? /* @__PURE__ */ jsxs5(Fragment, { children: [
              /* @__PURE__ */ jsx6("i", { className: "fas fa-spinner fa-spin" }),
              "Signing in..."
            ] }) : /* @__PURE__ */ jsxs5(Fragment, { children: [
              /* @__PURE__ */ jsx6("i", { className: "fas fa-sign-in-alt" }),
              "Sign In"
            ] })
          }
        )
      ] }),
      registrationEnabled && /* @__PURE__ */ jsx6("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs5("p", { className: "text-gray-400 text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: onSwitchToRegister,
            className: "text-indigo-400 hover:text-indigo-300 font-medium transition-colors",
            children: "Create one"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx6("p", { className: "text-center text-gray-500 text-xs mt-8", children: "Secure domain management powered by Cloudflare" })
  ] }) });
};
var LoginPage_default = LoginPage;

// src/components/RegisterPage.tsx
import { useState as useState5 } from "react";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var RegisterPage = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState5("");
  const [password, setPassword] = useState5("");
  const [confirmPassword, setConfirmPassword] = useState5("");
  const [error, setError] = useState5("");
  const [loading, setLoading] = useState5(false);
  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" };
    if (pass.length < 8) return { strength: 25, label: "Weak", color: "bg-red-500" };
    let strength = 25;
    if (pass.length >= 12) strength += 25;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 12.5;
    if (strength <= 25) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 50) return { strength, label: "Fair", color: "bg-yellow-500" };
    if (strength <= 75) return { strength, label: "Good", color: "bg-blue-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };
  const passwordStrength = getPasswordStrength(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx7("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxs6("div", { className: "max-w-md w-full", children: [
    /* @__PURE__ */ jsxs6("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxs6("div", { className: "inline-flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx7("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30", children: /* @__PURE__ */ jsx7("i", { className: "fas fa-network-wired text-white text-xl" }) }),
        /* @__PURE__ */ jsx7("span", { className: "font-bold text-3xl tracking-tight text-white", children: "Domaniac" })
      ] }),
      /* @__PURE__ */ jsx7("p", { className: "text-gray-400 text-sm", children: "Create your account to get started" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700", children: [
      /* @__PURE__ */ jsxs6("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        error && /* @__PURE__ */ jsxs6("div", { className: "bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm", children: [
          /* @__PURE__ */ jsx7("i", { className: "fas fa-exclamation-circle" }),
          /* @__PURE__ */ jsx7("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-300 mb-2", children: "Email Address" }),
          /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
            /* @__PURE__ */ jsx7("i", { className: "fas fa-envelope absolute left-4 top-3.5 text-gray-500" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                className: "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
                placeholder: "you@example.com"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-300 mb-2", children: "Password" }),
          /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
            /* @__PURE__ */ jsx7("i", { className: "fas fa-lock absolute left-4 top-3.5 text-gray-500" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                id: "password",
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true,
                className: "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
                placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              }
            )
          ] }),
          password && /* @__PURE__ */ jsxs6("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsx7("span", { className: "text-xs text-gray-400", children: "Password strength" }),
              /* @__PURE__ */ jsx7("span", { className: `text-xs font-medium ${passwordStrength.color.replace("bg-", "text-")}`, children: passwordStrength.label })
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "w-full bg-gray-700 rounded-full h-1.5", children: /* @__PURE__ */ jsx7(
              "div",
              {
                className: `h-1.5 rounded-full transition-all ${passwordStrength.color}`,
                style: { width: `${passwordStrength.strength}%` }
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-300 mb-2", children: "Confirm Password" }),
          /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
            /* @__PURE__ */ jsx7("i", { className: "fas fa-lock absolute left-4 top-3.5 text-gray-500" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                id: "confirmPassword",
                type: "password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                required: true,
                className: "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all",
                placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
            children: loading ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
              /* @__PURE__ */ jsx7("i", { className: "fas fa-spinner fa-spin" }),
              "Creating account..."
            ] }) : /* @__PURE__ */ jsxs6(Fragment2, { children: [
              /* @__PURE__ */ jsx7("i", { className: "fas fa-user-plus" }),
              "Create Account"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs6("p", { className: "text-gray-400 text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx7(
          "button",
          {
            onClick: onSwitchToLogin,
            className: "text-indigo-400 hover:text-indigo-300 font-medium transition-colors",
            children: "Sign in"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx7("p", { className: "text-center text-gray-500 text-xs mt-8", children: "Secure domain management powered by Cloudflare" })
  ] }) });
};
var RegisterPage_default = RegisterPage;

// src/utils/api.ts
var getAuthToken = () => {
  return localStorage.getItem("auth_token");
};
var apiRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    ...options,
    headers
  });
  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    window.location.reload();
    throw new Error("Authentication required");
  }
  return response;
};
var fetchDomains = async () => {
  const response = await apiRequest("/api/domains/list");
  if (!response.ok) {
    throw new Error("Failed to fetch domains");
  }
  const data = await response.json();
  return data.domains;
};
var createDomain = async (domainData) => {
  const response = await apiRequest("/api/domains/create", {
    method: "POST",
    body: JSON.stringify(domainData)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create domain");
  }
  const data = await response.json();
  return data.domain;
};
var updateDomain = async (id, domainData) => {
  const response = await apiRequest("/api/domains/update", {
    method: "PUT",
    body: JSON.stringify({ id, ...domainData })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update domain");
  }
  const data = await response.json();
  return data.domain;
};
var deleteDomain = async (id) => {
  const response = await apiRequest(`/api/domains/delete?id=${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete domain");
  }
  return true;
};

// src/App.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var DomainManager = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [domains, setDomains] = useState6([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState6(false);
  const [editingDomain, setEditingDomain] = useState6(void 0);
  const [searchTerm, setSearchTerm] = useState6("");
  const [sortField, setSortField] = useState6(null);
  const [sortOrder, setSortOrder] = useState6("asc");
  const [notification, setNotification] = useState6(null);
  const [loading, setLoading] = useState6(true);
  useEffect5(() => {
    if (isAuthenticated) {
      loadDomains();
    }
  }, [isAuthenticated]);
  const loadDomains = async () => {
    try {
      setLoading(true);
      const fetchedDomains = await fetchDomains();
      setDomains(fetchedDomains);
    } catch (error) {
      console.error("Failed to load domains:", error);
      showNotification("Failed to load domains", "error");
    } finally {
      setLoading(false);
    }
  };
  const stats = useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    let totalCost = 0;
    let expiringSoon = 0;
    let expired = 0;
    domains.forEach((d) => {
      totalCost += d.price;
      const exp = new Date(d.expiryDate);
      const diff = Math.ceil((exp.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
      if (diff < 0) expired++;
      else if (diff <= 30) expiringSoon++;
    });
    return {
      totalDomains: domains.length,
      totalCost,
      expiringSoon,
      expired
    };
  }, [domains]);
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3e3);
  };
  const handleAddDomain = async (data) => {
    try {
      const newDomain = await createDomain(data);
      setDomains((prev) => [...prev, newDomain]);
      setIsAddModalOpen(false);
      showNotification(`Domain ${newDomain.name} added successfully!`, "success");
    } catch (error) {
      showNotification(error.message || "Failed to add domain", "error");
    }
  };
  const handleUpdateDomain = async (data) => {
    if (!editingDomain) return;
    try {
      const updatedDomain = await updateDomain(editingDomain.id, data);
      setDomains((prev) => prev.map((d) => d.id === editingDomain.id ? { ...updatedDomain, id: editingDomain.id } : d));
      setEditingDomain(void 0);
      setIsAddModalOpen(false);
      showNotification("Domain updated successfully!", "success");
    } catch (error) {
      showNotification(error.message || "Failed to update domain", "error");
    }
  };
  const handleDeleteDomain = async (id) => {
    if (confirm("Are you sure you want to delete this domain?")) {
      try {
        await deleteDomain(id);
        setDomains((prev) => prev.filter((d) => d.id !== id));
        showNotification("Domain removed.", "success");
      } catch (error) {
        showNotification(error.message || "Failed to delete domain", "error");
      }
    }
  };
  const filteredDomains = useMemo(() => {
    let result = domains.filter(
      (d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.registrar.toLowerCase().includes(searchTerm.toLowerCase()) || d.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (sortField) {
      result = [...result].sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case "name":
            comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            break;
          case "expiryDate":
            comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
            break;
          case "price":
            comparison = a.price - b.price;
            break;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }
    return result;
  }, [domains, searchTerm, sortField, sortOrder]);
  const handleSortClick = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const clearSort = () => {
    setSortField(null);
    setSortOrder("asc");
  };
  return /* @__PURE__ */ jsxs7("div", { className: "min-h-screen bg-gray-900 text-gray-100 font-sans pb-20", children: [
    /* @__PURE__ */ jsx8("nav", { className: "border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-40", children: /* @__PURE__ */ jsx8("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs7("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx8("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20", children: /* @__PURE__ */ jsx8("i", { className: "fas fa-network-wired text-white text-sm" }) }),
        /* @__PURE__ */ jsx8("span", { className: "font-bold text-xl tracking-tight", children: "Domaniac" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs7("span", { className: "text-sm text-gray-400 hidden sm:block", children: [
          /* @__PURE__ */ jsx8("i", { className: "fas fa-user mr-2" }),
          user?.email
        ] }),
        /* @__PURE__ */ jsxs7(
          "button",
          {
            onClick: () => setIsAddModalOpen(true),
            className: "bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx8("i", { className: "fas fa-plus" }),
              " Add Domain"
            ]
          }
        ),
        /* @__PURE__ */ jsxs7(
          "button",
          {
            onClick: logout,
            className: "bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx8("i", { className: "fas fa-sign-out-alt" }),
              /* @__PURE__ */ jsx8("span", { className: "hidden sm:inline", children: "Logout" })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs7("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      notification && /* @__PURE__ */ jsxs7("div", { className: `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in-up flex items-center gap-3 ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`, children: [
        /* @__PURE__ */ jsx8("i", { className: `fas fa-${notification.type === "success" ? "check-circle" : "exclamation-circle"}` }),
        notification.message
      ] }),
      /* @__PURE__ */ jsx8(StatsOverview_default, { stats }),
      /* @__PURE__ */ jsxs7("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs7("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx8("i", { className: "fas fa-search absolute left-4 top-3 text-gray-500" }),
          /* @__PURE__ */ jsx8(
            "input",
            {
              type: "text",
              placeholder: "Search domains, registrars, tags...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx8("span", { className: "text-gray-400 text-sm hidden sm:block", children: "Sort:" }),
          /* @__PURE__ */ jsxs7("div", { className: "flex bg-gray-800 border border-gray-700 rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxs7(
              "button",
              {
                onClick: () => handleSortClick("name"),
                className: `px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${sortField === "name" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"}`,
                children: [
                  /* @__PURE__ */ jsx8("i", { className: "fas fa-font" }),
                  /* @__PURE__ */ jsx8("span", { className: "hidden sm:inline", children: "Name" }),
                  sortField === "name" && /* @__PURE__ */ jsx8("i", { className: `fas fa-arrow-${sortOrder === "asc" ? "up" : "down"} text-xs` })
                ]
              }
            ),
            /* @__PURE__ */ jsxs7(
              "button",
              {
                onClick: () => handleSortClick("expiryDate"),
                className: `px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 border-l border-gray-700 ${sortField === "expiryDate" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"}`,
                children: [
                  /* @__PURE__ */ jsx8("i", { className: "fas fa-calendar" }),
                  /* @__PURE__ */ jsx8("span", { className: "hidden sm:inline", children: "Expiry" }),
                  sortField === "expiryDate" && /* @__PURE__ */ jsx8("i", { className: `fas fa-arrow-${sortOrder === "asc" ? "up" : "down"} text-xs` })
                ]
              }
            ),
            /* @__PURE__ */ jsxs7(
              "button",
              {
                onClick: () => handleSortClick("price"),
                className: `px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 border-l border-gray-700 ${sortField === "price" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"}`,
                children: [
                  /* @__PURE__ */ jsx8("i", { className: "fas fa-dollar-sign" }),
                  /* @__PURE__ */ jsx8("span", { className: "hidden sm:inline", children: "Price" }),
                  sortField === "price" && /* @__PURE__ */ jsx8("i", { className: `fas fa-arrow-${sortOrder === "asc" ? "up" : "down"} text-xs` })
                ]
              }
            )
          ] }),
          sortField && /* @__PURE__ */ jsx8(
            "button",
            {
              onClick: clearSort,
              className: "p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-all",
              title: "Clear sort",
              children: /* @__PURE__ */ jsx8("i", { className: "fas fa-times" })
            }
          )
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxs7("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsx8("i", { className: "fas fa-spinner fa-spin text-4xl text-indigo-500 mb-4" }),
        /* @__PURE__ */ jsx8("p", { className: "text-gray-400", children: "Loading domains..." })
      ] }) : (
        /* Grid */
        /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          filteredDomains.map((domain) => /* @__PURE__ */ jsx8(
            DomainCard_default,
            {
              domain,
              onEdit: (d) => {
                setEditingDomain(d);
                setIsAddModalOpen(true);
              },
              onDelete: handleDeleteDomain
            },
            domain.id
          )),
          filteredDomains.length === 0 && !loading && /* @__PURE__ */ jsxs7("div", { className: "col-span-full py-20 text-center text-gray-500", children: [
            /* @__PURE__ */ jsx8("i", { className: "fas fa-folder-open text-4xl mb-4 opacity-50" }),
            /* @__PURE__ */ jsx8("p", { children: "No domains found matching your criteria." })
          ] })
        ] })
      )
    ] }),
    /* @__PURE__ */ jsx8(
      Modal_default,
      {
        isOpen: isAddModalOpen,
        onClose: () => {
          setIsAddModalOpen(false);
          setEditingDomain(void 0);
        },
        title: editingDomain ? "Edit Domain" : "Add New Domain",
        children: /* @__PURE__ */ jsx8(
          DomainForm_default,
          {
            initialData: editingDomain,
            onSubmit: editingDomain ? handleUpdateDomain : handleAddDomain,
            onCancel: () => {
              setIsAddModalOpen(false);
              setEditingDomain(void 0);
            }
          }
        )
      }
    )
  ] });
};
var App = () => {
  const [showRegister, setShowRegister] = useState6(false);
  return /* @__PURE__ */ jsx8(AuthProvider, { children: /* @__PURE__ */ jsx8(AuthContent, { showRegister, setShowRegister }) });
};
var AuthContent = ({ showRegister, setShowRegister }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx8("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center", children: /* @__PURE__ */ jsxs7("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx8("i", { className: "fas fa-spinner fa-spin text-4xl text-indigo-500 mb-4" }),
      /* @__PURE__ */ jsx8("p", { className: "text-gray-400", children: "Loading..." })
    ] }) });
  }
  if (!isAuthenticated) {
    return showRegister ? /* @__PURE__ */ jsx8(RegisterPage_default, { onSwitchToLogin: () => setShowRegister(false) }) : /* @__PURE__ */ jsx8(LoginPage_default, { onSwitchToRegister: () => setShowRegister(true) });
  }
  return /* @__PURE__ */ jsx8(DomainManager, {});
};
var App_default = App;

// src/index.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx9(React8.StrictMode, { children: /* @__PURE__ */ jsx9(App_default, {}) })
);
